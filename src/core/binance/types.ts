/**
 * Binance provider.
 * @link https://www.binance.com
 */
export type ProviderBinance = {
  settings: SettingsBinance;
  datasets: DatasetsBinance;
};

export type SettingsBinance = {
  outputDirectory?: string;
  shouldUnzipDatasets?: boolean;
};

/**
 * Spot trades.
 */
export type DatasetBinanceSpot = DatasetBinanceSpotDaily | DatasetBinanceSpotMonthly;

type DatasetBinanceSpotBase = {
  asset: 'spot';
  assetType: 'aggTrades' | 'klines' | 'trades';
  tradingPair: TradingPair;
};

type DatasetBinanceSpotDaily = DatasetBinanceSpotBase & {
  period: 'daily';
  timeSpans: ReadonlyArray<TimeSpanDaily>;
};

type DatasetBinanceSpotMonthly = DatasetBinanceSpotBase & {
  period: 'monthly';
  timeSpans: ReadonlyArray<TimeSpanMonthly>;
};

/**
 * Derivative contracts futures.
 */
export type DatasetBinanceFutures = DatasetBinanceFuturesDaily | DatasetBinanceFuturesMonthly;

type DatasetBinanceFuturesBase = {
  asset: 'futures';
  /**
   * CM - COIN-M | UM - USDT-M
   */
  futuresType: 'cm' | 'um';
  assetType:
    | 'aggTrades'
    | 'bookTicker'
    | 'fundingRate'
    | 'indexPriceKlines'
    | 'klines'
    | 'markPriceKlines'
    | 'premiumIndexKlines'
    | 'trades';
  tradingPair: TradingPair;
};

type DatasetBinanceFuturesDaily = DatasetBinanceFuturesBase & {
  period: 'daily';
  timeSpans: ReadonlyArray<TimeSpanDaily>;
};

type DatasetBinanceFuturesMonthly = DatasetBinanceFuturesBase & {
  period: 'monthly';
  timeSpans: ReadonlyArray<TimeSpanMonthly>;
};

/**
 * Derivative contracts options.
 */
export type DatasetBinanceOption = DatasetBinanceOptionDaily;

type DatasetBinanceOptionBase = {
  asset: 'option';
  optionType: 'bvol-index' | 'eoh-summary';
  tradingPair: TradingPair;
};

type DatasetBinanceOptionDaily = DatasetBinanceOptionBase & {
  period: 'daily';
  timeSpans: ReadonlyArray<TimeSpanDaily>;
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

type TimeSpanMonthly = {
  years: ReadonlyArray<Year>;
  months: ReadonlyArray<Month>;
};

type TimeSpanDaily = TimeSpanMonthly & {
  days: ReadonlyArray<Day>;
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

export const DAYS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;
type Day = (typeof DAYS)[number];
