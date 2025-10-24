import type { Auction } from "../../store/auction/auctionTypes";
import Button from "../shared/Button";
import BidForm from "../forms/bidForm/BidForm";
import { useAppSelector } from "../../store";
import { getAuctionStatus, canBid } from "../../helpers/auctionHelper";
import {
  selectBidsByAuctionId,
  selectHighestBidByAuctionId,
  selectLoaderByAuctionId,
} from "../../store/bid/bidSelectors";
import Status from "../shared/Status";

type IProps = {
  auction: Auction;
  handleClose: () => void;
  handleBid: (amount: number) => void;
};

const AuctionModal = ({ auction, handleBid, handleClose }: IProps) => {
  const bids = useAppSelector(selectBidsByAuctionId(auction.id));
  const highestBid = useAppSelector(selectHighestBidByAuctionId(auction.id));
  const loader = useAppSelector(selectLoaderByAuctionId(auction.id));
  const profile = useAppSelector((state) => state.user.profile);

  const canBidResult = canBid(auction, profile?.id || "");
  if (loader === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 ">
          <h2 className="text-2xl font-bold text-gray-900">{auction.title}</h2>
          <p className="text-gray-400">{auction.desc}</p>
        </div>

        {bids.length > 0 && (
          <div className="overflow-auto max-h-30 h-full border-2 border-gray-200 rounded-xl flex flex-col gap-1 pl-4 ">
            {bids?.map((bid) => (
              <div
                key={bid.id}
                className="flex justify-between items-center py-2 pr-2 border-b border-gray-200 last:border-0"
              >
                <p className="text-gray-400">{bid.bidderName}:</p>
                <span className="text-gray-400">
                  ${bid.amount?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 ">
          <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-900 font-medium">Current Highest Bid:</p>
            <span className="text-xl font-bold text-blue-600">
              ${highestBid?.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-800 font-medium">Status:</p>
            <span className="text-gray-700">
              <div className="capitalize">
                <Status
                  status={getAuctionStatus(
                    new Date(auction.startAt),
                    new Date(auction.endsAt)
                  )}
                />
              </div>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-800 font-medium">Last Bid Owner:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
              {bids?.[0]?.bidderName}
            </code>
          </div>
        </div>

        {canBidResult && (
          <div className="border-t  pt-3">
            <BidForm
              minimumBid={highestBid ? highestBid + 1 : 0}
              onSubmit={handleBid}
            />
          </div>
        )}

        <Button
          className="cursor-pointer"
          variant="secondary"
          onClick={handleClose}
          text="Close"
        />
      </div>
    </div>
  );
};

export default AuctionModal;
