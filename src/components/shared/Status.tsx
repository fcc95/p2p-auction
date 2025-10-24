type IProps = {
  status: string;
};

const Status = ({ status }: IProps) => {
  const classes = "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border capitalize ${classes}`}
    >
      {status}
    </span>
  );
};

export default Status;
