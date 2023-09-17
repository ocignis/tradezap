import { cac } from 'cac';

import { VERSION_INFO } from 'utils/version-info';

console.log('##### ⚡ TradeZap #####');

const cli = cac('tradezap');

cli.option('-c, --config <filename>', 'Custom config file', {
  default: 'tradezap.config.ts',
});

cli.option('-o, --out <dir>', 'Output directory', {
  default: 'tradezap-data',
});

cli.help();
cli.version(VERSION_INFO);

cli.parse();

const parsed = cli.parse();
console.log(JSON.stringify(parsed, null, 2));

export const TEST_VAR = 'test';
console.log('🔎 Log ~ TEST_VAR:', TEST_VAR);
