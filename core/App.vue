<script setup lang="ts">
import { ref, computed } from 'vue'
import Home from './Home.vue'
import Game from './Game.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/play': Game,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <component :is="currentView" />
</template>
