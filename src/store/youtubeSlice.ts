import { createSlice, current } from "@reduxjs/toolkit";
import { InitialState } from "../Types";
import { getHomePageVideos } from './reducers/fetchHomePageVideos';

export const initialState: InitialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: '',
    searchResult: [],
    nextPageToken: null,
    recommendedVideos: [],
}

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

            // builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
            //     state.videos = action.payload.parsedData;
            //     state.nextPageToken = action.payload.nextPageToken;
            // });
            // builder.addCase(getVideoDetails.fulfilled, (state, action) => {
            //     state.currentPlaying = action.payload;
            // });
            // builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
            //     state.recommendedVideos = action.payload.parsedData;

            // });
        })
    }
)

