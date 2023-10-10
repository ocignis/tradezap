import { cliParse } from 'cliParse';
import { TradezapConfig } from 'common/types';
import { log, VERSION_INFO } from 'common/utils';
import { downloadData } from 'core';

// Bun issue - https://github.com/oven-sh/bun/issues/5426#issuecomment-1722468805
// export { TradezapConfig } from 'common/types';
export type { TradezapConfig };

log.info(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

try {
  const { pathConfigFile, isVerbose } = cliParse();

  await downloadData({ pathConfigFile, isVerbose });
} catch (err) {
  log.error(`Error occurred: ${err as string}`);
}
