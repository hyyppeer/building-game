<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import makeScene from '../scripts/game/scene'

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  const handlers: (() => void)[] = []
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(animate)

  makeScene(renderer, (handler) => handlers.push(handler))

  document.body.appendChild(renderer.domElement)

  function animate() {
    handlers.forEach((h) => h())
  }

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
