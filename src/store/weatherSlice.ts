import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData, WeatherState } from "../types";

const getSavedSearchHistory = (): string[] => {
  const saved = localStorage.getItem("searchHistory");
  return saved ? JSON.parse(saved) : [];
};

const getSavedDarkMode = (): boolean => {
  const saved = localStorage.getItem("darkMode");
  return saved ? JSON.parse(saved) : false;
};

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  searchHistory: getSavedSearchHistory(),
  darkMode: getSavedDarkMode(),
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;

      if (!state.searchHistory.includes(action.payload.name)) {
        state.searchHistory = [
          action.payload.name,
          ...state.searchHistory,
        ].slice(0, 10);
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(state.searchHistory)
        );
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
      localStorage.removeItem("searchHistory");
    },
  },
});

export const {
  setLoading,
  setWeatherData,
  setError,
  toggleDarkMode,
  clearSearchHistory,
} = weatherSlice.actions;

export default weatherSlice.reducer;
