const path = require('path')
const express = require('express')
const cors = require('cors')
const jsonServer = require('json-server')

const app = express()
const router = jsonServer.router(path.dirname('server/index.ts') + '/public/db.json')

const PORT = process.env.PORT || 3001

// middleware
app.use(cors())
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is Running... on port ${PORT}`)
})
