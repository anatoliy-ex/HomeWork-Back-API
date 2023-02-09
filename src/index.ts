import express, {Request,Response} from 'express'
import {hw1VideosRouter} from "./routes/hw1-videos-router";
import {hw1TestingRouter} from "./routes/hw1-testing-router";
import bodyParser from "body-parser";

const app = express()
const port = 3003
const parserMiddleware = bodyParser({})

app.use(parserMiddleware)
app.use("/videos", hw1VideosRouter)
app.use("/testing", hw1TestingRouter)

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`)
})