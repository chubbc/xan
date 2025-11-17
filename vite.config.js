import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig(() => {
  // Get all HTML files in project root
  const htmlFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.html'))

  // Turn them into a Rollup input map
  const input = Object.fromEntries(
    htmlFiles.map(file => [
      file.replace('.html', ''), // name without extension
      resolve(__dirname, file)
    ])
  )

  return {
    base: '/xan/',
    build: {
      rollupOptions: {
        input
      }
    }
  }
})