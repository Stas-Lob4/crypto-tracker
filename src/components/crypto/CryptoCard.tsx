import { CryptoCurrency } from '@/lib/types'
import { useCallback } from 'react'
import { Heart, TrendingDown, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from '@/lib/formatUtils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const CryptoCard: React.FC<{
  crypto: CryptoCurrency
  onSelect: (crypto: CryptoCurrency) => void
  isFavorite: boolean
  onToggleFavorite: (cryptoId: string) => void
}> = ({ crypto, onSelect, isFavorite, onToggleFavorite }) => {
  const isPositive = crypto.price_change_percentage_24h > 0

  const handleCardClick = useCallback(() => {
    onSelect(crypto)
  }, [crypto, onSelect])

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onToggleFavorite(crypto.id)
    },
    [crypto.id, onToggleFavorite]
  )

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">{crypto.name}</h3>
              <p className="text-sm text-gray-600 uppercase">{crypto.symbol}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleFavoriteClick}>
            <Heart
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {formatCurrency(crypto.current_price)}
            </span>
            <Badge
              variant={isPositive ? 'default' : 'destructive'}
              className="flex items-center gap-1"
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {formatPercentage(crypto.price_change_percentage_24h)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="block">Market Cap</span>
              <span className="font-semibold">
                {formatNumber(crypto.market_cap)}
              </span>
            </div>
            <div>
              <span className="block">Volume 24h</span>
              <span className="font-semibold">
                {formatNumber(crypto.total_volume)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
