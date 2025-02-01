<template>
  <ul v-if="isVisible" class="list bg-spotify-dark rounded-box shadow-md">
    <li class="list-row skeleton w-130 h-20 bg-spotify-gray"></li>
    <li class="list-row skeleton w-130 h-20 bg-spotify-gray"></li>
    <li class="list-row skeleton w-130 h-20 bg-spotify-gray"></li>
    <li class="list-row skeleton w-130 h-20 bg-spotify-gray"></li>
    <li class="list-row skeleton w-130 h-20 bg-spotify-gray"></li>
    <li class="list-row skeleton w-130 h-20 bg-spotify-gray"></li>
    <li class="list-row skeleton w-130 h-20 bg-spotify-gray"></li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  isVisible?: boolean;
}
const { isVisible = false } = defineProps<Props>();
</script>
