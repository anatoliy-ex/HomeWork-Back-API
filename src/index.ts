import express from 'express'
import {h1VideosRouter} from "./routes/h1-videos-router";
import {h1TestingRouter} from "./routes/h1-testing-router";

const app = express()
const port = process.env.PORT || 3000

app.use(express.json)
app.use("/videos", h1VideosRouter)
app.use("/testing", h1TestingRouter)

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`)
})