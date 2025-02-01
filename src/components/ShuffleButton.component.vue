<template>
  <button
    @click="$emit('onClick')"
    :disabled="disabled"
    class="btn btn-primary px-6 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition mb-3"
  >
    {{ t('jokes.shuffle') }}
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Props {
  disabled: boolean;
}
interface Emits {
  onClick: () => void;
}
const { t } = useI18n();
const { disabled } = defineProps<Props>();
defineEmits<Emits>();
</script>
