import { Vector3 } from 'three'
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

function generateVertices(): Vector3[][] {
  const vertices: Vector3[][] = []

  for (let x = 0; x < mapWidth; x++) {
    vertices[x] = []
    for (let y = 0; y < mapWidth; y++) {
      vertices[x][y] = new Vector3(
        mapWidth / 2 - x * tileSize,
        generateHeight(x, y),
        mapWidth / 2 - y * tileSize
      )
    }
  }

  console.log(vertices)

  return vertices
}

export function generateTerrain(): [Vector3, Vector3, Vector3][] {
  const vertices: Vector3[][] = generateVertices()

  const triangles: [Vector3, Vector3, Vector3][] = []

  vertices.forEach((row, x) => {
    row.forEach((vertix, y) => {
      if (!(vertices[x + 1] && vertices[x + 1][y + 1])) return
      triangles.push([vertix, row[y + 1], vertices[x + 1][y]])
      triangles.push([row[y + 1], vertices[x + 1][y + 1], vertices[x + 1][y]])
    })
  })
  return triangles
}
