import { configureStore } from "@reduxjs/toolkit";

import authReducerUser from "./slices/authSliceUser";
import authReducerCompany from "./slices/authSliceCompany";

export const store = configureStore({
  reducer: {
    authUser: authReducerUser,
    authCompany: authReducerCompany,
  },
});
