import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserProfile } from "./userTypes";
import type { ThunkExtra } from "..";
import { PROFILE_PEAR_PATH } from "../../constants/pear";

export const GET_PROFILE = "GET_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const getProfile = createAsyncThunk<
  UserProfile | null,
  void,
  { extra: ThunkExtra }
>(GET_PROFILE, async (_, { extra }) => {
  const { pear } = extra;
  try {
    const buf = await pear.hyperdrive.get(PROFILE_PEAR_PATH);
    if (buf) {
      return JSON.parse(buf);
    }
    return null;
  } catch {
    return null;
  }
});

export const updateProfile = createAsyncThunk<
  UserProfile,
  UserProfile,
  { extra: ThunkExtra }
>(UPDATE_PROFILE, async (profile, { extra }) => {
  const { pear } = extra;
  try {
    await pear.hyperdrive.put(
      PROFILE_PEAR_PATH,
      Buffer.from(JSON.stringify(profile))
    );
  } catch {}

  return profile;
});
