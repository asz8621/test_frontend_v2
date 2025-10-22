<template>
  <button
    type="button"
    class="e-btn border-0 rounded font-bold transition-all duration-300 ease-linear"
    :class="[`e-btn-${color}`, sizeClass, disabledClass]"
    :disabled="disabled"
  >
    <template v-if="text">
      {{ text }}
    </template>

    <slot v-else />
  </button>
</template>

<script setup lang="ts">
type ColorType = 'success' | 'error' | 'warn' | 'secondary' | 'transparent'
type SizeType = 'sm' | 'md' | 'lg'

interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: ColorType // 預設為 success
  size?: SizeType
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  color: 'success',
  size: 'sm',
  disabled: false,
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'px-5 py-1 text-base'
    case 'md':
      return 'px-2 py-1 text-sm'
    default:
      return ''
  }
})

const disabledClass = computed(() =>
  props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
)
</script>

<style scoped lang="scss">
.e-btn {
  // success 綠
  &-success {
    color: #fff;
    background-color: #0d861b;

    &:hover {
      background-color: #097113;
    }

    &:active {
      background-color: #065f13;
    }
  }

  // error 紅
  &-error {
    color: #fff;
    background-color: #af1e18;

    &:hover {
      background-color: #9b1c17;
    }

    &:active {
      background-color: #7d1211;
    }
  }

  // warn 黃
  &-warn {
    color: #131212;
    background-color: #fbc232;

    &:hover {
      background-color: #e4b62a;
    }

    &:active {
      background-color: #c9a220;
    }
  }

  // secondary 灰
  &-secondary {
    color: #131212;
    background-color: #d1d5db;
    &:hover {
      background-color: #bcbec0;
    }
    &:active {
      background-color: #9e9fa1;
    }
  }

  // transparent 透明
  &-transparent {
    color: #131212;
    background-color: transparent;
    &:hover {
      background-color: #e5e7eb;
    }
    &:active {
      background-color: #d1d5db;
    }
  }
}
</style>
