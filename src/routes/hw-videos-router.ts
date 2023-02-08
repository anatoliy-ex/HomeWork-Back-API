import {Request, Response, Router} from "express"
export const hwVideosRouter = Router({})

type AvailableResolutions = string[];

type VideosType =
{
        id: number;
        title: string;
        author: string;
        canBeDownloaded: boolean;
        minAgeRestriction: null | number;
        createdAt: string;
        publicationDate: string;
        availableResolutions: AvailableResolutions;
}

type ErrorInnerMessageType =
    {
        message: string,
        field: string
    }

let dbVideos : VideosType[] = [];

const videoResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
const currentDate = new Date().toISOString()
const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()

const errorOuterObject =
    {
        errorsMessages: []
    };

const errorAuthorField =
    {
        message: "Error",
        field: "author",
    };

const errorTitleField =
    {
        message: "Error",
        field: "title",
    };

const errorCanBeDownloadedField =
    {
        message: "Error",
        field: "canBeDownloaded",
    };

const errorMinAgeRestrictionField =
    {
        message: "Error",
        field: "minAgeRestriction",
    };

const errorAvailableResolutionField =
    {
        message: "Error",
        field: "availableResolutions",
    };

const errorPublicationDateField =
    {
        message: "Error",
        field: "publicationDate",
    };

const errorArray : ErrorInnerMessageType [] = errorOuterObject.errorsMessages

const qualityCheck = (arr: string[], arr2: string[])=>
{
    return arr.every((res: string) => arr2.includes(res))
}

hwVideosRouter.get('/', (req: Request, res: Response) =>
{
    res.status(200).send(dbVideos)
})

hwVideosRouter.get('/:id', (req: Request, res: Response) =>
{
    let video = dbVideos.find(v => v.id === + req.params.id)
    if(video)
    {
        res.send(video)
    }
    else
    {
        res.sendStatus(404)
    }
})

hwVideosRouter.post('/', (req: Request, res: Response) =>
{

    const title = req.body.title;
    const author = req.body.author;
    const minAgeRestriction = req.body.minAgeRestriction;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const newVideo: VideosType =
        {
            id: +new Date(),
            title: title,
            author: author,
            canBeDownloaded: canBeDownloaded || false,
            minAgeRestriction: minAgeRestriction || null,
            createdAt: currentDate,
            publicationDate: tomorrowDate,
            availableResolutions: availableResolutions || ["P1080"],
        };

    errorArray.splice(0, errorArray.length)

    if(!author || typeof  author !== "string" || author.length > 20)
    {
        errorArray.push(errorAuthorField);
    }
    if(!title || typeof  title !== "string" || title.length > 40)
    {
        errorArray.push(errorTitleField);
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
        availableResolutions && !qualityCheck(availableResolutions,videoResolutions)
    )
    {
        errorArray.push(errorAvailableResolutionField);
    }
    if(errorArray.length === 0)
    {
        dbVideos.push(newVideo);
        res.status(201).send(newVideo);
        return;
    }
    res.status(400).send(errorOuterObject);
})

hwVideosRouter.put('/:id', (req: Request, res: Response) =>
{
    const video = dbVideos.find((video :VideosType) => video.id === +req.params.id);

    if(video)
    {
        errorArray.splice(0,errorArray.length)

        const title = req.body.title;
        const author = req.body.author;
        const minAgeRestriction = req.body.minAgeRestriction;
        const availableResolution = req.body.availableResolutions;
        const canBeDownloaded = req.body.canBeDownloaded;
        const publicationDate = req.body.publicationDate;

        if(!author || typeof author !== "string" || author.length > 20)
        {
            errorArray.push((errorAuthorField));
        }

        if(!title || typeof title !== "string" || title.length > 40)
        {
            errorArray.push(errorTitleField);
        }

        if(canBeDownloaded && typeof canBeDownloaded !== "boolean")
        {
            errorArray.push(errorCanBeDownloadedField)
        }

        if(minAgeRestriction < 1 || minAgeRestriction > 18)
        {
            errorArray.push(errorMinAgeRestrictionField)
        }

        if(publicationDate && typeof publicationDate !== "string")
        {
            errorArray.push(errorPublicationDateField)
        }

        if(errorArray.length === 0)
        {
            video.title = title;
            video.author = author;
            video.availableResolutions = availableResolution ||  ["P1080"];
            video.canBeDownloaded = canBeDownloaded || false;
            video.minAgeRestriction = minAgeRestriction || null;
            video.publicationDate = publicationDate || tomorrowDate
            res.status(204).send(video)
            return;
        }
        res.status(400).send(errorOuterObject)
    }
    res.sendStatus(404)
})

hwVideosRouter.delete('/:id', (req: Request, res: Response) =>
{
    for(let i = 0; i < dbVideos.length; i++)
    {
        if(dbVideos[i].id === +req.params.id)
        {
            dbVideos.splice(i,1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404)
});