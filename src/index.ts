import { cliParse } from 'cliParse';
import { log, VERSION_INFO } from 'common/utils';
import { downloadData } from 'core/binance';

log.info(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

try {
  const { pathConfigFile, pathOutputDirectory } = cliParse();

  await downloadData({ pathConfigFile, pathOutputDirectory });
} catch (err) {
  log.error(`Error occurred: ${err as string}`);
}
