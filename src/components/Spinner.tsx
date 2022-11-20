import { useAppSelector } from "../store/hooks";
import { HomePageVideos } from "../Types";

function Spinner() {
    const videos: HomePageVideos[] = useAppSelector((state) =>
        state.youtubeApp.videos
    );

    return (

        videos.length === 0 ?
            (
                <div className='flex items-center justify-center 
        h-screen z-50 -pt-50px w-[100vw]'>
                    <div className=" w-10 h-10 border-2 border-red-600 border-solid rounded-full animate-spin border-t">
                    </div>
                </div>
            ) :
            (
                <div className='flex items-center justify-center 
        h-screen z-50 -pt-[50vw]'>
                    <div className=" w-10 h-10 border-2 border-red-600 border-solid rounded-full animate-spin border-t">
                    </div>
                </div>
            )


    )
}

export default Spinner;