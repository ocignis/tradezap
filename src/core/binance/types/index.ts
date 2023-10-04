import { DatasetBinanceFutures } from './futures';
import { DatasetBinanceOption } from './option';
import { DatasetBinanceSpot } from './spot';

/**
 * Binance provider.
 * @link https://www.binance.com
 */
export type ProviderBinance = {
  provider: 'binance';
  settings: SettingsBinance;
  datasets: DatasetsBinance;
};

export type SettingsBinance = {
  outputDirectory?: string;
  shouldUnzipDatasets?: boolean;
};

/**
 * Binance data provider (single set)
 * @link https://data.binance.vision/
 */
type DatasetBinance = DatasetBinanceSpot | DatasetBinanceFutures | DatasetBinanceOption;

/**
 * Binance data provider
 * @link https://data.binance.vision/
 */
export type DatasetsBinance = ReadonlyArray<DatasetBinance>;
