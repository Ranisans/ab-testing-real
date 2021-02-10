import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../core/interfaces";

interface IRecord {
  id: number;
  userData: IUserData;
}

const initialState = [] as IUserData[];

const usersState = createSlice({
  name: "usersData",
  initialState: [] as IUserData[],
  reducers: {
    setData: (state, { payload }: PayloadAction<IRecord>) => {
      state[payload.id] = payload.userData;
    },
    reset: () => initialState,
  },
});

export const { setData, reset } = usersState.actions;

export default usersState.reducer;
