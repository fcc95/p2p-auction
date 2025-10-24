/* global Pear */
import { type ReactNode, useEffect } from "react";
import { getPearClient } from "../utility/pearRegistry";
import { useAppDispatch } from "../store";
import {
  listAuctions,
  listAuctionsWatcher,
} from "../store/auction/auctionAction";

import { getProfile } from "../store/user/userAction";

type Props = { children: ReactNode };

export default function UserProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const pear = getPearClient();

    (async () => {
      await pear.hyperdrive.ready();

      // Initial fetches
      await dispatch(getProfile());
      await dispatch(listAuctions());
      await dispatch(listAuctionsWatcher());
    })();

    Pear.teardown(async () => {
      await pear.corestore.close();
    });
  }, []);

  return <>{children}</>;
}
