
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RiskFactor {
  id: string;
  category: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  description: string;
  recommendation?: string;
}

interface RiskAssessment {
  document1: {
    overallRisk: 'low' | 'medium' | 'high' | 'critical';
    riskScore: number;
    factors: RiskFactor[];
  };
  document2: {
    overallRisk: 'low' | 'medium' | 'high' | 'critical';
    riskScore: number;
    factors: RiskFactor[];
  };
  comparison: {
    riskDifference: number;
    recommendations: string[];
    criticalIssues: string[];
  };
}

interface RiskState {
  assessment: RiskAssessment | null;
  isAnalyzing: boolean;
  lastUpdated: string | null;
}

const initialState: RiskState = {
  assessment: null,
  isAnalyzing: false,
  lastUpdated: null,
};

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    setRiskAssessment: (state, action: PayloadAction<RiskAssessment>) => {
      state.assessment = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    setAnalyzing: (state, action: PayloadAction<boolean>) => {
      state.isAnalyzing = action.payload;
    },
    clearRiskAssessment: (state) => {
      state.assessment = null;
      state.lastUpdated = null;
    },
    updateRiskFactor: (
      state,
      action: PayloadAction<{
        documentType: 'document1' | 'document2';
        factorId: string;
        updates: Partial<RiskFactor>;
      }>
    ) => {
      if (state.assessment) {
        const { documentType, factorId, updates } = action.payload;
        const factor = state.assessment[documentType].factors.find(f => f.id === factorId);
        if (factor) {
          Object.assign(factor, updates);
        }
      }
    },
  },
});

export const {
  setRiskAssessment,
  setAnalyzing,
  clearRiskAssessment,
  updateRiskFactor,
} = riskSlice.actions;

export default riskSlice.reducer;
