import { CryptoCurrency } from '@/lib/types'
import { CryptoCard } from '@/components/crypto/CryptoCard'

export const CryptoGrid: React.FC<{
  cryptocurrencies: CryptoCurrency[]
  onSelectCrypto: (crypto: CryptoCurrency) => void
  onToggleFavorite: (cryptoId: string) => void
  checkIsFavorite: (cryptoId: string) => boolean
}> = ({
  cryptocurrencies,
  onSelectCrypto,
  onToggleFavorite,
  checkIsFavorite,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cryptocurrencies.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          onSelect={onSelectCrypto}
          isFavorite={checkIsFavorite(crypto.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
