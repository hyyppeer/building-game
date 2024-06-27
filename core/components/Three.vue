<script setup lang="ts">
import * as THREE from 'three'
import { FlyControls } from 'three/addons/controls/FlyControls.js'
import { generateTerrain } from '../scripts/terrainGeneration'
import { ref, onMounted } from 'vue'

console.log('init canvas')
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  )

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
  })
  const controls = new FlyControls(camera, renderer.domElement)
  const clock = new THREE.Clock()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(animate)

  document.body.appendChild(renderer.domElement)

  controls.movementSpeed = 1
  controls.rollSpeed = 0.05

  clock.start()

  scene.add(new THREE.AmbientLight(0xffffff, 5))

  camera.position.y = 3

  generateTerrain().forEach((tri) => {
    const geo = new THREE.BufferGeometry()
    geo.setFromPoints(tri)
    const mat = new THREE.MeshStandardMaterial({ color: 0x55ff55 })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)
  })

  function animate() {
    controls.update(clock.getDelta())
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
