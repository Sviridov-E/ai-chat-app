import { apiInstance, PATHS } from '@/shared/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    creds: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiInstance.post<{
        access: string
        refresh: string
      }>(PATHS.LOGIN, creds)

      return { ...response.data, username: creds.username }
    } catch {
      return rejectWithValue('Ошибка входа')
    }
  }
)
