import express from 'express'

const port = 5050

const app = express()

app.use(express.static(`${__dirname}/core/`))

app.listen(port, () => {
  console.log(`Listening on port ${port}, serving ${__dirname}/core/`)
})
