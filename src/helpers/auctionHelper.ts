import type { Auction, AuctionStatus } from "../store/auction/auctionTypes";

export const getAuctionsByStatus = (
  auctions: Auction[],
  status: AuctionStatus
): Auction[] => {
  return auctions.filter(
    (auction) =>
      getAuctionStatus(new Date(auction.startAt), new Date(auction.endsAt)) ===
      status
  );
};

export const getAuctionStatus = (
  startAt: Date,
  endsAt: Date
): AuctionStatus => {
  const now = Date.now();
  if (startAt.getTime() > now) {
    return "scheduled";
  } else if (endsAt.getTime() > now) {
    return "running";
  } else {
    return "ended";
  }
};

export const isAuctionRunning = (startAt: Date, endsAt: Date): boolean => {
  return getAuctionStatus(new Date(startAt), new Date(endsAt)) === "running";
};

export const canBid = (auction: Auction, bidderId: string): boolean => {
  return (
    auction.ownerId !== bidderId &&
    isAuctionRunning(auction.startAt, auction.endsAt)
  );
};
