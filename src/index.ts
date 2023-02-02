import express,{Request, Response} from 'express'
const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = express.json()
app.use(parserMiddleware)

const newDate = new Date;
const newDateCreated = newDate.toISOString()
const newDatePublic = new Date(newDate.setDate(newDate.getDate() + 1)).toISOString()
//const arrayType: Array<string> = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

let bdVideos =
    [
        {
            id: 1,
            title: "Video-0",
            author: "Author-0",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: newDateCreated,
            publicationDate: newDatePublic,
            availableResolutions: ["P144"]
        },
        {
            id: 2,
            title: "Video-0",
            author: "Author-0",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: newDateCreated,
            publicationDate: newDatePublic,
            availableResolutions: ["P144"]
        },
        {
            id: 3,
            title: "Video-0",
            author: "Author-0",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: newDateCreated,
            publicationDate: newDatePublic,
            availableResolutions: ["P144"]
        },

    ]

app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(bdVideos)
})

app.get('/videos/:id', (req: Request, res: Response) => {
   res.status(201)
})


app.delete('/hometask_01/api/testing/all-data', (req: Request, res: Response) => {
    bdVideos = []
    res.sendStatus(204)
})

app.delete('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    let findID = bdVideos.find(v => v.id !== +req.params.id)

    if(!findID)
    {
        res.sendStatus(404)
    }

    bdVideos = bdVideos.filter(v => v.id !== +req.params.id)
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})