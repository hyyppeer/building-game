import * as THREE from 'three'
import { makeNoise3D } from 'fast-simplex-noise'

const tileSize = 5
const mapWidth = 25

const seed = (Math.random() * 10) ^ 8
const divisor = 5
const amplitude = 5

const noise = makeNoise3D()

function generateHeight(x: number, y: number): number {
  return noise(x / divisor, y / divisor, seed) * amplitude
}

type VertixMap = THREE.Vector3[][]
type Tripoint = [THREE.Vector3, THREE.Vector3, THREE.Vector3]

function generateVertices(): VertixMap {
  const vertices: VertixMap = []

  for (let x = 0; x < mapWidth; x++) {
    vertices[x] = []
    for (let y = 0; y < mapWidth; y++) {
      vertices[x][y] = new THREE.Vector3(
        mapWidth / 2 - x * tileSize,
        generateHeight(x, y),
        mapWidth / 2 - y * tileSize
      )
    }
  }

  console.log(vertices)

  return vertices
}

function generateTerrain(): Tripoint[] {
  const vertices: VertixMap = generateVertices()

  const triangles: Tripoint[] = []

  vertices.forEach((row, x) => {
    row.forEach((vertix, y) => {
      if (!(vertices[x + 1] && vertices[x + 1][y + 1])) return
      triangles.push([vertix, row[y + 1], vertices[x + 1][y]])
      triangles.push([row[y + 1], vertices[x + 1][y + 1], vertices[x + 1][y]])
    })
  })
  return triangles
}

function visualizeTriangle(
  scene: THREE.Scene,
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
  material: THREE.Material
) {
  const geometry = new THREE.BufferGeometry()
  geometry.setFromPoints([a, b, c])

  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
}

export default function addTerrain(
  scene: THREE.Scene,
  material: THREE.Material
) {
  generateTerrain().forEach((tri) => {
    visualizeTriangle(scene, ...tri, material)
  })
}
