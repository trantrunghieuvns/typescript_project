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
import '../index.css';

export default function Home() {
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) =>
        state.youtubeApp.videos
    );

    useEffect(() => {
        dispatch(getHomePageVideos(false));
    }, [dispatch])


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
                            height={700}

                        >
                            <div className="grid md:mt-3 md:gap-y-5 md:gap-x-6 md:grid-cols-3 md:px-6  // lg:gap-y-10 lg:gap-x-4 lg:grid-cols-4 lg:px-4 lg:mt-0 // sm:mt-2 sm:gap-y-6 sm:gap-x-2 sm:grid-cols-2 sm:px-2 // su:mt-4 su:gap-x-4 su:gap-y-6 su:grid-cols-1 su:px-2 ">
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
