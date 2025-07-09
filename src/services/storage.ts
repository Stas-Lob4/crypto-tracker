export const getFavorites = (): string[] => {
  const saved = localStorage.getItem('crypto_favorites')
  return saved ? JSON.parse(saved) : []
}

export const saveFavorites = (favorites: string[]): void => {
  localStorage.setItem('crypto_favorites', JSON.stringify(favorites))
}

export const addToFavorites = (cryptoId: string): string[] => {
  const favorites = getFavorites()
  const newFavorites = [...favorites, cryptoId]
  saveFavorites(newFavorites)
  return newFavorites
}

export const removeFromFavorites = (cryptoId: string): string[] => {
  const favorites = getFavorites()
  const newFavorites = favorites.filter((id) => id !== cryptoId)
  saveFavorites(newFavorites)
  return newFavorites
}
