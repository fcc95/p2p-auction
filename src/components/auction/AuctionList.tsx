import type { Auction } from "../../store/auction/auctionTypes";
import AuctionCard from "./AuctionCard";

type IProps = {
  filterName: string;
  auctions: Auction[];
  handleAuction: (auction: Auction) => void;
};

const AuctionList = ({ filterName, auctions, handleAuction }: IProps) => {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {filterName.toLocaleUpperCase()} AUCTIONS
          </h1>
          <p className="text-gray-600">{auctions.length} auctions found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {auctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onClick={handleAuction}
            />
          ))}
        </div>

        {auctions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No auctions found</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AuctionList;
