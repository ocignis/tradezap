/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { cac } from 'cac';

import { DEFAULT_PATH_CONFIG_FILE } from 'common/consts';
import { VERSION_INFO } from 'common/utils';

type CliParseResult = {
  pathConfigFile: string;
  isVerbose: boolean;
};

export const cliParse = (): CliParseResult => {
  const cli = cac('tradezap');

  cli.option('-c, --config <filename>', 'Custom config file', {
    default: DEFAULT_PATH_CONFIG_FILE,
  });

  cli.option('--verbose', 'Verbose output', {
    default: true,
  });

  cli.help();
  cli.version(VERSION_INFO);

  const cliParams = cli.parse();

  console.log('🔎 Log ~ cliParse ~ cliParams:', cliParams);

  return {
    pathConfigFile: cliParams.options.config,
    isVerbose: cliParams.options.verbose,
  };
};
