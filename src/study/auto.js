import fs from 'fs'

const data = fs.readFileSync('./README.md', 'utf-8')
console.log('data', data)
