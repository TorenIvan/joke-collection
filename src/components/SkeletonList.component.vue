<template>
  <ul
    v-if="isVisible"
    class="list bg-spotify-dark rounded-box shadow-md p-4 w-full max-w-2xl md:min-w-128 mx-auto"
  >
    <li
      class="border-b py-3 grid grid-cols-[2fr_auto] gap-y-2 w-full h-25 justify-around"
      v-for="index in 7"
      :key="index"
    >
      <div class="skeleton w-full h-full bg-spotify-gray rounded-md"></div>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  isVisible?: boolean;
}
const { isVisible = false } = defineProps<Props>();
</script>
