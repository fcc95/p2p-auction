import { AUCTIONS_PEAR_PATH } from "../constants/pear";

export const newId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const auctionDir = (auctionId: string) =>
  `${AUCTIONS_PEAR_PATH}/${auctionId}`;

export const auctionFile = (auctionId: string) =>
  `${auctionDir(auctionId)}/auction.json`;

export const bidsDir = (auctionId: string) => `${auctionDir(auctionId)}/bids`;

export const bidFile = (auctionId: string, bidId: string) =>
  `${bidsDir(auctionId)}/${bidId}.json`;
