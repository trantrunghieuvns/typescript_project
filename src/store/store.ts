import { configureStore } from "@reduxjs/toolkit";
import { youtubeSlice } from "./youtubeSlice";


export const store = configureStore({
    reducer: {
        youtubeApp: youtubeSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;