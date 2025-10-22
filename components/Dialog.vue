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
      <Btn :text="$t('confirm')" color="success" size="lg" @click="updateData" />
      <Btn :text="$t('cancel')" color="secondary" size="lg" @click="closeDialog" />
    </footer>
  </dialog>
</template>

<script setup lang="ts">
import { useDialogStore } from '~/store/dialog'
import Btn from '~/components/EBtn.vue'

const { t } = useI18n()

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
      return t('add_user')
    case 'edit':
      return t('edit_user')
    case 'delete':
      return t('delete_user')
    default:
      return t('prompt')
  }
})

const dialogMessage = computed(() => {
  switch (dialogMode.value) {
    case 'add':
      return t('confirm_add')
    case 'edit':
      return t('confirm_edit')
    case 'delete':
      return t('confirm_delete')
    default:
      return t('confirm_operation')
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
