import { useState, useEffect } from 'react';
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { FaShare } from 'react-icons/fa';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WatchCard from '../components/WatchCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideoDetails } from '../store/reducers/getVideoDetails';
import { getRecommendedVideos } from '../store/youtubeSlice';

export default function Watch() {
    const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { id } = useParams()
    const currentPlaying = useAppSelector(
        (state) => state.youtubeApp.currentPlaying
    )
    const recommendedVideos = useAppSelector((state) => state.youtubeApp.recommendedVideos)
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            dispatch(getVideoDetails(id))
            setShowMoreStatus(false)
        } else {
            navigate("/");
        }
    }, [id, navigate, dispatch]);

    useEffect(() => { if (currentPlaying && id) dispatch(getRecommendedVideos(id)) })

    return (
        <>
            {currentPlaying && currentPlaying?.videoId === id && (
                <div className="max-h-screen">
                    <div style={{ height: "7.5vh" }}>
                        <Navbar />
                    </div>
                    <div className="flex w-full" style={{ height: "92.5vh" }}>
                        <div className="flex gap-y-10 gap-x-5 py-7 mx-10 w-full overflow-auto">
                            <div className='max-h-[800px]'>
                                <div className='lg:max-h-[376.5px] lg:max-w-[600px] sm:max-h-[219px] sm:max-w-[350px]  su:max-w-[300px] su:max-h-[188px] xl:max-w-[1000px] xl:max-h-[627px]'>
                                    <iframe
                                        width="800"
                                        height="502"
                                        className='lg:max-h-[376.5px] lg:max-w-[600px] sm:max-h-[219px] sm:max-w-[350px] su:max-w-[300px] su:max-h-[188px] xl:max-w-[1000px] xl:max-h-[627px]'
                                        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="mt-5">
                                        <p className="text-xl">{currentPlaying.videoTitle}</p>
                                        <div className="flex justify-between mt-1">
                                            <div className="text-sm text-gray-600">
                                                <span className="after:content-['•'] after:mx-1">
                                                    {currentPlaying.videoViews} views
                                                </span>
                                                <span> {currentPlaying.videoAge} ago</span>
                                            </div>
                                            <div className="flex items-center gap-4 uppercase">
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    <BiLike className="text-xl" />
                                                    <strong>{currentPlaying.videoLikes}</strong>
                                                </div>
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    <BiDislike className="text-xl" />
                                                    <strong>dislike</strong>
                                                </div>
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    <FaShare className="text-xl" />
                                                    <strong>share</strong>
                                                </div>
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    <HiScissors className="text-xl" />
                                                    <strong>clip</strong>
                                                </div>
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    <MdOutlinePlaylistAdd className="text-xl" />
                                                    <strong>save</strong>
                                                </div>
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    <BsThreeDots className="text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                                            <div className="flex items-center gap-5 mr-5 mt-4">
                                                <div>
                                                    <img
                                                        src={currentPlaying.channelInfo.image}
                                                        alt=""
                                                        className="rounded-full h-12 w-12"
                                                    />
                                                </div>
                                                <div className="w-5/6">
                                                    <h5 className="text-sm">
                                                        <strong>{currentPlaying.channelInfo.name}</strong>
                                                    </h5>
                                                    <h6 className="text-gray-400 text-xs">
                                                        {currentPlaying.channelInfo.subscribers} subscribers
                                                    </h6>
                                                </div>
                                                <div>
                                                    <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                                                        subscribe
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className={`${!showMoreStatus ? "max-h-16 overflow-hidden" : ""
                                                    } text-sm w-11/12`}
                                            >
                                                <pre
                                                    style={{
                                                        fontFamily: `"Roboto", sans-serif`,
                                                    }}
                                                    className="whitespace-pre-wrap"
                                                >
                                                    {currentPlaying.videoDescription}
                                                </pre>
                                            </div>
                                            <div>
                                                <button
                                                    className="uppercase text-sm cursor-pointer"
                                                    onClick={() => setShowMoreStatus(!showMoreStatus)}
                                                >
                                                    Show {showMoreStatus ? "less" : "more"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                {getRecommendedVideos.length &&
                                    recommendedVideos.map((item) => {
                                        return <WatchCard data={item} key={item.videoId} />;
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
