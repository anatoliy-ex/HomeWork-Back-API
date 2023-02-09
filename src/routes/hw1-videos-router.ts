import {Request, Response, Router} from "express"
import {tomorrowDate, videosRepository} from "../repositories/videos-repository";
import {ErrorInnerMessageType, qualityCheck, VideoDto} from "../types/videos-types";
export const hw1VideosRouter = Router({})

const videoResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
const errorOuterObject =
    {
        errorsMessages: []
    };
const errorArray : ErrorInnerMessageType [] = errorOuterObject.errorsMessages

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

hw1VideosRouter.get('/', (req: Request, res: Response) =>
{
    const videos = videosRepository.allVideos(req.body.dbVideos)
    res.status(200).send(videos)
})
//+
hw1VideosRouter.get('/:id', (req: Request, res: Response) =>
{
    let video = videosRepository.getVideosByID(+req.params.id)
    if(video)
    {
        res.send(video)
    }
    else
    {
        res.sendStatus(404)
    }
})

hw1VideosRouter.post('/', (req: Request, res: Response) =>
{
    //Пример
    //Validation...
    //const createdVideo2 = videosRepository.createVideos2(req.body)
    //res.status(200).send(createdVideo2)
    //return ;
    //Конец примера
    const title = req.body.title;
    const author = req.body.author;
    const minAgeRestriction = req.body.minAgeRestriction;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const newVideo: VideoDto =
        {
            //TODO move in repo
            id: +new Date(),
            title: title,
            author: author,
            canBeDownloaded: canBeDownloaded || false,
            minAgeRestriction: minAgeRestriction || null,
            availableResolutions: availableResolutions || ["P1080"],
        };
    const errorArray : ErrorInnerMessageType [] = errorOuterObject.errorsMessages
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
        const createdVideo = videosRepository.createVideos(newVideo)
        res.status(201).send(createdVideo);
        return;
    }
    res.status(400).send(errorOuterObject);
})

hw1VideosRouter.put('/:id', (req: Request, res: Response) =>
{
    let video = videosRepository.updateVideos(+req.body.id)

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

hw1VideosRouter.delete('/:id', (req: Request, res: Response) =>
{
    const isDeleted = videosRepository.deleteVideos(+req.params.id)
    if(isDeleted)
    {
        res.sendStatus(204);
    }
    else
    {
        res.sendStatus(404)
    }
});