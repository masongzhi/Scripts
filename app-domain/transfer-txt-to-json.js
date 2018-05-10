const fs = require('fs')
let NUM = process.env.NUM

const file = fs.readFileSync(`./words/${NUM}.txt`, 'utf8')
const arr = JSON.stringify(file.split(`
`))
console.log('arr==>>>', arr)

fs.writeFileSync(`./words/${NUM}.json`, arr, 'utf8')
