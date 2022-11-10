import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HomePageVideos } from "../../Types";
import { YOUTUBE_API_URL } from "../../utils/constantsApi";
import { parseData } from "../../utils/parseDataParent";
import { RootState } from "../store";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
    "youtubeApp/homePageVideos",
    async (isNext: boolean, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState },
        } = getState() as RootState;

        const {
            data: { items, nextPageToken },
        } = await axios.get(
            `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""
            }`
        );

        const parsedData: HomePageVideos[] = await parseData(items);

        return { parsedData: [...parsedData], nextPageToken };

    }
);