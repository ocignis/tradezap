export type TimeSpanMonthly = {
  period: 'monthly';
  years: ReadonlyArray<Year>;
  months: ReadonlyArray<Month>;
};

export type TimeSpanDaily = {
  period: 'daily';
  years: ReadonlyArray<Year>;
  months: ReadonlyArray<Month>;
  days: ReadonlyArray<Day>;
};

export type TimeSpan = TimeSpanMonthly | TimeSpanDaily;
export type TimeSpans = ReadonlyArray<TimeSpan>;

/**
 * Trading pair [Symbol]-[Symbol]
 * @example 'BTC-BUSD | ETH-USDT | AVAX-BTC'
 * @link https://support.binance.us/hc/en-us/articles/360049417674-List-of-Supported-Assets
 */
export type TradingPair = `${string}-${string}`;

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] as const;
export type Year = (typeof YEARS)[number];

export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type Month = (typeof MONTHS)[number];

export const DAYS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;
export type Day = (typeof DAYS)[number];
