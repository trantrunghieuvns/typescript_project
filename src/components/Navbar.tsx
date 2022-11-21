import React from 'react'
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeSearchTerm, clearSearchTerm, clearVideos, getSearchPageVideos } from '../store/youtubeSlice';

export default function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm)
    const handleSearch = () => {
        if (location.pathname !== '/search') {
            dispatch(clearVideos())
            navigate('/search');
            dispatch(getSearchPageVideos(false));
        }
        else {
            dispatch(clearVideos())
            dispatch(getSearchPageVideos(true))
        }
    }

    return (
        <div className="sticky-navbar flex justify-between items-center px-14 h-14 bg-[#3e3e3e] opacity-95 sticky top-0 z-50">
            <div className="flex gap-2 items-center text-2xl">
                <div><GiHamburgerMenu /></div>
                <Link to='/' >
                    <div className="logo-youtube flex gap-1 items-center justify-center su:mx-[10px] ">
                        <BsYoutube className='sm:text-xl lg:text-2xl xl:text-3xl text-red-600'></BsYoutube>
                        <span className='lg:text-xl sm:text-sm text-center justify-center mb-1 font-bold text-white/80 su:hidden  md:block'>Youtube</span>
                    </div>
                </Link >
            </div>

            <div className="flex items-center justify-center gap-5 su:gap-2 mx-[8px]">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch()
                }}>
                    <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
                        <div className="flex gap-4 items-center pr-5">
                            <div>
                                <AiOutlineSearch className='text-xl' />
                            </div>
                            <input
                                placeholder='Type search down here..'
                                type='text'
                                className='w-96 su:w-1/3 md:w-56 bg-zinc-900 focus:outline-none border-none'
                                onChange={(e) =>
                                    dispatch(changeSearchTerm(e.target.value))
                                }
                                value={searchTerm}
                            />
                            <AiOutlineClose
                                onClick={() => dispatch(clearSearchTerm())}
                                className={`text-xl cursor-pointer ${!searchTerm ? 'hidden' : 'block'}`
                                }
                            />
                        </div>
                        <button className='h-10 w-16 flex items-center justify-center bg-zinc-800'>
                            <div>
                                <AiOutlineSearch className='text-xl' />
                            </div>
                        </button>
                    </div>
                </form>
                <div className="text-xl su:text-sm su:p-[0.55rem] p-3 bg-zinc-900 rounded-full">
                    <TiMicrophone />
                </div>
            </div>

            <div className="flex gap-5 items-center text-xl">
                <div className="relative">
                    <BsBell />
                    <span className='absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1'>
                        9+
                    </span>
                </div>
                <img
                    src='https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wqHN?ver=f541'
                    alt='logo'
                    className='w-9 h-9 rounded-full'
                />
            </div>
        </div>


    )
}
