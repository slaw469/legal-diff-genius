
import { useState, useEffect, useMemo } from 'react';

interface Difference {
  type: 'addition' | 'deletion' | 'modification';
  start: number;
  end: number;
  content: string;
  context?: string;
}

interface ComparisonResult {
  differences: Difference[];
  summary: {
    additions: number;
    deletions: number;
    modifications: number;
    totalChanges: number;
  };
}

export const useDocumentComparison = (document1: string | null, document2: string | null) => {
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDifference, setCurrentDifference] = useState(0);

  const differences = useMemo(() => comparison?.differences || [], [comparison]);

  useEffect(() => {
    if (!document1 || !document2) {
      setComparison(null);
      return;
    }

    setIsLoading(true);
    
    // Simulate document comparison processing
    const timer = setTimeout(() => {
      const mockDifferences: Difference[] = generateMockDifferences(document1, document2);
      
      const result: ComparisonResult = {
        differences: mockDifferences,
        summary: {
          additions: mockDifferences.filter(d => d.type === 'addition').length,
          deletions: mockDifferences.filter(d => d.type === 'deletion').length,
          modifications: mockDifferences.filter(d => d.type === 'modification').length,
          totalChanges: mockDifferences.length,
        }
      };

      setComparison(result);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [document1, document2]);

  const navigateToNext = () => {
    if (differences.length > 0) {
      setCurrentDifference((prev) => (prev + 1) % differences.length);
    }
  };

  const navigateToPrevious = () => {
    if (differences.length > 0) {
      setCurrentDifference((prev) => (prev - 1 + differences.length) % differences.length);
    }
  };

  return {
    comparison,
    isLoading,
    differences,
    currentDifference,
    navigateToNext,
    navigateToPrevious,
  };
};

function generateMockDifferences(doc1: string, doc2: string): Difference[] {
  // This is a simplified mock implementation
  // In a real implementation, you would use advanced diff algorithms like Myers' algorithm
  const differences: Difference[] = [];
  
  // Generate some mock differences based on document content
  const words1 = doc1.split(' ');
  const words2 = doc2.split(' ');
  
  let position = 0;
  
  // Mock some differences for demonstration
  if (words1.length !== words2.length) {
    differences.push({
      type: 'modification',
      start: Math.floor(doc1.length * 0.1),
      end: Math.floor(doc1.length * 0.15),
      content: doc1.substring(Math.floor(doc1.length * 0.1), Math.floor(doc1.length * 0.15)),
      context: 'Document length difference detected'
    });
  }

  // Add more mock differences
  for (let i = 0; i < Math.min(5, Math.floor(doc1.length / 100)); i++) {
    const start = Math.floor(Math.random() * (doc1.length - 50));
    const end = start + Math.floor(Math.random() * 30) + 10;
    
    differences.push({
      type: Math.random() > 0.5 ? 'addition' : 'deletion',
      start,
      end,
      content: doc1.substring(start, end),
      context: `Difference found at position ${start}`
    });
  }

  return differences.sort((a, b) => a.start - b.start);
}
