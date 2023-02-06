import express,{Request, Response} from 'express'
const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = express.json()
app.use(parserMiddleware)

const newDate = new Date;
const newDateCreated = newDate.toISOString()
const newDateUpdate = new Date(newDate.setDate(newDate.getDate() + 1)).toISOString()
type availableResolutions = string[];

type VideosType =
{
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: availableResolutions,
}

type ErrorInnerMessageType =
    {
        message: string,
        field: string
    }
let bdVideos : VideosType[] = [];
const videoResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
const errorOuterObject = {errorMessage: []}
const errorAuthorField =
{
    message: "Error",
    field: "author",
}
const errorTitleField =
    {
        message: "Error",
        field: "title",
    }
const errorCanBeDownloadedField =
    {
        message: "Error",
        field: "canBeDownloadedField",
    }
const errorMinAgeRestrictionField =
    {
        message: "Error",
        field: "minAgeRestrictionField",
    }
const errorAvailableResolutionField =
    {
        message: "Error",
        field: "availableResolutionField",
    }
const errorPublicationDateField =
    {
        message: "Error",
        field: "publicationDateField",
    }

const errorArray : ErrorInnerMessageType [] = errorOuterObject.errorMessage

const qualityCheck = (arr: string[], arr2: string[])=>
{
    return arr.every((res: string) => arr2.includes(res))
}

app.get('/videos', (req: Request, res: Response) =>
{
    res.status(200).send(bdVideos)
})

app.get('/videos/:id', (req: Request, res: Response) =>
{
    let video = bdVideos.find(v => v.id === + req.params.id)
    if(video)
    {
        res.send(video)
    }
    else
    {
        res.status(404)
    }
})

app.delete('/testing/all-data', (req: Request, res: Response) =>
{
    bdVideos = []
    res.sendStatus(204)
})

app.delete('/videos/:id', (req: Request, res: Response) =>
{
    let findID = bdVideos.find(v => v.id !== +req.params.id)

    if(!findID)
    {
        res.sendStatus(404)
    }

    bdVideos = bdVideos.filter(v => v.id !== +req.params.id)
    res.sendStatus(204)
})

app.post('/videos', (req: Request, res: Response) =>
{

    const title = req.body.title;
    const author = req.body.author;
    const minAgeRestriction = req.body.minAgeRestriction;
    const availableResolution = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const newVideo: VideosType =
        {
            id: +new Date(),
            title: title,
            author: author,
            canBeDownloaded: canBeDownloaded,
            minAgeRestriction: minAgeRestriction,
            createdAt: newDateCreated,
            publicationDate: newDateUpdate,
            availableResolutions: ["P1080"],
        }
    if(!author || typeof  author !== "string" || author.length > 20)
    {
        errorArray.push(errorAuthorField);
    }
    if(!title || typeof  title !== "string" || title.length > 40)
    {
        errorArray.push(errorAuthorField);
    }
    if(canBeDownloaded && typeof  canBeDownloaded !== "boolean")
    {
        errorArray.push(errorCanBeDownloadedField);
    }
    if((minAgeRestriction && minAgeRestriction > 18)||(minAgeRestriction && minAgeRestriction < 1)||(minAgeRestriction && typeof minAgeRestriction !== "number"))
    {
        errorArray.push(errorMinAgeRestrictionField);
    }
    if
    (
        availableResolution&&!qualityCheck(availableResolution,videoResolutions)
    )
    {
        errorArray.push(errorAvailableResolutionField);
    }
    if(errorArray.length === 0)
    {
        bdVideos.push(newVideo);
        res.status(201).send(newVideo)
    }
})

app.put('/videos/:id', (req: Request, res: Response) =>
{
    const video = bdVideos.find((video :VideosType) => video.id === +req.params.id);

    if(video)
    {
        errorArray.splice(0,errorArray.length)
        const title = req.body.title;
        const author = req.body.author;
        const minAgeRestriction = req.body.minAgeRestriction;
        const availableResolution = req.body.availableResolutions;
        const canBeDownloaded = req.body.canBeDownloaded;
        const newDateUpdate = req.body.newDateUpdate;

        if(!author || typeof author !== "string" || author.length > 20)
        {
            errorArray.push((errorAuthorField));
        }

        if(!title || typeof title !== "string" || title.length > 40)
        {
            errorArray.push(errorTitleField)
        }

        if(canBeDownloaded && typeof canBeDownloaded !== "boolean")
        {
            errorArray.push(errorCanBeDownloadedField)
        }

        if(newDateUpdate && typeof newDateUpdate !== "string")
        {
            errorArray.push(errorPublicationDateField)
        }

        if(errorArray.length === 0)
        {
            video.title = title;
            video.author = author;
            video.availableResolutions = availableResolution || ["P1080"];
            video.canBeDownloaded = canBeDownloaded || false;
            video.minAgeRestriction = minAgeRestriction || newDateCreated;
            res.status(204).send(video)
            return;
        }
        res.status(400).send(errorOuterObject)
    }
    res.sendStatus(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})