<template>
  <dialog ref="dialog" closedby="none">
    <header class="flex items-center justify-between">
      <strong class="text-lg">{{ dialogTitle }}</strong>
      <Btn size="sm" color="transparent" @click="updateData">✕</Btn>
    </header>

    <section class="py-4">
      <p class="text-sm">{{ dialogMessage }}</p>
    </section>

    <footer class="flex justify-end gap-2">
      <Btn text="確認" color="success" size="lg" @click="updateData" />
      <Btn text="取消" color="secondary" size="lg" @click="closeDialog" />
    </footer>
  </dialog>
</template>

<script setup lang="ts">
import { useDialogStore } from '~/store/dialog'
import Btn from '~/components/EBtn.vue'

const dialogStore = useDialogStore()
const { setDialogSend, closeDialog } = dialogStore
const { dialogSwitch, dialogMode } = storeToRefs(dialogStore)

const dialog = ref<HTMLDialogElement | null>(null)

watch(dialogSwitch, (n) => {
  if (!dialog.value) return
  if (n) {
    dialog.value.showModal()
    document.documentElement.style.overflow = 'hidden'
  } else {
    dialog.value.close()
    document.documentElement.style.overflow = ''
  }
})

const dialogTitle = computed(() => {
  switch (dialogMode.value) {
    case 'add':
      return '新增使用者資料'
    case 'edit':
      return '修改使用者資料'
    case 'delete':
      return '刪除使用者資料'
    default:
      return '對話框'
  }
})

const dialogMessage = computed(() => {
  switch (dialogMode.value) {
    case 'add':
      return '確認要新增此筆資料?'
    case 'edit':
      return '確認要修改此筆資料?'
    case 'delete':
      return '確認要刪除此筆資料?'
    default:
      return '確認要進行此操作?'
  }
})

const updateData = () => {
  setDialogSend(true)
}
</script>

<style scoped lang="scss">
dialog {
  width: 300px;
  padding: 20px;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

// dialog 遮罩的透明度
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
