import chalk from 'chalk';
import fs from 'fs-extra';
import webpack from 'webpack';
import prodConfig from './webpack.prod.ts';
import { config } from './my-config.js';
import zlib from 'node:zlib';
import { printTable } from './helper.ts';

const args = process.argv.slice(2);
if (args[0] == 'build') {
  console.log(
    chalk.blueBright(
      `Copying Files (except index.html) ${config.publicDir} --> ${config.outputDir}...`,
    ),
  );
  fs.emptyDirSync(config.outputDir);
  fs.copySync(config.publicDir, config.outputDir, {
    dereference: true,
    filter: src => !src.endsWith(config.htmlFileTemplate),
  });

  console.log(chalk.blueBright('Building...', '\n'));
  webpack({ ...prodConfig, stats: 'none' }, (err, stats) => {
    if (err) {
      console.log(err);
    }
    else if (stats) {
      if (stats.hasWarnings()) {
        const warnings = stats.compilation.warnings;
        console.log(chalk.yellowBright(`WARNINGS: ${warnings.length}`));
        warnings.forEach(value => console.log(value.message));
      }
      if (stats.hasErrors()) {
        const errors = stats.compilation.errors;
        console.log(chalk.redBright(`ERRORS: ${errors.length}`));
        errors.forEach(value => console.log(value.message));

        console.log(chalk.redBright(`Build Failed`));
      }
      // log bundle assets
      else {
        const tableData = [['Asset', 'Size (KB)', 'GZip (KB)', 'Brotli (KB)']];
        for (const [key, value] of stats.compilation.assetsInfo) {
          const fileContent = fs.readFileSync(`${config.outputDir}/${key}`);
          tableData.push([
            key,
            ((value.size ?? 0) / 1024).toFixed(2),
            (zlib.gzipSync(fileContent).length / 1024).toFixed(2),
            (zlib.brotliCompressSync(fileContent).length / 1024).toFixed(2),
          ]);
        }
        console.log('\n');
        printTable(tableData, 4);

        console.log(
          `\nThe project was built assuming it is hosted at ${chalk.yellowBright(config.publicPathInProd)}.`,
          `\nYou can control this with the  ${chalk.yellowBright('PUBLIC_PATH_PROD')} env variable in ${chalk.yellowBright('.env* files')}.`,
          `\nThe ${chalk.yellowBright(config.outputDir)} folder is ready to be deployed.`,
        );
        console.log(
          chalk.blueBright(
            `Done! ${(stats.endTime - stats.startTime) / 1000}s`,
          ),
        );
      }
    }
  });
}
