import "./App.css";
import AuctionPage from "./pages/Auction";
import Register from "./pages/Register";
import { useAppSelector } from "./store";

const App = () => {
  const profile = useAppSelector((store) => store.user.profile);

  return (
    <div className="h-screen">
      {Boolean(profile) ? <AuctionPage /> : <Register />}
    </div>
  );
};

export default App;
