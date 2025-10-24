import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "./userTypes";
import { getProfile, updateProfile } from "./userAction";
import type { LoaderType } from "../type";

type UserState = {
  loader: { fetch: LoaderType; update: LoaderType };
  profile: UserProfile | null;
};

const initialState: UserState = {
  loader: { fetch: "idle", update: "idle" },
  profile: null,
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loader.fetch = "pending";
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.loader.fetch = "succeeded";
        state.profile = payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.loader.fetch = "failed";
      })
      .addCase(updateProfile.pending, (state) => {
        state.loader.update = "pending";
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loader.update = "succeeded";
        state.profile = payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.loader.update = "failed";
      });
  },
});

export default slice.reducer;
