
import { useState, useEffect } from 'react';

interface ClauseAnalysis {
  identifiedClauses: Array<{
    id: string;
    name: string;
    type: string;
    status: 'present' | 'missing' | 'different';
    document1Content?: string;
    document2Content?: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    plainEnglishExplanation: string;
    legalAnalysis: string;
    suggestion: string;
  }>;
  missingClauses: Array<{
    name: string;
    importance: 'Critical' | 'Important' | 'Recommended';
    description: string;
    recommendation: string;
  }>;
  summary: {
    totalClauses: number;
    matchingClauses: number;
    differentClauses: number;
    missingClauses: number;
  };
}

export const useClauseAnalysis = (
  document1: string | null,
  document2: string | null,
  comparisonResults: any
) => {
  const [clauseAnalysis, setClauseAnalysis] = useState<ClauseAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!document1 || !document2) {
      setClauseAnalysis(null);
      return;
    }

    setIsLoading(true);

    // Simulate clause analysis processing
    const timer = setTimeout(() => {
      const mockAnalysis: ClauseAnalysis = {
        identifiedClauses: [
          {
            id: 'liability',
            name: 'Liability & Indemnification',
            type: 'risk-management',
            status: 'different',
            document1Content: 'Broad liability coverage for all damages',
            document2Content: 'Limited liability to direct damages only',
            riskLevel: 'High',
            plainEnglishExplanation: 'These clauses determine who pays when something goes wrong. Document A makes parties responsible for more types of problems.',
            legalAnalysis: 'Document A exposes parties to broader liability while Document B provides more protection by limiting scope.',
            suggestion: 'Consider adopting Document B\'s limited liability approach to reduce exposure.'
          },
          {
            id: 'termination',
            name: 'Termination Clauses',
            type: 'operational',
            status: 'different',
            document1Content: '30-day termination notice required',
            document2Content: '60-day termination notice required',
            riskLevel: 'Medium',
            plainEnglishExplanation: 'These clauses control how much advance warning you get before the contract ends.',
            legalAnalysis: 'Longer notice periods provide more time for operational adjustments but reduce flexibility.',
            suggestion: 'Consider 45-day notice period as a compromise between flexibility and planning time.'
          },
          {
            id: 'confidentiality',
            name: 'Confidentiality Agreement',
            type: 'protection',
            status: 'present',
            document1Content: '5-year confidentiality obligation',
            document2Content: '5-year confidentiality obligation',
            riskLevel: 'Low',
            plainEnglishExplanation: 'Both contracts require keeping shared information secret for 5 years.',
            legalAnalysis: 'Confidentiality terms are identical and provide appropriate protection.',
            suggestion: 'Current confidentiality terms are well-balanced and adequate.'
          }
        ],
        missingClauses: [
          {
            name: 'Force Majeure',
            importance: 'Critical',
            description: 'Protects parties from liability due to extraordinary circumstances',
            recommendation: 'Add comprehensive force majeure clause covering natural disasters, pandemics, and government actions'
          },
          {
            name: 'Dispute Resolution',
            importance: 'Important',
            description: 'Establishes procedures for resolving contract disagreements',
            recommendation: 'Include mediation and arbitration clauses to avoid expensive litigation'
          },
          {
            name: 'Data Protection',
            importance: 'Important',
            description: 'Addresses privacy and data handling requirements',
            recommendation: 'Add GDPR/CCPA compliant data protection provisions if applicable'
          }
        ],
        summary: {
          totalClauses: 15,
          matchingClauses: 8,
          differentClauses: 4,
          missingClauses: 3
        }
      };

      setClauseAnalysis(mockAnalysis);
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [document1, document2, comparisonResults]);

  return {
    clauseAnalysis,
    isLoading,
  };
};
