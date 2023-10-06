// import fs from 'fs';

import { TradezapConfig } from 'common/types/';

import TemporaryDefaultImport from '../../example/binance/tradezap.config';

type GetConfigParams = {
  pathConfigFile: string;
};

// TODO: Extract default export from config file
// eslint-disable-next-line @typescript-eslint/require-await
export const getTradezapConfig = async ({ pathConfigFile }: GetConfigParams): Promise<TradezapConfig> => {
  console.log('🔎 Log ~ getConfig ~ pathConfigFile:', pathConfigFile);

  const configFile = Bun.file(pathConfigFile);

  console.log('🔎 Log ~ configFile:', configFile);

  // Read the module file
  // fs.promises
  //   .readFile(moduleFilePath, 'utf8')
  //   .then((moduleContent) => {
  //     // Parse the module content into a module object
  //     const module = new Module(moduleFilePath, null);
  //     module._compile(moduleContent, moduleFilePath);

  //     // Get the default export from the module
  //     const defaultExport = module.exports.default;

  //     // Use the default export
  //     console.log('Default Export:', defaultExport);
  //   })
  //   .catch((err) => {
  //     console.error('Error reading the module file:', err);
  //   });

  return TemporaryDefaultImport;
};
