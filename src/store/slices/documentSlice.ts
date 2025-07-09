
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentState {
  document1: {
    content: string | null;
    metadata: {
      size: number;
      type: string;
      uploadDate: string;
    } | null;
  };
  document2: {
    content: string | null;
    metadata: {
      size: number;
      type: string;
      uploadDate: string;
    } | null;
  };
  processingStatus: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: DocumentState = {
  document1: {
    content: null,
    metadata: null,
  },
  document2: {
    content: null,
    metadata: null,
  },
  processingStatus: 'idle',
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocument: (
      state,
      action: PayloadAction<{
        documentType: 'document1' | 'document2';
        content: string;
        metadata: { size: number; type: string; uploadDate: string };
      }>
    ) => {
      const { documentType, content, metadata } = action.payload;
      state[documentType] = { content, metadata };
    },
    clearDocuments: (state) => {
      state.document1 = { content: null, metadata: null };
      state.document2 = { content: null, metadata: null };
    },
    setProcessingStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'success' | 'error'>
    ) => {
      state.processingStatus = action.payload;
    },
  },
});

export const { setDocument, clearDocuments, setProcessingStatus } = documentSlice.actions;
export default documentSlice.reducer;
