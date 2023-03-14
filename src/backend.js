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
  const personalCodes = backendConf.personalCodes !== undefined && Object.keys(backendConf.personalCodes).length
  if (
    (personalCodes && backendConf.personalCodes[code] === undefined) ||
    (!personalCodes && backendConf.codes[code] === undefined)
  ) {
    res.status(403).send()
    return
  }
  const response = {
    pictures: personalCodes ? backendConf.codes[backendConf.personalCodes[code]] : backendConf.codes[code],
    properties: backendConf.properties || {},
  }
  res.json(response)
  console.info(`[${new Date()}] Images returned for code ${code}`)
})

backend.listen(3000, () => {
  console.log(`Listening at http://0.0.0.0:3000`)
})
