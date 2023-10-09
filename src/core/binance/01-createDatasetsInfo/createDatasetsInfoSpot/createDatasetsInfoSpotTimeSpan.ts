import { TimeSpan, Day, Month, Year } from 'core/binance/types/common';
import { SpotAssetType } from 'core/binance/types/spot';

import { DatasetInfo, DatasetsInfo } from '..';
import { BASE_URL } from '../../consts';

type CreateDatasetsInfoSpotTimeSpanParams = {
  timeSpan: TimeSpan;
  pathOutputDirectory: string;
  tradingPair: string;
  assetType: SpotAssetType;
  asset: 'spot';
};

export const createDatasetsInfoSpotTimeSpan = ({
  timeSpan,
  pathOutputDirectory,
  tradingPair,
  assetType,
  asset,
}: CreateDatasetsInfoSpotTimeSpanParams): DatasetsInfo => {
  const { period } = timeSpan;

  const datasetsInfo = timeSpan.years.flatMap((year) =>
    timeSpan.months.map((month) => {
      const datasetFilename = createDatasetFilename({ tradingPair, assetType, period, year, month, day: 1, asset });

      const datasetUrl = `${BASE_URL}/${asset}/${period}/${assetType}/${tradingPair}/${datasetFilename}`;

      const targetPath = `${pathOutputDirectory}/${tradingPair}/${datasetFilename}`;

      const targetFolder = `${pathOutputDirectory}/${tradingPair}`;

      const datasetInfo: DatasetInfo = { datasetUrl, targetPath, targetFolder, datasetFilename };

      return datasetInfo;
    }),
  );

  return datasetsInfo;
};

type CreateDatasetFilenameParams = {
  tradingPair: string;
  assetType: SpotAssetType;
  period: TimeSpan['period'];
  year: Year;
  month: Month;
  day: Day;
  asset: 'spot';
};

const createDatasetFilename = ({
  tradingPair,
  assetType,
  period,
  year,
  month,
  day,
}: CreateDatasetFilenameParams): string => {
  const monthFormatted = String(month).padStart(2, '0');

  const datasetFilenameBase = `${tradingPair}-${assetType}-${year}-${monthFormatted}`;

  if (period === 'monthly') {
    const datasetFilenameMonthly = `${datasetFilenameBase}.zip`;
    return datasetFilenameMonthly;
  }

  const dayFormatted = String(day).padStart(2, '0');

  const datasetFilenameDaily = `${datasetFilenameBase}-${dayFormatted}.zip`;

  return datasetFilenameDaily;
};
