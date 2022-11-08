import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../Types";

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

        })
    }
)

