/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { cac } from 'cac';

import { VERSION_INFO } from 'common/utils';

type CliParseResult = {
  pathConfigFile: string;
};

const DEFAULT_CONFIG_FILE = 'tradezap.config.ts';

export const cliParse = (): CliParseResult => {
  const cli = cac('tradezap');

  cli.option('-c, --config <filename>', 'Custom config file', {
    default: DEFAULT_CONFIG_FILE,
  });

  cli.help();
  cli.version(VERSION_INFO);

  const cliParams = cli.parse();

  return {
    pathConfigFile: cliParams.options.config,
  };
};
