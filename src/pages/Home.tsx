/* eslint-disable @typescript-eslint/no-unused-vars */
import { current } from '@reduxjs/toolkit';
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getHomePageVideos } from '../store/reducers/fetchHomePageVideos';
import { HomePageVideos } from '../Types';

export default function Home() {
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) =>
        state.youtubeApp.videos

    );

    useEffect(() => {
        dispatch(getHomePageVideos(false));
    }, [dispatch])

    console.log('videos', videos);
    return (
        <div className='max-h-screen overflow-hidden'>
            <div style={{ height: '7.5vh' }}>
                <Navbar />
            </div>
            <div className="flex" style={{ height: '92.5vh' }}>
                <Sidebar />

                {videos.length ? (
                    <>
                        <InfiniteScroll //spinner condition
                            dataLength={videos.length}
                            next={() => dispatch(getHomePageVideos(true))}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={650}
                            className='mt-2'
                        >
                            <div className="grid md:mt-2 md:gap-y-10 md:gap-x-4 md:grid-cols-4 md:pt-8 md:px-4 sm:mt-2 sm:gap-y-6 sm:gap-x-2 sm:grid-cols-2 sm:pt-4 sm:px-2 // su:mt-4 su:gap-x-4 su:gap-y-6 su:grid-cols-1 su:pt-6 su:px-2 ">
                                {videos.map((item: HomePageVideos) => {
                                    return <Card data={item} key={item.videoId} />
                                })}
                            </div>
                        </InfiniteScroll>
                    </>
                ) : <Spinner />}
            </div>

        </div>
    )
}
