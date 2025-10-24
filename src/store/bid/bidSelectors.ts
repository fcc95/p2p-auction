import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

export const selectBidsByAuctionId = (auctionId: string) =>
  createSelector(
    (state: RootState) => state.bid.bids[auctionId],
    (bids) => bids?.list || []
  );

export const selectHighestBidByAuctionId = (auctionId: string) =>
  createSelector(
    (state: RootState) => state.bid.bids[auctionId],
    (bids) => bids?.highestBid || 0
  );

export const selectLoaderByAuctionId = (auctionId: string) =>
  createSelector(
    (state: RootState) => state.bid.bids[auctionId],
    (bids) => bids?.loader || "idle"
  );
