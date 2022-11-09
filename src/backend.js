const express = require('express')
const cors = require("cors")
const backendConf = require('../backend_conf')

const backend = express()
if (process.env.NODE_ENV === 'development') {
  backend.use(cors())
}

backend.get('/health', (req, res) => {
  res.send('🥳')
})

backend.get('/images/:code', (req, res) => {
  const { code } = req.params
  if (backendConf.codes[code] !== undefined) {
    const response = {
      pictures: backendConf.codes[code],
      properties: backendConf.properties || {},
    }
    res.json(response)
    console.info(`[${new Date()}] Images returned for code ${code}`)
  } else {
    res.status(403).send()
  }
})

backend.listen(3000, () => {
  console.log(`Listening at http://0.0.0.0:3000`)
})
