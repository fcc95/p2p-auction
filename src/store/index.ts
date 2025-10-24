import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import auctionReducer from "./auction/auctionSlice";
import bidReducer from "./bid/bidSlice";

import { useDispatch, useSelector } from "react-redux";
import { initPearClient, type PearClient } from "../utility/pearRegistry";

const pear = initPearClient();

export const store = configureStore({
  reducer: {
    user: userReducer,
    auction: auctionReducer,
    bid: bidReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      thunk: { extraArgument: { pear } },
      serializableCheck: false, // Hyperdrive returns Buffers, streams; disable strict checks
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type ThunkExtra = { pear: PearClient };

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
