export type Auction = {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  desc: string;
  startingPrice: number;
  startAt: Date;
  endsAt: Date;
};

export type AuctionStatus = "scheduled" | "running" | "ended";

export type AuctionFilterStatus = AuctionStatus | "all";
