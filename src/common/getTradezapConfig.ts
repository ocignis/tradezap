/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { TradezapConfig } from 'common/types';

import TemporaryDefaultImport from '../../example/binance/tradezap.config';

type GetConfigParams = {
  pathConfigFile: string;
};

export const getTradezapConfig = async ({ pathConfigFile }: GetConfigParams): Promise<TradezapConfig> => {
  try {
    const absoluteConfigPath = `${process.cwd()}/${pathConfigFile}`;

    const module = await import(absoluteConfigPath);

    const tradezapConfig = module.default as TradezapConfig;

    console.log('🔎 Log ~ getTradezapConfig ~ tradezapConfig:', tradezapConfig);

    return tradezapConfig;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Error loading Tradezap config file. Raw ${error}`);
  }

  return TemporaryDefaultImport;
};