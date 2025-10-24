import { createSlice } from "@reduxjs/toolkit";

import { bidsByAuction } from "./bidAction";
import type { Bid } from "./bidTypes";
import type { LoaderType } from "../type";

type BidState = {
  bids: {
    [key: string]: { list: Bid[]; loader: LoaderType; highestBid: number };
  };
};

const initialState: BidState = {
  bids: {},
};

const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(bidsByAuction.pending, (state, { meta }) => {
        state.bids[meta.arg.auctionId] = {
          list: [],
          loader: "pending",
          highestBid: 0,
        };
      })
      .addCase(bidsByAuction.fulfilled, (state, { payload, meta }) => {
        state.bids[meta.arg.auctionId].list = payload.sort(
          (a, b) => a.amount - b.amount
        );
        const maxBid = payload.length
          ? Math.max(...payload.map((bid) => bid.amount))
          : 0;
        state.bids[meta.arg.auctionId].highestBid = maxBid;
        state.bids[meta.arg.auctionId].loader = "succeeded";
      })
      .addCase(bidsByAuction.rejected, (state, { meta }) => {
        state.bids[meta.arg.auctionId] = {
          list: [],
          loader: "failed",
          highestBid: 0,
        };
      });
  },
});

export default bidSlice.reducer;
