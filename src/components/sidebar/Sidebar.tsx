import SidebarTab from "./SidebarTab";
import Button from "../shared/Button";
import type { AuctionFilterStatus } from "../../store/auction/auctionTypes";

type IProps = {
  name: string;
  surname: string;
  filterStatus: AuctionFilterStatus;
  setFilterStatus: (status: AuctionFilterStatus) => void;
  onCreateAuction: () => void;
};

const Sidebar = ({
  name,
  surname,
  filterStatus,
  setFilterStatus,
  onCreateAuction,
}: IProps) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 px-6 py-10 flex flex-col gap-4">
      {name} {surname} V1
      <div className="mb-4 mt-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">P2P Auction</h2>
        <p className="text-xs text-gray-500">Decentralized marketplace</p>
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-gray-700 mb-2 pl-4">Filter</h1>

          <SidebarTab
            onClick={() => setFilterStatus("all")}
            isActive={filterStatus === "all"}
            label="All"
          />

          <SidebarTab
            onClick={() => setFilterStatus("running")}
            isActive={filterStatus === "running"}
            label="Running"
          />

          <SidebarTab
            onClick={() => setFilterStatus("scheduled")}
            isActive={filterStatus === "scheduled"}
            label="Scheduled"
          />
          <SidebarTab
            onClick={() => setFilterStatus("ended")}
            isActive={filterStatus === "ended"}
            label="Ended"
          />
        </div>
        <Button onClick={onCreateAuction} text="+ Add Auction Item" />
      </div>
    </aside>
  );
};

export default Sidebar;
