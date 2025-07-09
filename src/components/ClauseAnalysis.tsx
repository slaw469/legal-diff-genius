
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Lightbulb,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquare
} from 'lucide-react';
import { useClauseAnalysis } from '@/hooks/useClauseAnalysis';

interface ClauseAnalysisProps {
  document1: string | null;
  document2: string | null;
  comparisonResults: any;
}

export const ClauseAnalysis: React.FC<ClauseAnalysisProps> = ({
  document1,
  document2,
  comparisonResults,
}) => {
  const { clauseAnalysis, isLoading } = useClauseAnalysis(document1, document2, comparisonResults);
  const [expandedClauses, setExpandedClauses] = useState<Set<string>>(new Set());

  const toggleClause = (clauseId: string) => {
    const newExpanded = new Set(expandedClauses);
    if (newExpanded.has(clauseId)) {
      newExpanded.delete(clauseId);
    } else {
      newExpanded.add(clauseId);
    }
    setExpandedClauses(newExpanded);
  };

  if (!document1 || !document2) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Clause analysis requires both documents to be uploaded.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Analyzing contract clauses and generating explanations...</p>
        </CardContent>
      </Card>
    );
  }

  const getClauseStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'missing': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'different': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <FileText className="h-4 w-4 text-slate-600" />;
    }
  };

  const getClauseStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-50 text-green-700';
      case 'missing': return 'bg-red-50 text-red-700';
      case 'different': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Clause Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">12</div>
            <div className="text-sm text-green-600">Matching Clauses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-700">5</div>
            <div className="text-sm text-yellow-600">Different Clauses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">3</div>
            <div className="text-sm text-red-600">Missing Clauses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Lightbulb className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">7</div>
            <div className="text-sm text-blue-600">Suggestions</div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Issues Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          3 standard clauses are missing from Document A, including force majeure and dispute resolution provisions. 
          Consider adding these to reduce legal risk.
        </AlertDescription>
      </Alert>

      {/* Clause-by-Clause Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detailed Clause Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 'liability',
                name: 'Liability & Indemnification',
                status: 'different',
                docA: 'Present with broad scope',
                docB: 'Present with limited scope',
                explanation: 'Document A includes comprehensive liability coverage while Document B limits liability to direct damages only.',
                plainEnglish: 'Document A makes each party responsible for a wider range of problems they might cause, while Document B only covers direct, obvious damages.',
                suggestion: 'Consider aligning liability scope. Document B\'s approach may be preferred to limit exposure.',
                riskLevel: 'High'
              },
              {
                id: 'termination',
                name: 'Termination Clauses',
                status: 'different',
                docA: '30-day notice required',
                docB: '60-day notice required',
                explanation: 'The notice period for contract termination varies between documents.',
                plainEnglish: 'Document A allows ending the contract with 1 month notice, while Document B requires 2 months notice.',
                suggestion: 'Standardize termination notice to 45 days for balanced protection.',
                riskLevel: 'Medium'
              },
              {
                id: 'force-majeure',
                name: 'Force Majeure',
                status: 'missing',
                docA: 'Not present',
                docB: 'Comprehensive clause',
                explanation: 'Document A lacks force majeure provisions that protect against unforeseeable events.',
                plainEnglish: 'Document A doesn\'t protect either party when impossible situations (like natural disasters) prevent fulfilling the contract.',
                suggestion: 'Add force majeure clause to Document A similar to Document B.',
                riskLevel: 'High'
              },
              {
                id: 'intellectual-property',
                name: 'Intellectual Property Rights',
                status: 'present',
                docA: 'Standard IP retention',
                docB: 'Standard IP retention',
                explanation: 'Both documents contain similar intellectual property protection clauses.',
                plainEnglish: 'Both contracts properly protect each party\'s ownership of their ideas, inventions, and creative work.',
                suggestion: 'IP clauses are well-aligned and provide adequate protection.',
                riskLevel: 'Low'
              },
              {
                id: 'confidentiality',
                name: 'Confidentiality & Non-Disclosure',
                status: 'present',
                docA: '5-year confidentiality term',
                docB: '5-year confidentiality term',
                explanation: 'Both documents include matching confidentiality provisions with identical terms.',
                plainEnglish: 'Both contracts require keeping shared information secret for 5 years after the contract ends.',
                suggestion: 'Confidentiality terms are appropriate and well-matched.',
                riskLevel: 'Low'
              },
              {
                id: 'payment',
                name: 'Payment Terms',
                status: 'different',
                docA: 'Net 30 payment terms',
                docB: 'Net 15 payment terms',
                explanation: 'Payment timeframes differ, affecting cash flow implications.',
                plainEnglish: 'Document A allows 30 days to pay invoices, while Document B requires payment within 15 days.',
                suggestion: 'Consider standardizing to Net 30 for better cash flow management.',
                riskLevel: 'Low'
              }
            ].map((clause) => (
              <Collapsible
                key={clause.id}
                open={expandedClauses.has(clause.id)}
                onOpenChange={() => toggleClause(clause.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      {getClauseStatusIcon(clause.status)}
                      <span className="font-medium">{clause.name}</span>
                      <Badge className={getClauseStatusColor(clause.status)}>
                        {clause.status}
                      </Badge>
                      <Badge variant="outline" className={
                        clause.riskLevel === 'High' ? 'text-red-700 bg-red-50' :
                        clause.riskLevel === 'Medium' ? 'text-yellow-700 bg-yellow-50' :
                        'text-green-700 bg-green-50'
                      }>
                        {clause.riskLevel} Risk
                      </Badge>
                    </div>
                    {expandedClauses.has(clause.id) ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="space-y-4 bg-slate-50 p-4 rounded-lg mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-slate-700 mb-2">Document A</h4>
                        <p className="text-sm text-slate-600">{clause.docA}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-700 mb-2">Document B</h4>
                        <p className="text-sm text-slate-600">{clause.docB}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm text-blue-800 mb-1">Legal Analysis</h4>
                          <p className="text-sm text-slate-700">{clause.explanation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm text-green-800 mb-1">Plain English</h4>
                          <p className="text-sm text-slate-700">{clause.plainEnglish}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm text-yellow-800 mb-1">Recommendation</h4>
                          <p className="text-sm text-slate-700">{clause.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Missing Clauses Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <XCircle className="h-5 w-5" />
            Missing Standard Clauses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: 'Force Majeure',
                description: 'Protects parties from liability due to extraordinary circumstances beyond their control',
                recommendation: 'Add comprehensive force majeure clause to address pandemics, natural disasters, and government actions'
              },
              {
                name: 'Dispute Resolution',
                description: 'Establishes process for resolving disagreements between parties',
                recommendation: 'Include mediation and arbitration procedures to avoid costly litigation'
              },
              {
                name: 'Data Protection & Privacy',
                description: 'Addresses handling of personal and sensitive data in compliance with regulations',
                recommendation: 'Add GDPR/CCPA compliant data protection clauses if personal data is involved'
              }
            ].map((missing, index) => (
              <div key={index} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <h4 className="font-medium text-red-800">{missing.name}</h4>
                </div>
                <p className="text-sm text-red-700 mb-2">{missing.description}</p>
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-600">{missing.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
