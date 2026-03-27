import type { AuthState } from '@/pages/login-page'
import { isAction, type Middleware, type UnknownAction } from '@reduxjs/toolkit'

// Сохраняем в localStorage при auth actions
export const persistMiddleware: Middleware<
  UnknownAction,
  { auth?: AuthState }
> = (store) => (next) => (action) => {
  const result = next(action)

  if (isAction(action) && action.type.startsWith('auth/')) {
    const { auth } = store.getState()
    if (auth)
      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
          username: auth.username,
        })
      )
  }

  return result
}
