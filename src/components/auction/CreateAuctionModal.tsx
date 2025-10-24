import CreateAuctionForm from "../forms/createAuction/CreateAuctionForm";
import type { CreateAuctionFormData } from "../forms/createAuction/schema";

type IProps = {
  isSubmitting: boolean;
  handleClose: () => void;
  handleSubmit: (formData: CreateAuctionFormData) => void;
};

const CreateAuctionModal = ({
  isSubmitting,
  handleClose,
  handleSubmit,
}: IProps) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">Create New Auction</h2>

        <CreateAuctionForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={handleClose}
        />
      </div>
    </div>
  );
};

export default CreateAuctionModal;
