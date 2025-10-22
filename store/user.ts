import type { User } from '~/types/type'

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export const useUserStore = defineStore('user', () => {
  const isLoading = ref(false)
  const userData = ref<User[]>([])

  const getUsers = async () => {
    try {
      isLoading.value = true
      const res = await $fetch<ApiResponse<User[]>>('/api/user')

      if (res.code !== 200) throw new Error(res.message || 'API error')

      userData.value = res.data
    } catch (error) {
      console.error('Load users failed:', error instanceof Error ? error.message : error)
    } finally {
      isLoading.value = false
    }
  }

  const createUser = async (user: User) => {
    try {
      isLoading.value = true
      const res = await $fetch<ApiResponse<null>>('/api/user', {
        method: 'POST',
        body: user,
      })

      if (res.code !== 200) throw new Error(res.message || 'API error')
    } catch (error) {
      console.error('Create user failed:', error instanceof Error ? error.message : error)
    } finally {
      isLoading.value = false
    }
  }

  const editUser = async (user: User) => {
    try {
      isLoading.value = true
      const res = await $fetch<ApiResponse<null>>('/api/user', {
        method: 'PUT',
        body: user,
      })

      if (res.code !== 200) throw new Error(res.message || 'API error')
    } catch (error) {
      console.error('Edit user failed:', error instanceof Error ? error.message : error)
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (user: User) => {
    try {
      isLoading.value = true
      const data = { id: user.id ?? null }

      const res = await $fetch<ApiResponse<null>>('/api/user', {
        method: 'DELETE',
        body: data,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      })

      if (res.code !== 200) throw new Error(res.message || 'API error')
    } catch (error) {
      console.error('Delete user failed:', error instanceof Error ? error.message : error)
    } finally {
      isLoading.value = false
    }
  }

  return { userData, isLoading, getUsers, createUser, editUser, deleteUser }
})
