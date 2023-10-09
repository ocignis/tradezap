import { TimeSpan, Day, Month, Year } from 'core/binance/types/common';
import { SpotAssetType } from 'core/binance/types/spot';

type CreateDatasetFilenamesParams = {
  timeSpan: TimeSpan;
  tradingPair: string;
  assetType: SpotAssetType;
  asset: 'spot';
};

export const createDatasetFilenames = ({
  timeSpan,
  tradingPair,
  assetType,
  asset,
}: CreateDatasetFilenamesParams): ReadonlyArray<string> => {
  const { period } = timeSpan;

  const datasetFilenames = timeSpan.years.flatMap((year) =>
    timeSpan.months.map((month) => {
      const datasetFilename = createDatasetFilename({ tradingPair, assetType, period, year, month, day: 1, asset });

      return datasetFilename;
    }),
  );

  return datasetFilenames;
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
