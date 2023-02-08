import express, {Request,Response} from 'express'
import {hwVideosRouter} from "./routes/hw-videos-router";
import {hwTestingRouter} from "./routes/hw-testing-router";
import bodyParser from "body-parser";

const app = express()
const port = 3000
const parserMiddleware = bodyParser({})

app.use(parserMiddleware)
app.use("/videos", hwVideosRouter)
app.use("/testing", hwTestingRouter)

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`)
})