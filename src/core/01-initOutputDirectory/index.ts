import fs from 'fs-extra';

export const initOutputDirectory = async (pathOutputDirectory: string): Promise<void> => {
  await fs.emptyDir(pathOutputDirectory);
};
