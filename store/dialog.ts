import type { DialogMode } from '~/types/type'

export const useDialogStore = defineStore('dialog', () => {
  const dialogSwitch = ref<boolean>(false)
  const dialogSend = ref<boolean>(false)
  const dialogMode = ref<DialogMode>('add')
  const dialogLoading = ref<boolean>(false)

  const openDialog = () => {
    dialogSwitch.value = true
  }

  const closeDialog = () => {
    dialogSwitch.value = false
  }

  const setDialogSend = (state: boolean) => {
    dialogSend.value = state
  }

  const setDialogLoading = (loading: boolean) => {
    dialogLoading.value = loading
  }

  const setDialogMode = (mode: DialogMode) => {
    dialogMode.value = mode
  }

  return {
    dialogSwitch,
    dialogMode,
    dialogLoading,
    dialogSend,
    openDialog,
    closeDialog,
    setDialogSend,
    setDialogLoading,
    setDialogMode,
  }
})
