/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-empty-function */
// import { cac } from 'cac';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command(
    'curl <url>',
    'fetch the contents of the URL',
    () => {},
    (argv) => {
      console.info(argv);
    },
  )
  .demandCommand(1)
  .parse();

console.log('##### ⚡ TradeZap #####');

// const cli = cac('tradezap');

// cli.option('-c, --config <filename>', 'Custom config file', {
//   default: 'tradezap.config.ts',
// });

// cli.option('-o, --out <dir>', 'Output directory', {
//   default: 'tradezap-data',
// });

// cli.help();
// cli.version('0.0.0');

// cli.parse();

// const parsed = cli.parse();
// console.log(JSON.stringify(parsed, null, 2));

export const TEST_VAR = 'test';
console.log('🔎 Log ~ TEST_VAR:', TEST_VAR);
