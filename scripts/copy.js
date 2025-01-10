const fs = require('fs')
const path = require('path')

const { version } = require('@datadog/browser-rum').datadogRum

const files = fs.readdirSync('./build', { recursive: true })

const distPath = './dist'

try {
  fs.rmSync(distPath, { recursive: true })
} catch (e) {
  console.log('No such directory: ' + distPath + ', skip it.')
}

for (let file of files) {
  const targetPath = `${distPath}/${file.replace('index', `browser-sdk@${version}.min`)}`
  const filePath = `./build/${file}`
  try {
    fs.cpSync(filePath, targetPath, { recursive: true })
  } catch (error) {
    console.log(error)
  }
}


console.log('copy successfully!')
