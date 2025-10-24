import { useMemo, useState } from "react";
import { useAppSelector } from "../store";
import type {
  Auction,
  AuctionFilterStatus,
} from "../store/auction/auctionTypes";
import AuctionModal from "../components/auction/AuctionDetailedModal";
import CreateAuctionModal from "../components/auction/CreateAuctionModal";
import AuctionList from "../components/auction/AuctionList";
import Sidebar from "../components/sidebar/Sidebar";
import { createAuction } from "../store/auction/auctionAction";
import { newId } from "../helpers/fileHelper";
import type { CreateAuctionFormData } from "../components/forms/createAuction/schema";
import { useAppDispatch } from "../store";
import { placeBid } from "../store/bid/bidAction";
import type { Bid } from "../store/bid/bidTypes";

const AuctionPage = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);

  const runningAuctions = useAppSelector(
    (state) => state.auction.runningAuctions
  );
  const scheduledAuctions = useAppSelector(
    (state) => state.auction.scheduledAuctions
  );
  const endedAuctions = useAppSelector((state) => state.auction.endedAuctions);
  const createAuctionLoader = useAppSelector(
    (state) => state.auction.loader.create
  );

  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] =
    useState<AuctionFilterStatus>("running");

  const handleSelectAuction = (auction: Auction) => {
    setSelectedAuction(auction);
  };

  const handleCloseModal = () => {
    setSelectedAuction(null);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleFilterStatus = (status: AuctionFilterStatus) => {
    setFilterStatus(status);
  };

  const handleBid = async (amount: number) => {
    if (selectedAuction?.id && profile) {
      const bid: Bid = {
        id: newId(),
        auctionId: selectedAuction.id,
        bidderId: profile.id,
        bidderName: profile?.name,
        amount,
        createdAt: new Date(),
      };
      await dispatch(placeBid(bid)).unwrap();
      setSelectedAuction(null);
    }
  };

  const auctionsToDisplay = useMemo(() => {
    switch (filterStatus) {
      case "running":
        return runningAuctions;
      case "scheduled":
        return scheduledAuctions;
      case "ended":
        return endedAuctions;
      default:
        return [...runningAuctions, ...scheduledAuctions, ...endedAuctions];
    }
  }, [filterStatus, runningAuctions, scheduledAuctions, endedAuctions]);

  const handleSubmitCreateAuction = async (formData: CreateAuctionFormData) => {
    try {
      await dispatch(
        createAuction({
          auction: {
            ...formData,
            id: newId(),
            ownerId: profile?.id || "",
            ownerName: profile?.name || "",
          },
        })
      ).unwrap();
      handleCloseCreateModal();
    } catch (error) {
      console.error("Error creating auction:", error);
    }
  };

  return (
    <div className="flex max-h-screen bg-gray-50 h-full">
      <Sidebar
        name={profile?.name || ""}
        surname={profile?.surname || ""}
        filterStatus={filterStatus}
        setFilterStatus={handleFilterStatus}
        onCreateAuction={handleOpenCreateModal}
      />

      <AuctionList
        auctions={auctionsToDisplay}
        handleAuction={handleSelectAuction}
        filterName={filterStatus as string}
      />

      {selectedAuction && (
        <AuctionModal
          auction={selectedAuction}
          handleClose={handleCloseModal}
          handleBid={handleBid}
        />
      )}
      {showCreateModal && (
        <CreateAuctionModal
          handleClose={handleCloseCreateModal}
          isSubmitting={createAuctionLoader === "pending"}
          handleSubmit={handleSubmitCreateAuction}
        />
      )}
    </div>
  );
};

export default AuctionPage;
