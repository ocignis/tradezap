/**
 * Binance provider.
 */
export type ProviderBinance = {
  settings: SettingsBinance;
  datasets: DatasetsBinance;
};

export type SettingsBinance = {
  shouldUnzipDatasets?: boolean;
};

/**
 * Binance data provider (single set)
 * @link https://data.binance.vision/
 */
type DatasetBinance = {
  tradingPair: TradingPair;
  timeSpans: ReadonlyArray<TimeSpan>;
};

/**
 * Binance data provider
 * @link https://data.binance.vision/
 */
export type DatasetsBinance = ReadonlyArray<DatasetBinance>;

type TimeSpan = {
  years: ReadonlyArray<Year>;
  months: ReadonlyArray<Month>;
};

/**
 * Trading pair [Symbol]-[Symbol]
 * @example 'BTC-BUSD | ETH-USDT | AVAX-BTC'
 * @link https://support.binance.us/hc/en-us/articles/360049417674-List-of-Supported-Assets
 */
export type TradingPair = `${string}-${string}`;

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023] as const;
type Year = (typeof YEARS)[number];

export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type Month = (typeof MONTHS)[number];
