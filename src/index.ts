import { cac } from 'cac';

const cli = cac('TradeZap');

cli.option('-c, --config <filename>', 'Custom config file (defaults to tradezap.config.js)', {
  default: 'tradezap.config.ts',
});

cli.help();
cli.version('0.0.0');

const parsed = cli.parse();

console.log(JSON.stringify(parsed, null, 2));

console.log('##### ⚡ Log ~ TradeZap #####');
