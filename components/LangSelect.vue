// 子層
<template>
  <div class="absolute top-4 right-4">
    <select :value="locale" @change="changeLang">
      <option v-for="item in locales" :key="item.code" :value="item.code">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change-lang'): void
}>()

const { locale, locales, setLocale, t } = useI18n()
const changeLang = async (e: Event) => {
  const val = (e.target as HTMLSelectElement).value
  await setLocale(val as typeof locale.value)
  emit('change-lang')
}
</script>
