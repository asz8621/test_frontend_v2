<template>
  <div class="text-white flex items-center justify-center">
    <div
      class="w-full xs:w-[480px] sm:w-[576px] p-4 sm:p-8 mx-auto transition-all duration-500 ease-in-out gap-4"
    >
      <div class="border-1 border-solid border-gray-500 rounded-3xl p-4 sm:px-18 sm:py-10 mb-8">
        <h2 class="text-center mt-0 mb-2">操作</h2>
        <div class="mb-10">
          <TextField label="名字" v-model="userData.name" />
          <TextField label="年齡" type="number" v-model="userData.age" />
        </div>
        <div class="flex justify-end w-full gap-8">
          <Btn
            text="修改"
            color="success"
            size="lg"
            :disabled="dialogMode === 'add'"
            @click="checkUserData"
          />
          <Btn
            text="新增"
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
                <th class="p-2">姓名</th>
                <th class="p-2">年齡</th>
                <th class="w-[8rem] p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in users" :key="index" class="border-b border-gray-500">
                <td class="p-2">{{ item.id }}</td>
                <td class="p-2">{{ item.name }}</td>
                <td class="p-2">{{ item.age }}</td>
                <td class="p-2">
                  <div class="flex flex-wrap gap-2 justify-end">
                    <Btn text="修改" color="success" size="md" @click="editUser(index)" />
                    <Btn
                      text="刪除"
                      color="error"
                      size="md"
                      :disabled="dialogMode === 'edit'"
                      @click="deleteUser(index)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  {{ userData }}

  <Dialog />
</template>

<script setup lang="ts">
import Btn from '~/components/EBtn.vue'
import TextField from '~/components/ETextField.vue'
import Dialog from '~/components/Dialog.vue'
import type { User } from '~/types/type'
import { useDialogStore } from '~/store/dialog'

const dialogStore = useDialogStore()
const { openDialog, closeDialog, setDialogMode, setDialogSend } = dialogStore
const { dialogMode, dialogSend } = storeToRefs(dialogStore)

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

const randomId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const letter = letters[Math.floor(Math.random() * letters.length)]
  const twoDigits = String(Math.floor(Math.random() * 100)).padStart(2, '0') // 00~99
  return letter + twoDigits
}

const userData = ref<User>({
  id: randomId(),
  name: '',
  age: null,
})
const users = ref<User[]>([
  { id: 'h67', name: '王小明', age: 25 },
  { id: 'v44', name: '李大華', age: 30 },
  { id: 'S39', name: '張美麗', age: 28 },
  { id: 'g33', name: '蕭樹華', age: 10 },
  { id: 'l96', name: '洪惠恩', age: 66 },
  { id: 'b67', name: '方瑞慈', age: 34 },
  { id: 'f43', name: '陳水興', age: 51 },
  { id: 'g31', name: '雷方芳', age: 61 },
  { id: 'j89', name: '張慈容', age: 16 },
  { id: 'f97', name: '許孝恩', age: 22 },
])

const checkUserData = () => {
  const name = userData.value.name?.trim()
  const age = userData.value.age

  if (name && age !== null && age >= 0) {
    openDialog()
  } else {
    alert('請輸入完整的名字和年齡。')
  }
}

const addUserData = () => {
  users.value.push({
    id: randomId(),
    name: userData.value.name,
    age: userData.value.age as number,
  })
  closeDialog()
  setDialogSend(false)
  resetUserData()
}

const editUser = (index: number) => {
  dialogMode.value = 'edit'
  userData.value = { ...users.value[index] }
}

const editUserData = () => {
  const index = users.value.findIndex((user) => user.id === userData.value.id)
  users.value[index].name = userData.value.name
  users.value[index].age = userData.value.age
  setDialogMode('add')
  closeDialog()
  setDialogSend(false)
  resetUserData()
}

const deleteUser = (index: number) => {
  userData.value.id = users.value[index].id
  dialogMode.value = 'delete'
  openDialog()
}

const deleteUserData = () => {
  const index = users.value.findIndex((user) => user.id === userData.value.id)
  console.log('delete index', index)
  users.value.splice(index, 1)
  console.log('delete index', users)
  setDialogMode('add')
  closeDialog()
  setDialogSend(false)
  resetUserData()
}

const resetUserData = () => {
  userData.value = {
    id: randomId(),
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
