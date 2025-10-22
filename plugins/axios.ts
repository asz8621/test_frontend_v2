import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: config.public.apiBase,
    timeout: 10000,
  })

  instance.interceptors.request.use((req) => {
    return req
  })

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.error('API Error:', error)
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api: instance,
    },
  }
})
