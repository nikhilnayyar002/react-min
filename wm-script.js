const fs = require("fs-extra");
const execSync = require("child_process").execSync;
const webpack = require("webpack");
const webpackProdConfig = require("./webpack.prod");
const wmConfig = require("./wm-config");
const { chalk, printTable } = require("./wm-helper");

const configFileName = "wm-config.js";

const args = process.argv.slice(2);
if (!args[0]) return;

let configFileStr;
readConfigFile();

// **************************************************************

const features = {
  sass: {
    name: "sass",
    args: {
      enableFeat: "enable-feat-sass",
      disableFeat: "disable-feat-sass",
    },
    deps: {
      "sass-loader": "^12.4.0",
      sass: "^1.47.0",
    },
  },
  typescript: {
    name: "typescript",
    args: {
      enableFeat: "enable-feat-typescript",
      disableFeat: "disable-feat-typescript",
    },
    deps: {
      "@types/react": "^17.0.38",
      "@types/react-dom": "^17.0.11",
      "@babel/preset-typescript": "^7.16.7",
      "@typescript-eslint/eslint-plugin": "^5.9.0",
      "@typescript-eslint/parser": "^5.9.0",
      typescript: "^4.5.4",
    },
  },
};
const globalArgs = {
  updateFeatAll: "update-feat-all",
};

// **************************************************************

function readConfigFile() {
  configFileStr = fs.readFileSync(configFileName, "utf8");
}
function writeConfigFile(newConfigFileStr) {
  fs.writeFileSync(configFileName, newConfigFileStr, "utf8");
  readConfigFile();
}

function returnDepsStringForNpmInstall(deps) {
  return Object.keys(deps).join(" ");
}
function returnDepsStringForNpmInstallWithVersion(deps) {
  return Object.keys(deps)
    .map((v) => `${v}@${deps[v]}`)
    .join(" ");
}

function setOptionInConfig(setValue, arr, trueVal, falseVal) {
  const [line, currentValue] = arr;
  const newValue = setValue ? trueVal : falseVal;
  if (newValue === currentValue) return false;

  const newLine = line.replace(currentValue, newValue);
  const newConfigFileStr = configFileStr.replace(line, newLine);
  writeConfigFile(newConfigFileStr);
  return true;
}

function npmInstall(install, deps) {
  const str = install ? returnDepsStringForNpmInstallWithVersion(deps) : returnDepsStringForNpmInstall(deps);
  execSync(`npm ${install ? "i" : "un"} --save-dev ${str}`, { stdio: "inherit" });
}

function getBooleanOption(name) {
  const arr = new RegExp(`const\\s+${name}\\s+=\\s+(true|false)`).exec(configFileStr);
  if (arr === null) throw `${name} option not found. Config is broken.`;
  else return arr.slice(0, 2);
}

function setFeature(featureName, enable, oldOption, trueVal, falseVal, installCallback) {
  console.log(enable ? "Enabling" : "Disabling", "feature", featureName);

  const result = setOptionInConfig(enable, oldOption, trueVal, falseVal);
  if (result) enable ? installCallback(true) : installCallback(false);
  else console.log("Feature is already", enable ? "enabled" : "disabled");
}

// **************************************************************

function getSass() {
  return getBooleanOption(features.sass.name);
}
function getTypescript() {
  return getBooleanOption(features.typescript.name);
}
function installSass(install) {
  npmInstall(install, features.sass.deps);
}
function installTypescript(install) {
  npmInstall(install, features.typescript.deps);
}

// **************************************************************

// generate build
if (args[0] === "build") {
  console.log(chalk.blueBright(`Copying Files ${wmConfig.publicDir} --> ${wmConfig.outputDir}...`));
  fs.emptyDirSync(wmConfig.outputDir);
  fs.copySync(wmConfig.publicDir, wmConfig.outputDir, {
    dereference: true,
    filter: (src) => !src.endsWith(wmConfig.publicDirHtmlFileName),
  });

  console.log(chalk.blueBright("Building...", "\n"));
  webpack({ ...webpackProdConfig, stats: "none" }, (err, stats) => {
    if (err) {
      console.log(err);
    } else {
      if (stats.hasWarnings()) {
        const warnings = stats.compilation.warnings;
        console.log(chalk.yellowBright(`WARNINGS: ${warnings.length}`));
        warnings.forEach((value) => console.log(value.message));
      }
      if (stats.hasErrors()) {
        const errors = stats.compilation.errors;
        console.log(chalk.redBright(`ERRORS: ${errors.length}`));
        errors.forEach((value) => console.log(value.message));

        console.log(chalk.redBright(`Build Failed`));
      }
      // log bundle assets
      else {
        const tableData = [["Asset", "Size (KB)"]];
        for (const [key, value] of stats.compilation.assetsInfo) {
          tableData.push([
            chalk[value.javascriptModule ? "greenBright" : "yellowBright"](key),
            (value.size / 1024).toFixed(2),
          ]);
        }
        console.log("");
        printTable(tableData);

        console.log(
          `\nThe project was built assuming it is hosted at ${chalk.yellowBright(wmConfig.webpack.publicPath)}.`,
          `\nYou can control this with the  ${chalk.yellowBright("publicPath")} variable in ${chalk.yellowBright(
            "wm-config.js"
          )}.`,
          `\nThe ${chalk.yellowBright("build")} folder is ready to be deployed.`,
          "\nYou may serve it with a static server:",
          "\n\nnpm install -g serve",
          "\nserve -s build"
        );
        console.log(chalk.blueBright(`Done! ${(stats.endTime - stats.startTime) / 1000}s`));
      }
    }
  });
} else {
  args.forEach((arg) => {
    if ([features.sass.args.enableFeat, features.sass.args.disableFeat].includes(arg)) {
      setFeature(features.sass.name, arg === features.sass.args.enableFeat, getSass(), "true", "false", installSass);
    } else if ([features.typescript.args.enableFeat, features.typescript.args.disableFeat].includes(arg)) {
      setFeature(
        features.typescript.name,
        arg === features.typescript.args.enableFeat,
        getTypescript(),
        "true",
        "false",
        installTypescript
      );
    } else if (arg === globalArgs.updateFeatAll) {
      const updateList = {};

      const packageJson = fs.readFileSync("package.json", "utf8");
      const devDependencies = JSON.parse(packageJson).devDependencies;
      if (!devDependencies) return;

      function checkUpdatesForDeps(deps) {
        for (let type in deps)
          if (devDependencies[type] && devDependencies[type] != deps[type]) updateList[type] = deps[type];
      }

      if (getSass()[1] === "true") checkUpdatesForDeps(features.sass.deps);

      if (getTypescript()[1] === "true") checkUpdatesForDeps(features.typescript.deps);

      if (Object.keys(updateList).length) npmInstall(true, updateList);
      else console.log("No packages to update");
    } else {
      throw "invalid argument passed: " + arg;
    }
  });
}
