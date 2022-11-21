import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { HomePageVideos } from '../Types';
import '../index.css';
import { clearVideos, getSearchPageVideos } from '../store/youtubeSlice';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) =>
        state.youtubeApp.videos
    );
    const searchTerm = useAppSelector((state) =>
        state.youtubeApp.searchTerm
    );

    const isLoading = useAppSelector((state) =>
        state.youtubeApp.loading
    );
    //***********************  */
    useEffect(() => {
        if (searchTerm === '') {
            navigate('/')
        }
        else {
            dispatch(clearVideos())
            navigate('/search')
            dispatch(getSearchPageVideos(false))
        }
    }, [dispatch, navigate, searchTerm])

    return (
        <div className='max-h-screen overflow-hidden'>
            <div>
                <Navbar />
            </div>
            <div className={
                `spinnerFixCss flex h-[95vh] ${videos.length === 0 ? ("flex h-[100vh] justify-center items-center w-screen overflow:hidden") : null}
            `
            }>

                {!isLoading ? (<Spinner />) : (
                    <>
                        {videos.length > 0 ? (<Sidebar />) : (null)}
                        <InfiniteScroll //spinner condition
                            dataLength={videos.length}
                            next={() => { dispatch(getSearchPageVideos(true)) }}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={'100vh'}
                        >

                            <div className="grid md:mt-3 md:gap-y-5 md:gap-x-6 md:grid-cols-3 md:px-6  // lg:gap-y-10 lg:gap-x-4 lg:grid-cols-4 lg:px-4 lg:mt-0 // sm:mt-2 sm:gap-y-6 sm:gap-x-2 sm:grid-cols-2 sm:px-2 // su:mt-4 su:gap-x-4 su:gap-y-6 su:grid-cols-1 su:px-2 ">
                                {videos.map((item: HomePageVideos, index: any) => {
                                    return <Card data={item} key={item.index} />
                                })}
                            </div>
                        </InfiniteScroll>
                    </>
                )}


            </div>
        </div>
    )
}
