import { cliParse } from 'cliParse';
import { TradezapConfig } from 'common/types';
import { log, VERSION_INFO } from 'common/utils';
import { downloadData } from 'core/binance';

// Bun issue - https://github.com/oven-sh/bun/issues/5426#issuecomment-1722468805
// export { TradezapConfig } from 'common/types';
export type { TradezapConfig };

log.info(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

try {
  const { pathConfigFile } = cliParse();

  await downloadData({ pathConfigFile });
} catch (err) {
  log.error(`Error occurred: ${err as string}`);
}
