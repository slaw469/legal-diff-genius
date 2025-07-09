
import React from 'react';

interface Difference {
  type: 'addition' | 'deletion' | 'modification';
  start: number;
  end: number;
  content: string;
  context?: string;
}

interface DifferenceHighlightProps {
  text: string;
  differences: Difference[];
  documentType: 'document1' | 'document2';
  filterType: 'all' | 'additions' | 'deletions' | 'modifications';
  currentDifference: number;
}

export const DifferenceHighlight: React.FC<DifferenceHighlightProps> = ({
  text,
  differences,
  documentType,
  filterType,
  currentDifference,
}) => {
  const getHighlightClass = (diffType: string, isActive: boolean) => {
    const baseClasses = 'px-1 rounded';
    const activeClasses = isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : '';
    
    switch (diffType) {
      case 'addition':
        return `${baseClasses} bg-green-200 text-green-800 ${activeClasses}`;
      case 'deletion':
        return `${baseClasses} bg-red-200 text-red-800 line-through ${activeClasses}`;
      case 'modification':
        return `${baseClasses} bg-yellow-200 text-yellow-800 ${activeClasses}`;
      default:
        return baseClasses;
    }
  };

  const shouldShowDifference = (diffType: string) => {
    if (filterType === 'all') return true;
    return filterType === `${diffType}s`;
  };

  const filteredDifferences = differences.filter(diff => shouldShowDifference(diff.type));
  
  // Sort differences by start position
  const sortedDifferences = [...filteredDifferences].sort((a, b) => a.start - b.start);

  let highlightedText = text;
  let offset = 0;

  sortedDifferences.forEach((diff, index) => {
    const isActive = index === currentDifference;
    const highlightClass = getHighlightClass(diff.type, isActive);
    
    const start = diff.start + offset;
    const end = diff.end + offset;
    
    const before = highlightedText.substring(0, start);
    const content = highlightedText.substring(start, end);
    const after = highlightedText.substring(end);
    
    const highlightedContent = `<span class="${highlightClass}" data-diff-index="${index}">${content}</span>`;
    
    highlightedText = before + highlightedContent + after;
    offset += highlightedContent.length - content.length;
  });

  return (
    <div 
      className="text-sm leading-relaxed whitespace-pre-wrap font-mono"
      dangerouslySetInnerHTML={{ __html: highlightedText }}
    />
  );
};
