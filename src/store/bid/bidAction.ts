// src/store/bid/bidActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState, ThunkExtra } from "..";

import { bidFile, bidsDir } from "../../helpers/fileHelper";
import type { Bid } from "./bidTypes";

export const PLACE_BID = "PLACE_BID";
export const FETCH_BIDS_BY_AUCTION = "FETCH_BIDS_BY_AUCTION";
export const LIST_BIDS_BY_AUCTION_WATCHER = "LIST_BIDS_BY_AUCTION_WATCHER";

export const placeBid = createAsyncThunk<
  void,
  Bid,
  { state: RootState; extra: ThunkExtra }
>(PLACE_BID, async (bid, { extra }) => {
  const { pear } = extra;

  await pear.hyperdrive.put(
    bidFile(bid.auctionId, bid.id),
    Buffer.from(JSON.stringify(bid))
  );
});

export const bidsByAuctionWatcher = createAsyncThunk<
  void,
  { auctionId: string },
  { state: RootState; extra: ThunkExtra }
>(LIST_BIDS_BY_AUCTION_WATCHER, async ({ auctionId }, { extra, dispatch }) => {
  const { pear } = extra;
  const updatedBidWatcher = pear.hyperdrive.watch(bidsDir(auctionId));

  for await (const _ of updatedBidWatcher) {
    await dispatch(bidsByAuction({ auctionId }));
  }
  updatedBidWatcher?.destroy?.();
});

export const bidsByAuction = createAsyncThunk<
  Bid[],
  { auctionId: string },
  { state: RootState; extra: ThunkExtra }
>(FETCH_BIDS_BY_AUCTION, async ({ auctionId }, { extra }) => {
  const { pear } = extra;
  const dir = bidsDir(auctionId);

  const bids: Bid[] = [];
  try {
    for await (const entry of pear.hyperdrive.list(dir, { recursive: false })) {
      const buf = await pear.hyperdrive.get(entry.key);
      bids.push(JSON.parse(buf.toString("utf8")));
    }
  } catch {}

  return bids;
});
