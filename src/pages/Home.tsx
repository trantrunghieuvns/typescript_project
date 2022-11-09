/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import { v4 as uuidv4 } from "uuid";

interface uuid {
    uuidv4(): string;
}

export default function Home() {
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);

    useEffect(() => {
        dispatch(getHomePageVideos(false))
    }, [dispatch])

    return (
        <div className='max-h-screen overflow-hidden'>
            <div style={{ height: '7.5vh' }}>
                <Navbar />
            </div>
            <div className="flex" style={{ height: '92.5vh' }}>
                <Sidebar />
            </div>

        </div>
    )
}
