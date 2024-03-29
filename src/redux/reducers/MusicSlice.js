// src/redux/musicSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk per il fetching della sezione musicale
export const fetchMusicSection = createAsyncThunk("music/fetchMusicSection", async ({ genre }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
      },
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return { genre, albums: data.data };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  sections: {
    rock: [],
    pop: [],
    hipHop: [],
  },
  loading: false,
  error: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusicSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMusicSection.fulfilled, (state, { payload }) => {
        state.sections[payload.genre] = payload.albums;
        state.loading = false;
      })
      .addCase(fetchMusicSection.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default musicSlice.reducer;
