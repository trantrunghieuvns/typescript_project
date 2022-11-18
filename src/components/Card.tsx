import React from 'react'
import { Link } from 'react-router-dom';
import { HomePageVideos } from '../Types';

function Card({ data }: { data: HomePageVideos }) {
    return (
        <div className="flex gap-4 flex-col gap-y-3.5">
            <div className="relative  bg-gray-800">
                <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
                    {data.videoDuration}
                </span>
                <Link to={`/watch/${data.videoId}`} >
                    <img
                        src={data.videoThumbnail}
                        className="flex items-center justify-center w-[100%]"
                        alt={data.videoDescription}
                    />
                </Link>
            </div>
            <div className="flex gap-2">
                <div className="min-w-fit pt-2 ">
                    <a href="#">
                        <img src={data.channelInfo.image} alt="channel" className='w-6 sm:w-4 sm:h-4 md:h-9 md:w-9 xl:h-9 xl:w-9 rounded-full min-w-full' />
                    </a>
                </div>
                <div className="">
                    <h3>
                        <a href="#" className='line-clamp-2 leading-normal'>
                            {data.videoTitle}
                        </a>
                    </h3>
                    <div className="text-sm text-gray-400 py-1">
                        <div>
                            <a href="#" className='line-clamp-2 leading-none hover:text-white'>
                                {data.channelInfo.name}
                            </a>
                        </div>
                        <span className="after:content-['•'] after:mx-1 leading-none">
                            {data.videoViews} views
                        </span>
                        <span className="line-clamp-2 leading-none">{data.videoAge}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card