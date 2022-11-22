import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { HomePageVideos } from '../Types';
import '../index.css';
import { clearVideos, getSearchPageVideos } from '../store/youtubeSlice';
import { useNavigate } from 'react-router-dom';
import SearchCard from '../components/SearchCard';

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
    //***********************  */
    return (
        <div className='max-h-screen overflow-hidden'>
            <div>
                <Navbar />
            </div>
            <div className={
                `flex h-[95vh] ${videos.length === 0 ? ("flex h-[100vh] justify-center items-center w-screen overflow:hidden") : null}
            `
            }>
                {!isLoading ? (<Spinner />) : (
                    <>
                        {videos.length > 0 ? (
                            <div className='su:hidden sm:block sm:w-5/12  md:w-4/12 lg:w-[30%] hover:overflow-auto '>
                                <Sidebar />
                            </div>
                        ) : (null)}
                        <InfiniteScroll //spinner condition
                            dataLength={videos.length}
                            next={() => { dispatch(getSearchPageVideos(true)) }}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={'100vh'}

                        >
                            <div className="my-5 su:m-w-[90vh] sm:m-w-[550px] lg:m-w-[90vh]">
                                {videos.map((item: HomePageVideos, index: any) => {
                                    return <SearchCard data={item} key={item.index + item.videoTitle} />
                                })}
                            </div>
                        </InfiniteScroll>
                    </>
                )}
            </div>
        </div>
    )
}
