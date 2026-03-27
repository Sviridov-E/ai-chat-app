import { apiInstance } from './base'
import { PATHS } from './config'
import { getRefreshToken, resetTokens, setAccessToken } from './tokens'

let refreshTokenPromise: Promise<void> | null = null

export const refreshToken = async () => {
  if (refreshTokenPromise) return refreshTokenPromise

  refreshTokenPromise = (async () => {
    const refresh = getRefreshToken()
    try {
      const result = await apiInstance.post<{ access: string }>(PATHS.REFRESH, {
        refresh,
      })

      if (result.data.access) {
        setAccessToken(result.data.access)
      } else {
        resetTokens()
      }
    } catch {
      resetTokens()
    } finally {
      refreshTokenPromise = null
    }
  })()

  return refreshTokenPromise
}
