
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useDocumentComparison } from '@/hooks/useDocumentComparison';
import { DifferenceHighlight } from './DifferenceHighlight';

interface ComparisonViewProps {
  document1: string | null;
  document2: string | null;
  onComparisonComplete: (results: any) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  document1,
  document2,
  onComparisonComplete,
}) => {
  const { comparison, isLoading, differences, currentDifference, navigateToNext, navigateToPrevious } = 
    useDocumentComparison(document1, document2);

  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  const [filterType, setFilterType] = useState<'all' | 'additions' | 'deletions' | 'modifications'>('all');

  useEffect(() => {
    if (comparison) {
      onComparisonComplete(comparison);
    }
  }, [comparison, onComparisonComplete]);

  if (!document1 || !document2) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-slate-600">Please upload both documents to begin comparison.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Analyzing documents and computing differences...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comparison Controls */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Document Comparison
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {differences?.filter(d => d.type === 'addition').length || 0} Additions
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  <XCircle className="h-3 w-3 mr-1" />
                  {differences?.filter(d => d.type === 'deletion').length || 0} Deletions
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {differences?.filter(d => d.type === 'modification').length || 0} Changes
                </Badge>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToPrevious}
                  disabled={!differences || differences.length === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-slate-600 min-w-[80px] text-center">
                  {currentDifference + 1} of {differences?.length || 0}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToNext}
                  disabled={!differences || differences.length === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'side-by-side' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('side-by-side')}
              >
                Side by Side
              </Button>
              <Button
                variant={viewMode === 'unified' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('unified')}
              >
                Unified View
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-600" />
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Changes</option>
                <option value="additions">Additions Only</option>
                <option value="deletions">Deletions Only</option>
                <option value="modifications">Modifications Only</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Comparison Display */}
      <div className={`grid gap-6 ${viewMode === 'side-by-side' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <Card className="h-[600px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Document A</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[540px] p-4">
              <DifferenceHighlight
                text={document1}
                differences={differences || []}
                documentType="document1"
                filterType={filterType}
                currentDifference={currentDifference}
              />
            </ScrollArea>
          </CardContent>
        </Card>

        {viewMode === 'side-by-side' && (
          <Card className="h-[600px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Document B</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[540px] p-4">
                <DifferenceHighlight
                  text={document2}
                  differences={differences || []}
                  documentType="document2"
                  filterType={filterType}
                  currentDifference={currentDifference}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Difference Summary */}
      {differences && differences.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Difference Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {differences.filter(d => d.type === 'addition').length}
                </div>
                <div className="text-sm text-green-600">Additions</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-700">
                  {differences.filter(d => d.type === 'deletion').length}
                </div>
                <div className="text-sm text-red-600">Deletions</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">
                  {differences.filter(d => d.type === 'modification').length}
                </div>
                <div className="text-sm text-yellow-600">Modifications</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
