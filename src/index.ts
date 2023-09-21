import { cliParse } from 'cliParse';
import { downloadData } from 'core';
import { log, VERSION_INFO } from 'utils';

export { YEARS, MONTHS, TradingPair, DatasetBinance } from 'core/types';

log.info(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

try {
  const { pathConfigFile, pathOutputDirectory } = cliParse();

  await downloadData({ pathConfigFile, pathOutputDirectory });
} catch (err) {
  log.error(`Error occurred: ${err as string}`);
}
