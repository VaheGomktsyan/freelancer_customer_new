import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./features/user/userSlice";
import { customerSlice } from "./features/customer/customerSlice";
import { workSlice } from "./features/work/workSlice";
import { freelancerSlice } from "./features/freelancer/freelancerSlice";
import { skillSlice } from "./features/skill/skillSlice";
import { feedbackApplySlice } from "./features/feedback-apply/feedbackApplySlice";

const rootReducer = combineSlices(userApiSlice, customerSlice, workSlice, freelancerSlice, skillSlice, feedbackApplySlice);
export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        userApiSlice.middleware,
        customerSlice.middleware,
        workSlice.middleware,
        freelancerSlice.middleware,
        skillSlice.middleware,
        feedbackApplySlice.middleware
      );
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
