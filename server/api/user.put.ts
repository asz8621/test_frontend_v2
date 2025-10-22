import axios from 'axios'
import { handleError } from '~/utils/handleError'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.id || !body.name || !body.age) {
    throw createError({
      statusCode: 400,
      statusMessage: '資料缺少必填欄位',
    })
  }

  const config = useRuntimeConfig()

  try {
    const res = await axios.put(`${config.public.apiBase}/user`, body)

    // console.log('PUT:', res.data)

    return res.data
  } catch (error) {
    handleError(error)
  }
})
