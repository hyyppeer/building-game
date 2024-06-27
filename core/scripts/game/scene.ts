import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import addTerrain from './terrain'

export default function makeScene(
  renderer: THREE.Renderer,
  animate: (handler: () => void) => void
) {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  )
  camera.position.y = 3

  animate(() => renderer.render(scene, camera))

  const clock = new THREE.Clock()
  clock.start()

  const controls = new FlyControls(camera, renderer.domElement)
  controls.movementSpeed = 1
  controls.rollSpeed = 0.05
  animate(() => controls.update(clock.getDelta()))

  scene.add(new THREE.AmbientLight(0xffffff, 5))
  addTerrain(scene, new THREE.MeshStandardMaterial({ color: 0x22ff22 }))

  return scene
}
