import { createSlice } from "@reduxjs/toolkit";

import { createAuction, listAuctions } from "./auctionAction";
import type { Auction } from "./auctionTypes";
import { getAuctionsByStatus } from "../../helpers/auctionHelper";
import type { LoaderType } from "../type";

type AuctionState = {
  runningAuctions: Auction[];
  scheduledAuctions: Auction[];
  endedAuctions: Auction[];
  selectedAuction: Auction | null;
  loader: { create: LoaderType; list: LoaderType };
};

const initialState: AuctionState = {
  runningAuctions: [],
  scheduledAuctions: [],
  endedAuctions: [],
  selectedAuction: null,
  loader: { create: "idle", list: "idle" },
};

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createAuction.pending, (state) => {
        state.loader.create = "pending";
      })
      .addCase(createAuction.fulfilled, (state) => {
        state.loader.create = "succeeded";
      })
      .addCase(createAuction.rejected, (state) => {
        state.loader.create = "failed";
      })
      .addCase(listAuctions.pending, (state) => {
        state.loader.list = "pending";
      })
      .addCase(listAuctions.fulfilled, (state, { payload }) => {
        state.loader.list = "succeeded";
        state.runningAuctions = getAuctionsByStatus(payload, "running");
        state.scheduledAuctions = getAuctionsByStatus(payload, "scheduled");
        state.endedAuctions = getAuctionsByStatus(payload, "ended");
      })
      .addCase(listAuctions.rejected, (state) => {
        state.loader.list = "failed";
      });
  },
});

export default auctionSlice.reducer;
