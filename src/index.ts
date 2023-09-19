import { cac } from 'cac';

import { log, VERSION_INFO } from 'utils';

log.info(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

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

export const TEST_VAR = 'test';

try {
  log.info('Acquiring trading data...');

  log.info(`Created ${5} data`);

  log.success('Completed!');
} catch (err) {
  log.error(`Error occurred: ${err as string}`);
}
