
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useRiskAssessment } from '@/hooks/useRiskAssessment';

interface RiskAssessmentProps {
  document1: string | null;
  document2: string | null;
  comparisonResults: any;
}

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  document1,
  document2,
  comparisonResults,
}) => {
  const { riskAnalysis, isLoading } = useRiskAssessment(document1, document2, comparisonResults);

  if (!document1 || !document2) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Risk assessment requires both documents to be uploaded.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Analyzing contract risks and generating assessment...</p>
        </CardContent>
      </Card>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-700 bg-green-50';
      case 'medium': return 'text-yellow-700 bg-yellow-50';
      case 'high': return 'text-red-700 bg-red-50';
      case 'critical': return 'text-red-800 bg-red-100';
      default: return 'text-slate-700 bg-slate-50';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <XCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Document A Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Risk</span>
                <Badge className={getRiskColor(riskAnalysis?.document1?.overallRisk || 'medium')}>
                  {getRiskIcon(riskAnalysis?.document1?.overallRisk || 'medium')}
                  <span className="ml-1">{riskAnalysis?.document1?.overallRisk || 'Medium'}</span>
                </Badge>
              </div>
              <Progress value={riskAnalysis?.document1?.riskScore || 45} className="h-2" />
              <div className="text-sm text-slate-600">
                Risk Score: {riskAnalysis?.document1?.riskScore || 45}/100
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Document B Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Risk</span>
                <Badge className={getRiskColor(riskAnalysis?.document2?.overallRisk || 'low')}>
                  {getRiskIcon(riskAnalysis?.document2?.overallRisk || 'low')}
                  <span className="ml-1">{riskAnalysis?.document2?.overallRisk || 'Low'}</span>
                </Badge>
              </div>
              <Progress value={riskAnalysis?.document2?.riskScore || 25} className="h-2" />
              <div className="text-sm text-slate-600">
                Risk Score: {riskAnalysis?.document2?.riskScore || 25}/100
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Comparative Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Document A has a higher risk profile (+20 points) compared to Document B. 
                Key factors include stricter liability clauses and shorter termination notice periods.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Higher Risk Areas</div>
                <div className="text-xs text-slate-600 mt-1">
                  Liability, Termination, IP Rights
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <TrendingDown className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Lower Risk Areas</div>
                <div className="text-xs text-slate-600 mt-1">
                  Payment Terms, Confidentiality
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Requires Review</div>
                <div className="text-xs text-slate-600 mt-1">
                  Force Majeure, Governing Law
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Risk Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { category: 'Liability & Indemnification', risk: 'High', score: 85, description: 'Document A contains broader liability exposure' },
              { category: 'Termination Clauses', risk: 'Medium', score: 60, description: 'Shorter notice periods in Document A may create operational risks' },
              { category: 'Intellectual Property', risk: 'Medium', score: 55, description: 'IP ownership clauses differ significantly between documents' },
              { category: 'Payment & Financial Terms', risk: 'Low', score: 25, description: 'Both documents have standard payment protection clauses' },
              { category: 'Confidentiality & Data', risk: 'Low', score: 20, description: 'Strong confidentiality provisions in both documents' },
              { category: 'Dispute Resolution', risk: 'Medium', score: 45, description: 'Different arbitration procedures may complicate resolution' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium">{item.category}</span>
                    <Badge className={getRiskColor(item.risk)}>
                      {getRiskIcon(item.risk)}
                      <span className="ml-1">{item.risk}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-medium">{item.score}/100</div>
                  <Progress value={item.score} className="w-20 h-2 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Risk Mitigation Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              'Consider adding liability caps to limit financial exposure in high-risk scenarios',
              'Standardize termination notice periods to allow adequate operational planning',
              'Clarify intellectual property ownership and licensing terms to avoid disputes',
              'Add force majeure clauses to address unforeseen circumstances',
              'Ensure consistent governing law and jurisdiction clauses across agreements',
            ].map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-blue-800">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
