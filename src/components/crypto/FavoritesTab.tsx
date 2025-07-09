import { CryptoCurrency } from '@/lib/types'
import { Heart } from 'lucide-react'
import { CryptoGrid } from '@/components/crypto/CryptoGrid'

export const FavoritesTab: React.FC<{
  favoriteCryptocurrencies: CryptoCurrency[]
  onSelectCrypto: (crypto: CryptoCurrency) => void
  onToggleFavorite: (cryptoId: string) => void
  checkIsFavorite: (cryptoId: string) => boolean
}> = ({
  favoriteCryptocurrencies,
  onSelectCrypto,
  onToggleFavorite,
  checkIsFavorite,
}) => {
  if (favoriteCryptocurrencies.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">
          No favorites yet. Add some cryptocurrencies to your favorites!
        </p>
      </div>
    )
  }

  return (
    <CryptoGrid
      cryptocurrencies={favoriteCryptocurrencies}
      onSelectCrypto={onSelectCrypto}
      onToggleFavorite={onToggleFavorite}
      checkIsFavorite={checkIsFavorite}
    />
  )
}
