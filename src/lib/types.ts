export interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
}

export interface CryptoDetail {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  market_cap_rank: number
  image: string
  description: string
}

export interface PriceHistoryItem {
  time: string
  price: number
}

export interface ApiConfig {
  baseUrl: string
  apiKey: string | null
}
