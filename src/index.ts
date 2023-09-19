import { cac } from 'cac';

import { logError, logInfo, logSuccess } from 'utils/log';
import { VERSION_INFO } from 'utils/version-info';

logInfo(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

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
  logInfo('Acquiring trading data...');

  logInfo(`Created ${5} data`);

  logSuccess('Completed!');
} catch (err) {
  logError(`Error occurred: ${err as string}`);
}
