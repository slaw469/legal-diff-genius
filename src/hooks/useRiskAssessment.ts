
import { useState, useEffect } from 'react';

interface RiskAnalysis {
  document1: {
    overallRisk: string;
    riskScore: number;
    riskFactors: Array<{
      category: string;
      level: string;
      score: number;
      description: string;
    }>;
  };
  document2: {
    overallRisk: string;
    riskScore: number;
    riskFactors: Array<{
      category: string;
      level: string;
      score: number;
      description: string;
    }>;
  };
  comparison: {
    riskDifference: number;
    recommendations: string[];
  };
}

export const useRiskAssessment = (
  document1: string | null,
  document2: string | null,
  comparisonResults: any
) => {
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!document1 || !document2) {
      setRiskAnalysis(null);
      return;
    }

    setIsLoading(true);

    // Simulate risk analysis processing
    const timer = setTimeout(() => {
      const mockRiskAnalysis: RiskAnalysis = {
        document1: {
          overallRisk: 'Medium',
          riskScore: 65,
          riskFactors: [
            {
              category: 'Liability',
              level: 'High',
              score: 85,
              description: 'Broad liability exposure without adequate caps'
            },
            {
              category: 'Termination',
              level: 'Medium',
              score: 60,
              description: 'Short notice periods may create operational risks'
            },
            {
              category: 'Payment Terms',
              level: 'Low',
              score: 25,
              description: 'Standard payment protection clauses present'
            }
          ]
        },
        document2: {
          overallRisk: 'Low',
          riskScore: 35,
          riskFactors: [
            {
              category: 'Liability',
              level: 'Medium',
              score: 45,
              description: 'Limited liability scope with appropriate caps'
            },
            {
              category: 'Termination',
              level: 'Low',
              score: 30,
              description: 'Adequate notice periods for operational planning'
            },
            {
              category: 'Payment Terms',
              level: 'Low',
              score: 20,
              description: 'Strong payment protection with remedies'
            }
          ]
        },
        comparison: {
          riskDifference: 30,
          recommendations: [
            'Consider adopting liability caps from Document B',
            'Standardize termination notice periods',
            'Add force majeure clauses to both documents',
            'Align dispute resolution procedures'
          ]
        }
      };

      setRiskAnalysis(mockRiskAnalysis);
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [document1, document2, comparisonResults]);

  return {
    riskAnalysis,
    isLoading,
  };
};
