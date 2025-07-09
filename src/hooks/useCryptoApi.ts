import { useCallback, useState } from 'react'

export const useCryptoApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeApiCall = useCallback(
    async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
      setLoading(true)
      setError(null)

      try {
        const result = await apiCall()
        return result
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { executeApiCall, loading, error }
}
