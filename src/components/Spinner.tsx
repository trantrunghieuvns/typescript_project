import { useAppSelector } from "../store/hooks";
import { HomePageVideos } from "../Types";



function Spinner() {
    const videos: HomePageVideos[] = useAppSelector((state) => (
        state.youtubeApp.videos
    )
    );
    // items-center justify-center 
    //h - screen z - 50 mx - [30vh] - my - [20vh] su: -mx - [26vh] su: -my - [20vh] md: mx - [10vh] md: -my - [10vh] lg: mx - [50vh] lg: -my - [10vh] w - [100vh]
    return (

        videos.length === 0 ?
            (
                <div className='flex items-center justify-center 
        h-screen z-50 '>
                    <div className=" w-10 h-10 border-2 border-red-600 border-solid rounded-full animate-spin border-t">
                    </div>
                </div>
            ) :
            (
                <div className='flex items-center justify-center 
        h-screen z-50 -pt-[50vh]'>
                    <div className="w-10 h-10 border-2 border-red-600 border-solid rounded-full animate-spin border-t">
                    </div>
                </div>
            )


    )
}



export default Spinner;

