import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { WebpackPluginInstance, Compiler } from 'webpack';
import webpack from 'webpack';
import ansiEscapes from 'ansi-escapes';
import os from 'node:os';

/**
 * replace the variables in html with values
 * https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/InterpolateHtmlPlugin.js
 * https://github.com/jantimon/html-webpack-plugin/#events
 */
const interpolateHtmlPluginName = 'InterpolateHtmlPlugin';
export class InterpolateHtmlPlugin implements WebpackPluginInstance {
  replacements: string[];

  constructor(_replacements: typeof this.replacements) {
    this.replacements = _replacements;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(interpolateHtmlPluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
        interpolateHtmlPluginName,
        (data, cb) => {
          // Run HTML through a series of user-specified string replacements.
          Object.keys(this.replacements).forEach((key) => {
            const value = process.env[key];
            if (value)
              data.html = data.html.replace(
                new RegExp('%' + RegExp.escape(key) + '%', 'g'),
                value,
              );
          });
          cb(null, data);
        },
      );
    });
  }
}

/**
 * https://github.com/cascornelissen/event-hooks-webpack-plugin/blob/master/source/index.ts
 */
const eventHooksPluginName = 'EventHooksPlugin';
export class EventHooksPlugin {
  hooks: {
    -readonly [k in keyof Compiler['hooks']]?: (...params: unknown[]) => void;
  };

  constructor(hooks: typeof this.hooks) {
    this.hooks = hooks;
  }

  apply(compiler: Compiler): void {
    const hooks = this.hooks;

    Object.keys(hooks)
      .filter((name) => {
        const isKnownHook = name in compiler.hooks;

        if (!isKnownHook) {
          compiler.hooks.make.tap(eventHooksPluginName, (compilation) => {
            compilation.errors.push(
              new webpack.WebpackError(
                `Unknown hook used in ${eventHooksPluginName}: ${name}`,
              ),
            );
          });
        }

        return isKnownHook;
      })
      .forEach((name) => {
        const callback = hooks[name as keyof Compiler['hooks']];
        if (callback) {
          const hook = compiler.hooks[name as keyof Compiler['hooks']];
          hook.tap(eventHooksPluginName, callback);
        }
      });
  }
}

/**
 * inspired by https://github.com/danillouz/clean-terminal-webpack-plugin
 */

const cleanTerminalPluginName = 'CleanTerminalPlugin';
export class CleanTerminalPlugin {
  message = '';
  firstRun = true;

  constructor(message: string) {
    this.message = message;
  }

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tap(cleanTerminalPluginName, () => {
      if (this.firstRun) {
        this.firstRun = false;
        return;
      }
      process.stdout.write(`${ansiEscapes.clearTerminal}`);
      process.stdout.write(`${this.message}\n\n`);
    });
  }
}

export const getClientIPAddresses = (clientPort: number, httpsMode = false) => {
  const interfaceInfoDic = os.networkInterfaces();
  const temp = [];
  for (const name in interfaceInfoDic) {
    const interfaceInfos = interfaceInfoDic[name];
    if (interfaceInfos)
      for (const interfaceInfo of interfaceInfos)
        if (interfaceInfo.family === 'IPv4')
          temp.push(
            `${httpsMode ? 'https' : 'http'}://${interfaceInfo.internal ? 'localhost' : interfaceInfo.address}:${clientPort}`,
          );
  }

  return temp;
};

export const printTable = (table: string[][], noOfColumns: number) => {
  const columnLengths = Array(noOfColumns).fill(0); // length of each column

  // loop through each row
  for (const row of table)
    // loop through each column
    for (let i = 0; i < noOfColumns; ++i)
      // store max length for ith column
      if (row[i].length > columnLengths[i])
        columnLengths[i] = row[i].length;

  // start printing rows
  for (const row of table) {
    let str = '';
    for (let i = 0; i < noOfColumns; ++i)
      str += row[i] + Array(columnLengths[i] - row[i].length).fill(' ').join('') + ' | ';
    console.log(str);
  }
};
