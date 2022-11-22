import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomePageVideos, InitialState, RecommendedVideos } from "../Types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { YOUTUBE_API_URL } from "../utils/constantsApi";
import { parseData } from "../utils/parseDataParent";
import { RootState } from "./store";
import { parseRecommendedData } from "../utils/parseRecommendedData";
import { getVideoDetails } from "./reducers/getVideoDetails";

export const initialState: InitialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: '',
    searchResult: [],
    nextPageToken: null,
    recommendedVideos: [],
    loading: true,
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
            `${YOUTUBE_API_URL}/search?maxResults=10&q="Christmas Songs 2022"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""
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

//get RecommendedVideos
export const getRecommendedVideos = createAsyncThunk(
    "youtubeApp/getRecommendedVideos",
    async (videoId: string, { getState }) => {
        const {
            youtubeApp: {
                currentPlaying: {
                    channelInfo: { id: channelId },
                },
            },
        } = getState() as RootState;

        const {
            data: { items },
        } = await axios.get(
            `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=10&type=video&videoId=${videoId}`
        );

        const parsedData: RecommendedVideos[] = await parseRecommendedData(
            items,
            videoId
        );
        return { parsedData };
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
            },
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
                .addCase(getRecommendedVideos.fulfilled, (state, action) => {
                    state.recommendedVideos = action.payload.parsedData;
                })
                .addCase(getVideoDetails.fulfilled, (state, action) => {
                    state.currentPlaying = action.payload;
                })
        })
    }
)

export const { clearVideos, changeSearchTerm, clearSearchTerm } = youtubeSlice.actions;