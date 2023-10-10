import { BASE_URL } from 'core/binance/consts';

import { DatasetInfo, DatasetsInfo } from '..';
import { DatasetBinanceSpot } from '../../types/spot';

import { createDatasetFilenames } from './createDatasetFilenames';

type createDatasetsInfoSpotParams = {
  dataset: DatasetBinanceSpot;
  pathOutputDirectory: string;
};

export const createDatasetsInfoSpot = ({
  dataset,
  pathOutputDirectory,
}: createDatasetsInfoSpotParams): DatasetsInfo => {
  const { asset, assetType, tradingPair, timeSpans } = dataset;

  const tradingPairFormatted = tradingPair.replace('-', '');

  const datasetsInfo = timeSpans.flatMap((timeSpan) => {
    const datasetFilenames = createDatasetFilenames({
      timeSpan,
      tradingPair: tradingPairFormatted,
      assetType,
    });

    const datasetsInfoSingleTimeSpan = datasetFilenames.map((datasetFilename) => {
      const datasetUrl = `${BASE_URL}/${asset}/${timeSpan.period}/${assetType}/${tradingPairFormatted}/${datasetFilename}`;

      const targetFolder = `${pathOutputDirectory}/${tradingPair}/${asset}/${assetType}/${timeSpan.period}`;

      const targetPath = `${targetFolder}/${datasetFilename}`;

      const datasetInfo: DatasetInfo = { datasetUrl, targetPath, targetFolder, datasetFilename };

      return datasetInfo;
    });

    return datasetsInfoSingleTimeSpan;
  });
  return datasetsInfo;
};
