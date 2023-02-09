import {VideoDto, VideosType} from "../types/videos-types";

let dbVideos : VideosType[] = [];

const currentDate = new Date().toISOString()
export const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()

export const videosRepository =
{
    allVideos(dbVideos : VideosType)
    {
        return dbVideos;
    },

    createVideos(newVideo : VideoDto)
    {
        // const title = dbVideos.title;
        // const author = dbVideos.author;
        // const minAgeRestriction = dbVideos.minAgeRestriction;
        // const availableResolutions =dbVideos.availableResolutions;
        // const canBeDownloaded = dbVideos.canBeDownloaded;
        const VideoToPush: VideosType =
            {
                ...newVideo,
                // id: +new Date(),
                // title: title,
                // author: author,
                // canBeDownloaded: canBeDownloaded || false,
                // minAgeRestriction: minAgeRestriction || null,
                // availableResolutions: availableResolutions || ["P1080"],
                createdAt: currentDate,
                publicationDate: tomorrowDate,

            };
            dbVideos.push(VideoToPush);
            return VideoToPush;
    },
    /*
    createVideos2(newVideo: VideoDto2){
        const VideoToPush: VideosType =
            {
                id: +new Date(),
                title: newVideo.title,
                author: newVideo.author,
                canBeDownloaded: newVideo.canBeDownloaded || false,
                minAgeRestriction: newVideo.minAgeRestriction || null,
                availableResolutions: newVideo.availableResolutions || ["P1080"],
                createdAt: currentDate,
                publicationDate: tomorrowDate,

            };
        dbVideos.push(VideoToPush);
        return VideoToPush;
    },
*/
    getVideosByID(id: number)//+
    {
        let video;
        return video = dbVideos.find(v => v.id === id);
    },

    updateVideos(id: number)
    {
        let video;
        return video = dbVideos.find((video :VideosType) => video.id === id);

    },

    deleteVideos(id: number)
    {
        for(let i = 0; i < dbVideos.length; i++)
        {
            if(dbVideos[i].id === id)
            {
                dbVideos.splice(i,1);
                return true;
            }
        }
        return false;
    }
}


