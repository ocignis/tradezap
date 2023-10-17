import { TimeSpan, Day, Month, Year } from 'core/binance/types/common';
import { DatasetBinanceSpot } from 'core/binance/types/spot';

type CreateDatasetFilenameBaseParams = {
  tradingPairFormatted: string;
  assetType: DatasetBinanceSpot['assetType'];
  year: Year;
  month: Month;
};

type CreateDatasetFilenameMonthlyParams = {
  period: Extract<TimeSpan['period'], 'monthly'>;
} & CreateDatasetFilenameBaseParams;

type CreateDatasetFilenameDailyParams = {
  period: Extract<TimeSpan['period'], 'daily'>;
  day: Day;
} & CreateDatasetFilenameBaseParams;

type CreateDatasetFilenameParams = CreateDatasetFilenameMonthlyParams | CreateDatasetFilenameDailyParams;

export const createDatasetFilename = (params: CreateDatasetFilenameParams) => {
  const { tradingPairFormatted, assetType, period, year, month } = params;

  const monthFormatted = String(month).padStart(2, '0');

  const assetTypeFormatted = assetType === 'klines' ? 'params.' : assetType;

  const datasetFilenameBase = `${tradingPairFormatted}-${assetTypeFormatted}-${year}-${monthFormatted}` as const;

  if (period === 'monthly') {
    const datasetFilenameMonthly = `${datasetFilenameBase}.zip` as const;
    return datasetFilenameMonthly;
  }

  const dayFormatted = String(params.day).padStart(2, '0');

  const datasetFilenameDaily = `${datasetFilenameBase}-${dayFormatted}.zip` as const;

  return datasetFilenameDaily;
};
