/**
 * Trading pair [Symbol]-[Symbol]
 * @example 'BTC-BUSD | ETH-USDT | AVAX-BTC'
 * @link https://support.binance.us/hc/en-us/articles/360049417674-List-of-Supported-Assets
 */
export type TradingPair = `${string}-${string}`;

/**
 * Binance data provider (single set)
 * @link https://data.binance.vision/
 */
export type DataProviderBinanceSet = {
  tradingPair: TradingPair;
  timeSpans: ReadonlyArray<{
    year: 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023;
    months?: ReadonlyArray<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>;
  }>;
};

/**
 * Binance data provider
 * @link https://data.binance.vision/
 */
export type DataProviderBinance = ReadonlyArray<DataProviderBinanceSet>;

const DATA_PROVIDER_BINANCE: DataProviderBinance = [
  {
    tradingPair: 'BTC-BUSD',
    timeSpans: [
      {
        year: 2023,
        months: [10],
      },
      {
        year: 2022,
        months: [9, 10, 11, 12],
      },
      {
        year: 2021,
      },
    ],
  },
  {
    tradingPair: 'ETH-BUSD',
    timeSpans: [
      {
        year: 2023,
        months: [9, 10, 11],
      },
    ],
  },
];

export default DATA_PROVIDER_BINANCE;
