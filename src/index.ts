import express,{Request, Response} from 'express'
const app = express()
const port = 3000

const parserMiddleware = express.json()
app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    let helloWorld = 'Hello World!!!PPPP66666PP!!!';
    res.send(helloWorld)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})