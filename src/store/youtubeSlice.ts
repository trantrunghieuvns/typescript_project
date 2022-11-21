import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    loading: true,
    searchOtherTerm: ""
}

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

//fetch function
export const getHomePageVideos = createAsyncThunk(
    "youtubeApp/homePageVideos",
    async (isNext: boolean, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
        } = getState() as RootState;
        const {
            data: { items, nextPageToken },
        } = await axios.get(
            `${YOUTUBE_API_URL}/search?maxResults=10&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""
            }`
        );
        const parsedData: HomePageVideos[] = await parseData(items);

        return { parsedData: [...videos, ...parsedData], nextPageToken };
    }
);


//search function 
export const getSearchPageVideos = createAsyncThunk(
    "youtubeApp/search",
    async (isNext: boolean, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
        } = getState() as RootState;

        const {
            data: { items, nextPageToken },
        } = await axios.get(
            `${YOUTUBE_API_URL}/search?maxResults=10&q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""
            }`
        );
        const parsedSearchData: HomePageVideos[] = await parseData(items);
        return { parsedSearchData: [...videos, ...parsedSearchData], nextPageToken };
    }
);

//youtube slice (father of stuff )
export const youtubeSlice = createSlice(
    {
        name: 'youtubeApp',
        initialState,
        reducers: {
            clearVideos: (state) => {
                state.videos = [];
                state.nextPageToken = null;
            },
            changeSearchTerm: (state, action: PayloadAction<string>) => {
                state.searchTerm = action.payload;
            },
            clearSearchTerm: (state) => {
                state.searchTerm = '';
            }
        },
        extraReducers: ((builder) => {
            builder
                .addCase(getHomePageVideos.fulfilled, (state, action) => {
                    state.videos = action.payload.parsedData;
                    state.nextPageToken = action.payload.nextPageToken;
                })
                .addCase(getHomePageVideos.pending, (state, action) => {
                    state.loading = true
                })
                .addCase(getSearchPageVideos.fulfilled, (state, action) => {
                    state.videos = action.payload.parsedSearchData;
                    state.nextPageToken = action.payload.nextPageToken;
                })
                .addCase(getSearchPageVideos.pending, (state, action) => {
                    state.loading = true
                })
        })
    }
)

export const { clearVideos, changeSearchTerm, clearSearchTerm } = youtubeSlice.actions;