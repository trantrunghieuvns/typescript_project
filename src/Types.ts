import { Key } from "react";

export interface InitialState {
    searchOtherTerm: string;
    videos: HomePageVideos[];
    currentPlaying: CurrentPlaying | null;
    searchTerm: string;
    searchResult: [];
    nextPageToken: string | null;
    recommendedVideos: RecommendedVideos[];
    loading: boolean;

}

export interface HomePageVideos {
    index: Key;
    videoId: string;
    videoTitle: string;
    videoDescription: string;
    videoLink: string;
    videoDuration: string;
    videoViews: string;
    videoAge: string;
    channelInfo: {
        id: string;
        image: string;
        name: string;
    }
    videoThumbnail: string;
    loading: boolean;

}
export interface CurrentPlaying { }
export interface RecommendedVideos { }