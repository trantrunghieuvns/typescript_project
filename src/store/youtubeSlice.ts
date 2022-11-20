import { createSlice } from "@reduxjs/toolkit";
import { HomePageVideos, InitialState } from "../Types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { YOUTUBE_API_URL } from "../utils/constantsApi";
import { parseData } from "../utils/parseDataParent";
import { RootState } from "./store";


export const initialState: InitialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: '',
    searchResult: [],
    nextPageToken: null,
    recommendedVideos: [],
}

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
    "youtubeApp/homePageVideos",
    async (isNext: boolean, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
        } = getState() as RootState;

        const {
            data: { items, nextPageToken },
        } = await axios.get(
            `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""
            }`
        );

        const parsedData: HomePageVideos[] = await parseData(items);
        console.log('xxxx', [...parsedData])
        return { parsedData: [...videos, ...parsedData], nextPageToken };
    }
);

export const youtubeSlice = createSlice(
    {
        name: 'youtubeApp',
        initialState,
        reducers: {},
        extraReducers: ((builder) => {

            builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
                state.videos = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            });
        })
    }
)

