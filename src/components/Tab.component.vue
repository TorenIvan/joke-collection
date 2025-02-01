<template>
  <button
    :class="[
      'bg-sky-600',
      'hover:bg-sky-800',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded-full',
      'hover:cursor-pointer',
      isActive ? 'bg-sky-900 hover:bg-sky-900 hover:cursor-none' : '',
    ]"
    @click="$emit('onClick')"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  isActive: boolean;
}
interface Emits {
  onClick: () => void;
}
const { title, isActive } = defineProps<Props>();
defineEmits<Emits>();
</script>
