import { TimeSpans, TradingPair } from './common';

export type SpotAssetType = 'aggTrades' | 'klines' | 'trades';

/**
 * Spot trades.
 * @link https://data.binance.vision/?prefix=data/spot/
 */
export type DatasetBinanceSpot = {
  asset: 'spot';
  assetType: SpotAssetType;
  tradingPair: TradingPair;
  timeSpans: TimeSpans;
};
