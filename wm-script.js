const fs = require("fs")
const execSync = require('child_process').execSync;

const configFileName = "wm-config.js"

const args = process.argv.slice(2);
if (!args[0]) return

let configFileStr
readConfigFile()

// **************************************************************

const features = {
    sass: {
        name: "sass",
        args: {
            enableFeat: "enable-feat-sass",
            disableFeat: "disable-feat-sass"
        },
        deps: {
            "sass-loader": "12.1.0",
            "sass": "1.42.1",
        }
    },
    typescript: {
        name: "typescript",
        args: {
            enableFeat: "enable-feat-typescript",
            disableFeat: "disable-feat-typescript"
        },
        deps: {
            "@types/react": "17.0.26",
            "@types/react-dom": "17.0.9",
            "@babel/preset-typescript": "7.15.0",
            "@typescript-eslint/eslint-plugin": "4.32.0",
            "@typescript-eslint/parser": "4.32.0",
            "typescript": "4.4.3",
        }
    }
}
const globalArgs = {
    updateFeatAll: "update-feat-all"
}

// **************************************************************

function readConfigFile() {
    configFileStr = fs.readFileSync(configFileName, "utf8");
}
function writeConfigFile(newConfigFileStr) {
    fs.writeFileSync(configFileName, newConfigFileStr, "utf8")
    readConfigFile()
}

function returnDepsStringForNpmInstall(deps) {
    return Object.keys(deps).join(" ")
}
function returnDepsStringForNpmInstallWithVersion(deps) {
    return Object.keys(deps).map(v => `${v}@${deps[v]}`).join(" ")
}

function setOptionInConfig(setValue, arr, trueVal, falseVal) {
    const [line, currentValue] = arr
    const newValue = setValue ? trueVal : falseVal
    if (newValue === currentValue)
        return false

    const newLine = line.replace(currentValue, newValue)
    const newConfigFileStr = configFileStr.replace(line, newLine)
    writeConfigFile(newConfigFileStr)
    return true
}

function npmInstall(install, deps) {
    const str = install ? returnDepsStringForNpmInstallWithVersion(deps) : returnDepsStringForNpmInstall(deps)
    execSync(`npm ${install ? "i" : "un"} --save-dev --save-exact ${str}`, { stdio: 'inherit' })
}

function getBooleanOption(name) {
    const arr = new RegExp(`const\\s+${name}\\s+=\\s+(true|false)`).exec(configFileStr)
    if (arr === null)
        throw `${name} option not found. Config is broken.`
    else
        return arr.slice(0, 2)
}

function setFeature(featureName, enable, oldOption, trueVal, falseVal, installCallback) {
    console.log(enable ? "Enabling" : "Disabling", "feature", featureName)

    const result = setOptionInConfig(enable, oldOption, trueVal, falseVal)
    if (result)
        enable ? installCallback(true) : installCallback(false)
    else
        console.log("Feature is already", enable ? "enabled" : "disabled")
}

// **************************************************************

function getSass() {
    return getBooleanOption(features.sass.name)
}
function getTypescript() {
    return getBooleanOption(features.typescript.name)
}
function installSass(install) {
    npmInstall(install, features.sass.deps)
}
function installTypescript(install) {
    npmInstall(install, features.typescript.deps)
}

// **************************************************************

args.forEach(arg => {
    if ([features.sass.args.enableFeat, features.sass.args.disableFeat].includes(arg)) {
        setFeature(features.sass.name, arg === features.sass.args.enableFeat, getSass(), "true", "false", installSass)
    }
    else if ([features.typescript.args.enableFeat, features.typescript.args.disableFeat].includes(arg)) {
        setFeature(features.typescript.name, arg === features.typescript.args.enableFeat, getTypescript(), "true", "false", installTypescript)
    }
    else if (arg === globalArgs.updateFeatAll) {
        const updateList = {}

        const packageJson = fs.readFileSync('package.json', "utf8")
        const devDependencies = JSON.parse(packageJson).devDependencies
        if (!devDependencies) return

        function checkUpdatesForDeps(deps) {
            for (let type in deps)
                if (devDependencies[type] && devDependencies[type] != deps[type])
                    updateList[type] = deps[type]
        }

        if (getSass()[1] === "true")
            checkUpdatesForDeps(features.sass.deps)

        if (getTypescript()[1] === "true")
            checkUpdatesForDeps(features.typescript.deps)

        if (Object.keys(updateList).length)
            npmInstall(true, updateList)
        else
            console.log("No packages to update")
    }
    else {
        throw "invalid argument passed"
    }
})