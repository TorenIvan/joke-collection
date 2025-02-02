<template>
  <div class="flex flex-row justify-center items-center w-full gap-4 mb-6">
    <p class="text-base font-bold text-gray-300 break-words select-none">
      {{ t('jokes.filterByRating') }}:
    </p>
    <div class="rating">
      <input
        v-for="ratingNumber in 5"
        :key="ratingNumber"
        type="radio"
        class="mask mask-star bg-green-500"
        :value="ratingNumber"
        :checked="selectedRating === ratingNumber"
        @click.stop="applyFilter(ratingNumber)"
        aria-label="Rating"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Props {
  selectedRating?: number;
}
interface Emits {
  (event: 'onApplyFilter', rating: number | undefined): void;
}
const { selectedRating } = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t } = useI18n();

const applyFilter = (rating: number | undefined) => {
  emit('onApplyFilter', rating);
};
</script>
