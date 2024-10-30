/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { TradezapConfig } from 'common/types';

type GetTradezapConfigParams = {
  pathConfigFile: string;
};

export const getTradezapConfig = async ({ pathConfigFile }: GetTradezapConfigParams): Promise<TradezapConfig> => {
  try {
    const absoluteConfigPath = `${process.cwd()}/${pathConfigFile}`;

    const module = await import(absoluteConfigPath);

    const tradezapConfig = module.default as TradezapConfig;

    return tradezapConfig;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    throw new Error(`Error loading Tradezap config file. Config file '${pathConfigFile}' does not exist.`);
  }
};
