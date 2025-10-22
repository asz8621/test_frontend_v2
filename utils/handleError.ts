import axios from 'axios'

export const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 502
    const message =
      (error.response?.data as any)?.message ??
      (error.code === 'ECONNREFUSED'
        ? '後端服務無法連線'
        : error.code === 'ETIMEDOUT'
          ? 'API 請求逾時'
          : error.message)

    throw createError({ statusCode: status, statusMessage: message })
  }

  throw createError({
    statusCode: 500,
    statusMessage: error instanceof Error ? error.message : String(error),
  })
}
