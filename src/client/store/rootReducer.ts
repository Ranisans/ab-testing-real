import { combineReducers } from "@reduxjs/toolkit";

import usersDataState from "./usersData";

const rootReducer = combineReducers({ usersDataState });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
