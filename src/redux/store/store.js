import { configureStore } from "@reduxjs/toolkit";
import SongsSlice from "../reducers/SongsSlice";
import MusicSlice from "../reducers/MusicSlice";

const store = configureStore({
	reducer: {
		song: SongsSlice,
		music: MusicSlice,
		currentSong: null,
	},
});

export default store;
