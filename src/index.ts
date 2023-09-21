import { cliParse } from 'cliParse';
import { downloadData } from 'core/binance';
import { log, VERSION_INFO } from 'utils';

log.info(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

try {
  const { pathConfigFile, pathOutputDirectory } = cliParse();

  await downloadData({ pathConfigFile, pathOutputDirectory });
} catch (err) {
  log.error(`Error occurred: ${err as string}`);
}
