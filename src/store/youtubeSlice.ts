import { createSlice, current } from "@reduxjs/toolkit";
import { InitialState } from "../Types";
import { getHomePageVideos } from './reducers/getHomePageVideos';

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
                // console.log(current(state));


            })
        })
    }
)

