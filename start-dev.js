import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT || '5173'
process.argv.push('dev', '--port', port)
process.chdir(__dirname)
import('vite/dist/node/cli.js')
