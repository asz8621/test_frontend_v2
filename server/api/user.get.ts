import axios from 'axios'
import { handleError } from '~/utils/handleError'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  try {
    const res = await axios.get(`${config.public.apiBase}/user`)

    // console.log('GET:', res.data)

    return res.data
  } catch (error) {
    handleError(error)
  }
})
