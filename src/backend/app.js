const express = require('express')
const cors = require("cors")
const backendConf = require('../../backend_conf')

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(cors())
}

app.get('/health', (req, res) => {
  res.send('🥳')
})

app.get('/images/:code', (req, res) => {
  const { code } = req.params
  if (backendConf.codes[code] !== undefined) {
    console.info(`Images returned for code ${code}`)
    const response = {
      pictures: backendConf.codes[code],
      properties: backendConf.properties || {},
    }
    res.json(response)
  } else {
    res.status(403).send()
  }
})

app.get('/images/:code/:image', (req, res, next) => {
  const { code, image } = req.params
  if (backendConf.codes[code] === undefined) {
    console.warn(`403 ${req.path}`)
    res.status(403).send()
    return
  }
  if (backendConf.codes[code].includes(image) === undefined) {
    console.warn(`404 ${req.path}`)
    res.status(404).send()
    return
  }
  res.sendFile(`/pictures/${image}`, { root: __dirname }, err => {
    if (err) {
      console.warn(`Error serving picture ${image}`)
      next(err)
    } else {
      console.info(`Sent: ${image}`)
    }
  })
})

app.listen(3000, () => {
  console.log(`Listening at http://0.0.0.0:3000`)
})
