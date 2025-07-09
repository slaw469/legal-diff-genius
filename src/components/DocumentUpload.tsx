
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadProps {
  onDocumentUpload: (docType: 'document1' | 'document2', content: string) => void;
  documents: {
    document1: string | null;
    document2: string | null;
  };
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onDocumentUpload,
  documents,
}) => {
  const { toast } = useToast();

  const handleFileUpload = useCallback(
    (docType: 'document1' | 'document2') => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onDocumentUpload(docType, content);
        toast({
          title: "Document uploaded successfully",
          description: `${file.name} has been processed and is ready for comparison.`,
        });
      };
      reader.readAsText(file);
    },
    [onDocumentUpload, toast]
  );

  const handleTextPaste = useCallback(
    (docType: 'document1' | 'document2') => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const content = event.target.value;
      if (content.trim()) {
        onDocumentUpload(docType, content);
      }
    },
    [onDocumentUpload]
  );

  const DocumentCard = ({ 
    title, 
    docType, 
    isUploaded 
  }: { 
    title: string; 
    docType: 'document1' | 'document2'; 
    isUploaded: boolean;
  }) => (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          {isUploaded ? (
            <Check className="h-5 w-5 text-green-600" />
          ) : (
            <FileText className="h-5 w-5 text-slate-600" />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 mb-3">
            Upload a contract file or paste text below
          </p>
          <input
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileUpload(docType)}
            className="hidden"
            id={`file-${docType}`}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById(`file-${docType}`)?.click()}
            className="mb-3"
          >
            Choose File
          </Button>
          <p className="text-xs text-slate-500">
            Supports: TXT, PDF, DOC, DOCX (up to 10MB)
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Or paste document text:
          </label>
          <Textarea
            placeholder="Paste your contract text here..."
            className="min-h-[200px] resize-none"
            onChange={handleTextPaste(docType)}
            value={documents[docType] || ''}
          />
        </div>
        
        {isUploaded && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
            <Check className="h-4 w-4" />
            Document ready for comparison
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DocumentCard
        title="Document A"
        docType="document1"
        isUploaded={!!documents.document1}
      />
      <DocumentCard
        title="Document B"
        docType="document2"
        isUploaded={!!documents.document2}
      />
      
      {documents.document1 && documents.document2 && (
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Check className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">
                  Ready for Analysis
                </h3>
              </div>
              <p className="text-blue-700 mb-4">
                Both documents have been uploaded successfully. Navigate to the Comparison tab to begin analysis.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-blue-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Differential Highlighting
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  Risk Assessment
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Clause Analysis
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
