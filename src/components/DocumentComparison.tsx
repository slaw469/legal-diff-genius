
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentUpload } from './DocumentUpload';
import { ComparisonView } from './ComparisonView';
import { RiskAssessment } from './RiskAssessment';
import { ClauseAnalysis } from './ClauseAnalysis';
import { FileText, Shield, Search, BarChart3 } from 'lucide-react';

export const DocumentComparison = () => {
  const [documents, setDocuments] = useState<{
    document1: string | null;
    document2: string | null;
  }>({
    document1: null,
    document2: null,
  });

  const [comparisonResults, setComparisonResults] = useState(null);

  const handleDocumentUpload = (docType: 'document1' | 'document2', content: string) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: content
    }));
  };

  const bothDocumentsUploaded = documents.document1 && documents.document2;

  return (
    <div className="w-full">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="comparison" disabled={!bothDocumentsUploaded} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="risk" disabled={!bothDocumentsUploaded} className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="clauses" disabled={!bothDocumentsUploaded} className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Clause Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <DocumentUpload 
            onDocumentUpload={handleDocumentUpload}
            documents={documents}
          />
        </TabsContent>

        <TabsContent value="comparison">
          <ComparisonView 
            document1={documents.document1}
            document2={documents.document2}
            onComparisonComplete={setComparisonResults}
          />
        </TabsContent>

        <TabsContent value="risk">
          <RiskAssessment 
            document1={documents.document1}
            document2={documents.document2}
            comparisonResults={comparisonResults}
          />
        </TabsContent>

        <TabsContent value="clauses">
          <ClauseAnalysis 
            document1={documents.document1}
            document2={documents.document2}
            comparisonResults={comparisonResults}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
