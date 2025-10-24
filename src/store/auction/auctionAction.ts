// src/store/auction/auctionActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState, ThunkExtra } from "..";
import { auctionFile, auctionDir, bidsDir } from "../../helpers/fileHelper";
import type { Auction } from "./auctionTypes";
import { AUCTIONS_PEAR_PATH } from "../../constants/pear";
import { parseJson } from "../../helpers/dataHelper";
import { bidsByAuction } from "../bid/bidAction";

const CREATE_AUCTION = "CREATE_AUCTION";
const AUCTION_LIST = "AUCTION_LIST";
const AUCTION_LIST_WATCHER = "AUCTION_LIST_WATCHER";

export const createAuction = createAsyncThunk<
  void,
  { auction: Auction },
  { state: RootState; extra: ThunkExtra }
>(CREATE_AUCTION, async ({ auction }, { extra }) => {
  const { pear } = extra;
  try {
    await pear.hyperdrive.mkdir?.(auctionDir(auction.id)).catch(() => {});
    await pear.hyperdrive.mkdir?.(bidsDir(auction.id)).catch(() => {});
    await pear.hyperdrive.put(
      auctionFile(auction.id),
      Buffer.from(JSON.stringify(auction))
    );
  } catch {}
});

export const listAuctionsWatcher = createAsyncThunk<
  void,
  void,
  { state: RootState; extra: ThunkExtra }
>(AUCTION_LIST_WATCHER, async (_arg, { extra, dispatch }) => {
  const { pear } = extra;
  const updatedAuctionWatcher = pear.hyperdrive.watch(AUCTIONS_PEAR_PATH);

  for await (const _ of updatedAuctionWatcher) {
    await dispatch(listAuctions());
  }
  updatedAuctionWatcher?.destroy?.();
});

export const listAuctions = createAsyncThunk<
  Auction[],
  void,
  { state: RootState; extra: ThunkExtra }
>(AUCTION_LIST, async (_arg, { extra, dispatch }) => {
  const { pear } = extra;
  const auctions: Auction[] = [];

  try {
    for await (const entry of pear.hyperdrive.list(AUCTIONS_PEAR_PATH, {
      recursive: false,
    })) {
      try {
        const buf = await pear.hyperdrive.get(entry.key);
        if (buf) {
          const auction = parseJson<Auction>(buf);
          if (auction) {
            auctions.push(auction);
            await dispatch(bidsByAuction({ auctionId: auction.id }));
          }
        }
      } catch {}
    }
  } catch {}

  return auctions;
});
