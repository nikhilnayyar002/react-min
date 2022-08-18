const nets = require("os").networkInterfaces();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { escapeStringRegexp } = require("./wm-util");

/**
 * tsconfig path alias:
 *  "compilerOptions": {
 *      "baseUrl": ".",
 *      "paths": {
 *          "@styles/*": [
 *              "src/styles/*"
 *          ]
 *      },
 *
 * webpack path alias:
 *  "@styles": path.resolve(__dirname, 'src/utilities/'),
 */
exports.getWebpackAliasFromTsConfig = (tsConfig) => {
  let webpackAlias = {};
  const baseUrl = tsConfig?.compilerOptions?.baseUrl;
  if (!baseUrl) throw "tsconfig.json baseUrl missing";
  const paths = tsConfig?.compilerOptions?.paths;

  if (paths) {
    if (baseUrl !== ".") throw 'tsconfig.json baseUrl must have value "." when paths is also provided.';

    for (let p in paths) {
      let a = p.substring(0, p.length - 2);
      if (paths[p].length) {
        let b = paths[p][0];
        let c = b.substring(0, b.length - 1);
        webpackAlias[a] = path.resolve(__dirname, c);
      }
    }
  }
  return webpackAlias;
};

exports.getWebpackResolveModulesFromTsConfig = (tsConfig) => {
  const modules = ["node_modules"];
  const baseUrl = tsConfig?.compilerOptions?.baseUrl;
  if (baseUrl) modules.unshift(path.resolve(__dirname, baseUrl));

  return modules;
};

exports.getClientIPAddresses = (clientPort, httpsMode = false) => {
  const temp = [];
  for (const name of Object.keys(nets))
    for (const net of nets[name])
      if (net.family === "IPv4")
        temp.push(`${httpsMode ? "https" : "http"}://${net.internal ? "localhost" : net.address}:${clientPort}`);
  return temp;
};

// https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/InterpolateHtmlPlugin.js
// https://github.com/jantimon/html-webpack-plugin/#events
const interpolateHtmlPluginName = "InterpolateHtmlPlugin";
exports[interpolateHtmlPluginName] = class {
  constructor(replacements) {
    this.replacements = replacements;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(interpolateHtmlPluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(interpolateHtmlPluginName, (data, cb) => {
        // Run HTML through a series of user-specified string replacements.
        Object.keys(this.replacements).forEach((key) => {
          const value = this.replacements[key];
          data.html = data.html.replace(new RegExp("%" + escapeStringRegexp(key) + "%", "g"), value);
        });
        cb(null, data);
      });
    });
  }
};

// https://github.com/cascornelissen/event-hooks-webpack-plugin
const eventHooksPluginName = "EventHooksPlugin";
exports[eventHooksPluginName] = class {
  constructor(hooks) {
    this.hooks = hooks;
  }

  apply(compiler) {
    const hooks = this.hooks;

    Object.keys(hooks).forEach((hook) => {
      const hookFunction = hooks[hook];
      let errorMessage = "";

      if (typeof hookFunction !== "function")
        errorMessage = `${eventHooksPluginName}: provide a function for the ${hook}!!`;
      if (!Object.keys(compiler.hooks).includes(hook)) errorMessage = `${eventHooksPluginName}: Invalid hook name`;

      if (errorMessage)
        compiler.hooks.make.tap(eventHooksPluginName, (compilation) =>
          compilation.errors.push(new Error(errorMessage))
        );
      else compiler.hooks[hook].tap(eventHooksPluginName, hookFunction);
    });
  }
};

// https://github.com/danillouz/clean-terminal-webpack-plugin
const cleanTerminalPluginName = "CleanTerminalPlugin";
exports[cleanTerminalPluginName] = class {
  constructor({ message }) {
    this.message = message;
    this.firstRun = true;
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tap(cleanTerminalPluginName, () => {
      if (this.firstRun) {
        this.firstRun = false;
        return;
      }
      this.clearConsole();
    });
  }

  clearConsole() {
    const clear = "\x1B[2J\x1B[3J\x1B[H";
    const output = this.message ? `${clear + this.message}\n\n` : clear;

    process.stdout.write(output);
  }
};

// https://stackoverflow.com/a/50325607/11216153
exports.chalk = (() => {
  const ansiEscColorCode = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",

    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
  };

  const brightColor = (colorCode, v) => ansiEscColorCode.bright + colorCode + v + ansiEscColorCode.reset;

  return {
    blueBright: (v) => brightColor(ansiEscColorCode.fgBlue, v),
    yellowBright: (v) => brightColor(ansiEscColorCode.fgYellow, v),
    redBright: (v) => brightColor(ansiEscColorCode.fgRed, v),
    greenBright: (v) => brightColor(ansiEscColorCode.fgGreen, v),
    lengthOfStrWithoutAnsiCode: (str) => str.replace(/\x1B[\w\[]+m/g, "").length,
  };
})();

exports.printTable = (table) => {
  const colLengths = Array(table[0].length).fill(0);

  for (const row of table) {
    let i = 0;
    for (const col of row) {
      const colLength = this.chalk.lengthOfStrWithoutAnsiCode(col);
      if (colLengths[i] < colLength) colLengths[i] = colLength;
      ++i;
    }
  }
  {
    let rowIndex = 0;
    for (const row of table) {
      let i = 0,
        colStr = "";
      if (rowIndex === 1) {
        let lineStr = "";
        for (const len of colLengths) lineStr += " | " + Array(len + 1).join("-");
        console.log(lineStr + " |");
      }
      for (const col of row) {
        const spaces = Array(colLengths[i] - this.chalk.lengthOfStrWithoutAnsiCode(col) + 1).join(" ");
        colStr += " | " + col + spaces;
        ++i;
      }
      console.log(colStr + " |");
      ++rowIndex;
    }
  }
};
