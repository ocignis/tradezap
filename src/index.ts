import { cliParse } from 'cliParse';
import { log, VERSION_INFO } from 'common/utils';
import { downloadData } from 'core/binance';

export { TradezapConfig } from 'common/types/';

log.info(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

try {
  const { pathConfigFile } = cliParse();

  await downloadData({ pathConfigFile });
} catch (err) {
  log.error(`Error occurred: ${err as string}`);
}
