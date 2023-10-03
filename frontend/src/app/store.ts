// store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { rootApi } from './RootApi';

const store = configureStore({
  reducer: {
    ...rootReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
