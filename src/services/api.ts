import { CryptoCurrency, CryptoDetail, PriceHistoryItem } from '@/lib/types'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    x_cg_demo_api_key: 'CG-3G1m4RsQCJsrkajdSLVGUP4E',
  }

  return config
})

export const apiCrypto = {
  fetchCryptocurrencies: async (): Promise<CryptoCurrency[]> => {
    const { data } = await instance.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: false,
      },
    })

    return data
  },
  fetchCryptoDetail: async (id: string): Promise<CryptoDetail> => {
    const { data } = await instance.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    })

    return {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      current_price: data.market_data.current_price.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      market_cap: data.market_data.market_cap.usd,
      total_volume: data.market_data.total_volume.usd,
      circulating_supply: data.market_data.circulating_supply,
      total_supply: data.market_data.total_supply,
      max_supply: data.market_data.max_supply,
      market_cap_rank: data.market_cap_rank,
      image: data.image.large,
      description: data.description.en,
    }
  },
  fetchPriceHistory: async (id: string): Promise<PriceHistoryItem[]> => {
    const { data } = await instance.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: 2,
      },
    })

    return data.prices.map(([timestamp, price]: [number, number]) => ({
      time: new Date(timestamp).toLocaleTimeString(),
      price,
    }))
  },
}
