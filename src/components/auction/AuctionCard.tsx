import type { Auction } from "../../store/auction/auctionTypes";
import { useAppSelector } from "../../store";
import {
  selectBidsByAuctionId,
  selectHighestBidByAuctionId,
  selectLoaderByAuctionId,
} from "../../store/bid/bidSelectors";
import { getAuctionStatus } from "../../helpers/auctionHelper";
import Status from "../shared/Status";
import { formatDateString } from "../../helpers/dateHelper";

type IProps = {
  auction: Auction;
  onClick: (auction: Auction) => void;
};

export default function AuctionCard({ auction, onClick }: IProps) {
  const bids = useAppSelector(selectBidsByAuctionId(auction.id));
  const highestBid = useAppSelector(selectHighestBidByAuctionId(auction.id));
  const loader = useAppSelector(selectLoaderByAuctionId(auction.id));

  if (loader === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div
      onClick={() => onClick(auction)}
      className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer "
    >
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">
            {auction.title}
          </h3>
          <Status
            status={getAuctionStatus(
              new Date(auction.startAt),
              new Date(auction.endsAt)
            )}
          />
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{auction.desc}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">
            {true ? "Current Bid:" : "Reserve Price:"}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-bold ${
                true ? "text-blue-600" : "text-gray-900"
              }`}
            >
              ${highestBid?.toLocaleString()}
            </span>
            {true && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                {bids?.length} bids
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Start:</span>
          <span className="text-gray-600">
            {formatDateString(auction.startAt)}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">End:</span>
          <span className="text-gray-600">
            {formatDateString(auction.endsAt)}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Owner:</span>
          <span className="text-gray-600 font-mono truncate max-w-[180px]">
            {auction.ownerName}
          </span>
        </div>
      </div>
    </div>
  );
}
