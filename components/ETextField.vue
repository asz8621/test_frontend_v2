<template>
  <div class="mb-4">
    <label :for="id" class="inline-block mb-2">
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      class="w-full border-1 border-solid border-gray-500 rounded-md outline-none text-base text-white bg-transparent px-4 py-2 focus:border-blue-500 transition-all duration-300 ease-in-out"
      :type="type"
      :disabled="disabled"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
type InputType = 'text' | 'number'

interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  modelValue?: string | number | null
  type?: InputType
  width?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: '',
  modelValue: '',
  type: 'text',
  width: 'sm',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const id = props.id || useId()
</script>

<style scoped lang="scss"></style>
