import React from 'react'
import { Link } from 'react-router-dom';
import { HomePageVideos } from '../Types';

function SearchCard({ data }: { data: HomePageVideos }) {

    return (
        <div className="flex gap-5 px-4 su:w-[95vw] sm:w-[75vh] md:w-[85vh] lg:w-[105vh] xl:w-[120vh] ">
            <div className="relative">
                <span className="absolute top-2 left-2 text-sm bg-gray-900 px-2 py-0.5 z-10">
                    {data.videoDuration}
                </span>
                <Link to={`/watch/${data.videoId}`}>
                    <div className='lg:h-auto lg:w-96 md:w-45 md:h-auto sm:w-40 sm:h-auto su:w-[150px] su:h-auto'>
                        <img
                            src={data.videoThumbnail}
                            alt="thumbnail"
                            className='lg:h-auto lg:w-96  md:w-45 md:h-auto sm:w-40 sm:h-auto su:w-40 su:h-auto'
                        /></div>
                </Link>
            </div>
            <div className="flex gap-1 flex-col">
                <h3 className="max-w-2xl">
                    <a href="#" className="line-clamp-2">
                        {data.videoTitle}
                    </a>
                </h3>
                <div className="text-xs text-grap-400">
                    <div>
                        <div>
                            <span className="after:content-['•'] after:mx-1">
                                {data.videoViews} views
                            </span>
                            <span>{data.videoAge}</span>
                        </div>
                    </div>
                </div>
                <div className="min-w-fit my-2">
                    <a href="#" className="flex items-center gap-2 text-xs text-gray-400">
                        <img
                            src={data.channelInfo.image}
                            alt="channel"
                            className="h-9 w-9 rounded-full"
                        />
                        <span>{data.channelInfo.name}</span>
                    </a>
                </div>
                <div className="max-w-2xl line-clamp-2 text-sm text-gray-400">
                    <p>{data.videoDescription}</p>
                </div>
            </div>
        </div>
    );
}

export default SearchCard