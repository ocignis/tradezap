import { cac } from 'cac';

console.log('##### ⚡ TradeZap #####');

const cli = cac('TradeZap');

cli.option('-c, --config <filename>', 'Custom config file', {
  default: 'tradezap.config.ts',
});

cli.option('-o, --out <dir>', 'Output directory', {
  default: 'tradezap-data',
});

cli.help();
cli.version('0.0.0');

cli.parse();

// const parsed = cli.parse();
// console.log(JSON.stringify(parsed, null, 2));
