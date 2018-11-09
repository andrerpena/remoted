import express from 'express'
import * as path from 'path'
import sum from '../common/dep'

const app: express.Application = express()
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', function (req: express.Request, res: express.Response) {
  return res.send('pong')
})

app.get('/', function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

sum()

app.listen(process.env.PORT || 8080)