import { Key } from "react";

export interface InitialState {
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

export interface RecommendedVideos {
    videoId: string;
    videoTitle: string;
    videoThumbnail: string;
    videoDuration: string;
    videoViews: string;
    videoAge: string;
    channelInfo: {
        id: string;
        name: string;
    };

}

export interface CurrentPlaying {

    videoId: string;
    videoTitle: string;
    videoDescription: string;
    videoViews: string;
    videoLikes: string;
    videoAge: string;
    channelInfo: {
        id: string;
        image: string;
        name: string;
        subscribers: string;
    };

}

export interface Item {
    snippet: {
        title: string;
        thumbnails: { medium: { url: string } };
        publishedAt: Date;
        channelTitle: string;
        channelId: string;
    };
    contentDetails: { upload: { videoId: string } };
}
