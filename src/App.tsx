import { useState, useEffect, useCallback } from 'react'
import { CryptoCurrency } from '@/lib/types'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CryptoGrid } from '@/components/crypto/CryptoGrid'
import { FavoritesTab } from '@/components/crypto/FavoritesTab'
import { CryptoDetailModal } from '@/components/crypto/CryptoDetailModal'
import { useFavorites } from '@/hooks/useFavorites'
import { useCryptoApi } from '@/hooks/useCryptoApi'
import { apiCrypto } from '@/services/api'

export const App = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrency[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState('')

  const { executeApiCall, loading, error } = useCryptoApi()
  const { toggleFavorite, isFavorite: checkIsFavorite } = useFavorites()

  const fetchCryptocurrenciesHandler = useCallback(async () => {
    const result = await executeApiCall(apiCrypto.fetchCryptocurrencies)
    if (result) {
      setCryptocurrencies(result)
    }
  }, [executeApiCall])

  useEffect(() => {
    fetchCryptocurrenciesHandler()
  }, [fetchCryptocurrenciesHandler])

  const filteredCryptocurrencies = cryptocurrencies.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const favoriteCryptocurrencies = cryptocurrencies.filter((crypto) =>
    checkIsFavorite(crypto.id)
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    []
  )

  const handleCryptoSelect = useCallback((crypto: CryptoCurrency) => {
    setSelectedCrypto(crypto)
  }, [])

  const handleModalClose = useCallback(() => {
    setSelectedCrypto(null)
  }, [])

  if (loading && cryptocurrencies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Crypto Dashboard</h1>
      </div>

      {error && (
        <Alert className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <Input
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all" className={'border-0'}>
            All Cryptocurrencies
          </TabsTrigger>
          <TabsTrigger value="favorites" className={'border-0'}>
            Favorites ({favoriteCryptocurrencies.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <CryptoGrid
            cryptocurrencies={filteredCryptocurrencies}
            onSelectCrypto={handleCryptoSelect}
            onToggleFavorite={toggleFavorite}
            checkIsFavorite={checkIsFavorite}
          />
        </TabsContent>

        <TabsContent value="favorites">
          <FavoritesTab
            favoriteCryptocurrencies={favoriteCryptocurrencies}
            onSelectCrypto={handleCryptoSelect}
            onToggleFavorite={toggleFavorite}
            checkIsFavorite={checkIsFavorite}
          />
        </TabsContent>
      </Tabs>

      {selectedCrypto && (
        <CryptoDetailModal
          crypto={selectedCrypto}
          isOpen={!!selectedCrypto}
          onClose={handleModalClose}
          onToggleFavorite={toggleFavorite}
          isFavorite={checkIsFavorite(selectedCrypto.id)}
        />
      )}
    </div>
  )
}
