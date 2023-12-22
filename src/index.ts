import { cliParse } from 'cliParse';
import type { TradezapConfig } from 'common/types';
import { log, VERSION_INFO } from 'common/utils';
import { downloadData } from 'core';

// Bun issue - https://github.com/oven-sh/bun/issues/5426#issuecomment-1722468805
// export { TradezapConfig } from 'common/types';
export type { TradezapConfig };

const execute = async () => {
  log.info(`##### ⚡ TradeZap ${VERSION_INFO} #####`);

  try {
    const { shouldExitCli, pathConfigFile, isRedownload, isVerbose } = cliParse();

    if (shouldExitCli) {
      return;
    }

    await downloadData({ pathConfigFile, isRedownload, isVerbose });
  } catch (err) {
    log.error(err as string);
  }
};

void execute();
