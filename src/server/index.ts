import express from 'express'
import * as path from 'path'
import colors from 'colors'
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

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(colors.green(`DevJobList is listening on port ${port}`))
})