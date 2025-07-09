import { useCallback, useEffect, useState } from 'react'
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from '@/services/storage'

const isFavorite = (cryptoId: string, favorites: string[]): boolean => {
  return favorites.includes(cryptoId)
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const handleAddToFavorites = useCallback((cryptoId: string) => {
    const newFavorites = addToFavorites(cryptoId)
    setFavorites(newFavorites)
  }, [])

  const handleRemoveFromFavorites = useCallback((cryptoId: string) => {
    const newFavorites = removeFromFavorites(cryptoId)
    setFavorites(newFavorites)
  }, [])

  const handleToggleFavorite = useCallback(
    (cryptoId: string) => {
      if (isFavorite(cryptoId, favorites)) {
        handleRemoveFromFavorites(cryptoId)
      } else {
        handleAddToFavorites(cryptoId)
      }
    },
    [favorites, handleAddToFavorites, handleRemoveFromFavorites]
  )

  const checkIsFavorite = useCallback(
    (cryptoId: string) => {
      return isFavorite(cryptoId, favorites)
    },
    [favorites]
  )

  return {
    favorites,
    addToFavorites: handleAddToFavorites,
    removeFromFavorites: handleRemoveFromFavorites,
    toggleFavorite: handleToggleFavorite,
    isFavorite: checkIsFavorite,
  }
}
