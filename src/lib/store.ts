import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/store/movieSlice";

export const store = () => {
  return configureStore({
    reducer: {
      movies: movieReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
