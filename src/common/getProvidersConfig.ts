// import fs from 'fs';

import { Providers } from 'common/types/';

import TemporaryDefaultImport from '../../example/binance/tradezap.config';

type GetConfigParams = {
  pathConfigFile: string;
};

// TODO: Extract default export from config file
// eslint-disable-next-line @typescript-eslint/require-await
export const getProvidersConfig = async ({ pathConfigFile }: GetConfigParams): Promise<Providers> => {
  console.log('🔎 Log ~ getConfig ~ pathConfigFile:', pathConfigFile);

  const foo = Bun.file(pathConfigFile);

  console.log('🔎 Log ~ getConfig ~ foo:', foo);
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
