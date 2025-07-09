
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Difference {
  id: string;
  type: 'addition' | 'deletion' | 'modification';
  start: number;
  end: number;
  content: string;
  context?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface ComparisonState {
  differences: Difference[];
  currentDifference: number;
  filterType: 'all' | 'additions' | 'deletions' | 'modifications';
  viewMode: 'side-by-side' | 'unified';
  isAnalyzing: boolean;
  summary: {
    totalDifferences: number;
    additions: number;
    deletions: number;
    modifications: number;
  };
}

const initialState: ComparisonState = {
  differences: [],
  currentDifference: 0,
  filterType: 'all',
  viewMode: 'side-by-side',
  isAnalyzing: false,
  summary: {
    totalDifferences: 0,
    additions: 0,
    deletions: 0,
    modifications: 0,
  },
};

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    setDifferences: (state, action: PayloadAction<Difference[]>) => {
      state.differences = action.payload;
      state.summary = {
        totalDifferences: action.payload.length,
        additions: action.payload.filter(d => d.type === 'addition').length,
        deletions: action.payload.filter(d => d.type === 'deletion').length,
        modifications: action.payload.filter(d => d.type === 'modification').length,
      };
    },
    setCurrentDifference: (state, action: PayloadAction<number>) => {
      state.currentDifference = action.payload;
    },
    setFilterType: (
      state,
      action: PayloadAction<'all' | 'additions' | 'deletions' | 'modifications'>
    ) => {
      state.filterType = action.payload;
      state.currentDifference = 0;
    },
    setViewMode: (state, action: PayloadAction<'side-by-side' | 'unified'>) => {
      state.viewMode = action.payload;
    },
    setAnalyzing: (state, action: PayloadAction<boolean>) => {
      state.isAnalyzing = action.payload;
    },
    navigateToNextDifference: (state) => {
      if (state.differences.length > 0) {
        state.currentDifference = (state.currentDifference + 1) % state.differences.length;
      }
    },
    navigateToPreviousDifference: (state) => {
      if (state.differences.length > 0) {
        state.currentDifference = 
          (state.currentDifference - 1 + state.differences.length) % state.differences.length;
      }
    },
  },
});

export const {
  setDifferences,
  setCurrentDifference,
  setFilterType,
  setViewMode,
  setAnalyzing,
  navigateToNextDifference,
  navigateToPreviousDifference,
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
