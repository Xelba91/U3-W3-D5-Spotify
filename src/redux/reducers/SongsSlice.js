import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

// Thunk action asincrona per la ricerca
export const fetchSongs = createAsyncThunk("songs/fetchSongs", async (artistName, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  songsList: [],
  searchResults: [],
  currentSongIndex: 0,
  currentSong: null,
  isPlaying: false,
  isShuffle: false,
  isRepeat: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState: {
    songsList: [],
    searchResults: [],
    currentSongIndex: 0,
    currentSong: null,
    shuffledList: [],
    isPlaying: false,
    isShuffle: false,
    isRepeat: false,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearSearchResults(state) {
      state.searchResults = [];
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
      state.currentSong = state.songsList[action.payload];
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    shuffle: (state) => {
      state.isShuffle = !state.isShuffle;
      if (state.isShuffle) {
        state.shuffledList = _.shuffle(state.songsList);
        state.currentSongIndex = state.shuffledList.findIndex((song) => song.id === state.currentSong.id);
      } else {
        state.currentSongIndex = state.songsList.findIndex((song) => song.id === state.currentSong.id);
      }
    },

    repeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
    preview: (state) => {
      if (!state.isRepeat || state.songsList.length === 1) {
        let prevIndex = state.currentSongIndex - 1;
        if (prevIndex < 0) {
          prevIndex = state.songsList.length - 1;
        }
        state.currentSongIndex = prevIndex;
        state.currentSong = state.songsList[prevIndex];
      }
    },
    next: (state) => {
      if (!state.isRepeat || state.songsList.length === 1) {
        state.currentSongIndex += 1;

        if (state.currentSongIndex >= state.songsList.length) {
          state.currentSongIndex = 0;
        }

        state.currentSong = state.songsList[state.currentSongIndex];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songsList = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults, setCurrentSong, setCurrentSongIndex, play, pause, next, preview, shuffle, repeat } =
  songsSlice.actions;
export default songsSlice.reducer;
