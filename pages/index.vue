<template>
  <div class="relative text-white flex items-center justify-center">
    <LangSelect @changeLang="resetUserData" />

    <div
      class="w-full xs:w-[480px] sm:w-[576px] p-4 sm:p-8 mx-auto transition-all duration-500 ease-in-out gap-4"
    >
      <div class="border-1 border-solid border-gray-500 rounded-3xl p-4 sm:px-18 sm:py-10 mb-8">
        <h2 class="text-center mt-0 mb-2">{{ $t('operation') }}</h2>
        <div class="mb-10">
          <TextField :label="$t('name')" v-model.trim="tempData.name" />
          <TextField
            :label="$t('age')"
            type="number"
            v-model.number="tempData.age"
            @keydown="checkInput($event)"
          />
        </div>
        <div class="flex justify-end w-full gap-4 sm:gap-8">
          <Btn
            :text="$t('clear')"
            color="secondary"
            size="lg"
            @click="resetUserData"
            class="mr-auto"
          />
          <Btn
            :text="$t('update')"
            color="success"
            size="lg"
            :disabled="dialogMode === 'add'"
            @click="checkUserData"
          />
          <Btn
            :text="$t('create')"
            color="warn"
            size="lg"
            :disabled="dialogMode === 'edit'"
            @click="checkUserData"
          />
        </div>
      </div>

      <div class="border-1 border-solid border-gray-500 rounded-3xl p-4 sm:px-18 mb-8">
        <!-- 內層滾動容器 -->
        <div
          class="max-h-[300px] overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable] custom-scrollbar"
        >
          <table class="min-w-full text-center border-collapse table-auto">
            <thead class="sticky top-0 bg-obsidian z-10">
              <tr>
                <th class="p-2">#</th>
                <th class="p-2">{{ $t('name') }}</th>
                <th class="p-2">{{ $t('age') }}</th>
                <th class="w-[8rem] p-2">{{ $t('operation') }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="userData.length > 0">
                <tr
                  v-for="(item, index) in userData"
                  :key="index"
                  class="border-b border-b-[1px] border-b-solid border-gray-500"
                >
                  <td class="p-2">{{ item.id }}</td>
                  <td class="p-2">{{ item.name }}</td>
                  <td class="p-2">{{ item.age }}</td>
                  <td class="p-2">
                    <div class="flex flex-nowrap gap-2 justify-end">
                      <Btn
                        :text="$t('update')"
                        color="success"
                        size="md"
                        @click="editUserItem(index)"
                      />
                      <Btn
                        :text="$t('delete')"
                        color="error"
                        size="md"
                        :disabled="dialogMode === 'edit'"
                        @click="deleteUserItem(item)"
                      />
                    </div>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td class="p-4" colspan="4">{{ $t('no_data') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Dialog />
</template>

<script setup lang="ts">
import Btn from '~/components/EBtn.vue'
import TextField from '~/components/ETextField.vue'
import Dialog from '~/components/Dialog.vue'
import LangSelect from '~/components/LangSelect.vue'
import type { User } from '~/types/type'
import { useDialogStore } from '~/store/dialog'
import { useUserStore } from '~/store/user'

const { t } = useI18n()

const dialogStore = useDialogStore()
const { openDialog, closeDialog, setDialogMode, setDialogSend } = dialogStore
const { dialogMode, dialogSend } = storeToRefs(dialogStore)

const userStore = useUserStore()
const { getUsers, createUser, editUser, deleteUser } = userStore
const { userData } = storeToRefs(userStore)

await useAsyncData('users', async () => {
  await getUsers()
})

watch(dialogSend, (n) => {
  if (n) updateUserData()
})
const updateUserData = () => {
  switch (dialogMode.value) {
    case 'add':
      addUserData()
      break
    case 'edit':
      editUserData()
      break
    case 'delete':
      deleteUserData()
      break
    default:
      break
  }
}

const tempData = ref<User>({
  id: null,
  name: '',
  age: null,
})

// 限制輸入框不可輸入非正整數
const checkInput = (event: KeyboardEvent) => {
  const invalidChars = ['e', 'E', '+', '-', '.']
  if (invalidChars.includes(event.key)) {
    event.preventDefault()
  }
}

// 當資料為空切回初始狀態
const tempDataEmpty = computed(() => !tempData.value.name && !tempData.value.age)
watch(tempDataEmpty, (n) => {
  if (n && dialogMode.value !== 'add') {
    setDialogMode('add')
  }
})

// 確認傳送資料是否正確
const checkUserData = () => {
  const name = tempData.value.name
  const age = tempData.value.age

  if (name && age !== null && Number.isInteger(age) && age >= 0) {
    openDialog()
  } else {
    alert(t('input_name_age'))
  }
}

// 新增使用者
const addUserData = async () => {
  // console.log('addUserData:', tempData.value)

  const data = { ...tempData.value }
  delete data.id

  await createUser(data)
  closeDialog()
  setDialogSend(false)
  resetUserData()
  getUsers()
}

// 編輯使用者將資料顯示到畫面上
const editUserItem = (index: number) => {
  dialogMode.value = 'edit'
  tempData.value = { ...userData.value[index] }
}

// 修改使用者
const editUserData = async () => {
  const data = { ...tempData.value }
  // console.log('data to edit:', data)
  await editUser(data)

  setDialogMode('add')
  closeDialog()
  setDialogSend(false)
  resetUserData()
  getUsers()
}

// 刪除使用者前將所需資料就定位
const deleteUserItem = (user: User) => {
  tempData.value = { ...user }
  dialogMode.value = 'delete'
  openDialog()
}

// 刪除使用者
const deleteUserData = async () => {
  const data = { ...tempData.value }
  await deleteUser(data)
  // console.log('data to delete:', data)
  setDialogMode('add')
  closeDialog()
  setDialogSend(false)
  resetUserData()
  getUsers()
}

// 重置暫存資料
const resetUserData = () => {
  tempData.value = {
    id: null,
    name: '',
    age: null,
  }
}
</script>

<style scoped lang="scss">
tbody:before {
  content: '.';
  display: block;
  line-height: 0.5rem;
  color: transparent;
}
</style>
