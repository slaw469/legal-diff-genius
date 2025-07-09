
import { configureStore } from '@reduxjs/toolkit';
import documentReducer from './slices/documentSlice';
import comparisonReducer from './slices/comparisonSlice';
import riskReducer from './slices/riskSlice';

export const store = configureStore({
  reducer: {
    documents: documentReducer,
    comparison: comparisonReducer,
    risk: riskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
