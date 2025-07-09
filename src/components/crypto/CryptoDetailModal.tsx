import { CryptoCurrency, CryptoDetail, PriceHistoryItem } from '@/lib/types'
import { useCallback, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from '@/lib/formatUtils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, DollarSign, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PriceHistoryList } from '@/components/crypto/PriceHistoryList'
import { useCryptoApi } from '@/hooks/useCryptoApi'
import { apiCrypto } from '@/services/api'

export const CryptoDetailModal: React.FC<{
  crypto: CryptoCurrency
  isOpen: boolean
  onClose: () => void
  onToggleFavorite: (cryptoId: string) => void
  isFavorite: boolean
}> = ({ crypto, isOpen, onClose, onToggleFavorite, isFavorite }) => {
  const [detail, setDetail] = useState<CryptoDetail | null>(null)
  const [priceHistory, setPriceHistory] = useState<PriceHistoryItem[]>([])
  const { executeApiCall, loading, error } = useCryptoApi()

  const fetchDetails = useCallback(async () => {
    if (!crypto) return

    const [detailResult, historyResult] = await Promise.all([
      executeApiCall(() => apiCrypto.fetchCryptoDetail(crypto.id)),
      executeApiCall(() => apiCrypto.fetchPriceHistory(crypto.id)),
    ])

    if (detailResult) setDetail(detailResult)
    if (historyResult) setPriceHistory(historyResult)
  }, [crypto, executeApiCall])

  useEffect(() => {
    if (isOpen && crypto) {
      fetchDetails()
    }
  }, [isOpen, crypto, fetchDetails])

  const handleFavoriteClick = useCallback(() => {
    onToggleFavorite(crypto.id)
  }, [crypto.id, onToggleFavorite])

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4/5 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-8 h-8 rounded-full"
            />
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <Alert>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {detail && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-3xl font-bold mb-2">
                  {formatCurrency(detail.current_price)}
                </div>
                <Badge
                  variant={
                    detail.price_change_percentage_24h > 0
                      ? 'default'
                      : 'destructive'
                  }
                >
                  {formatPercentage(detail.price_change_percentage_24h)}
                </Badge>
              </div>
              <Button
                onClick={handleFavoriteClick}
                variant={isFavorite ? 'default' : 'outline'}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`}
                />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Market Cap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(detail.market_cap)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Rank #{detail.market_cap_rank}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Volume 24h
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(detail.total_volume)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Supply</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(detail.circulating_supply)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Max Supply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {detail.max_supply ? formatNumber(detail.max_supply) : '∞'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {priceHistory.length > 0 && (
              <PriceHistoryList priceHistory={priceHistory} />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
