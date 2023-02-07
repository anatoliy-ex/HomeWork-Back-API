import express, {Request,Response} from 'express'
import {hwVideosRouter} from "./routes/hw-videos-router";
import {hwTestingRouter} from "./routes/hw-testing-router";

const app = express()
const port = 3000

app.use(express.json)

app.use("/videos", hwVideosRouter)
app.use("/testing", hwTestingRouter)

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`)
})