
import React from 'react';
import { DocumentComparison } from '@/components/DocumentComparison';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Smart Contract Comparison Tool
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Advanced AI-powered contract analysis with differential highlighting, risk assessment, 
            and plain-English explanations for legal professionals
          </p>
        </header>
        <DocumentComparison />
      </div>
    </div>
  );
};

export default Index;
