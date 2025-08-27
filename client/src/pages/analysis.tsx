import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, CheckCircle, Download, Printer, Share, Scale } from "lucide-react";
import RiskAssessment from "@/components/risk-assessment";
import LegalQA from "@/components/legal-qa";
import LegalGlossary from "@/components/legal-glossary";
import { useToast } from "@/hooks/use-toast";

interface AnalysisData {
  document: {
    id: string;
    filename: string;
    type?: string;
  };
  analysis: {
    id: string;
    summary: string;
    risks: Array<{
      id: string;
      type: "high" | "medium" | "low";
      title: string;
      description: string;
      section?: string;
      recommendation: string;
    }>;
    legalTerms: Array<{
      term: string;
      definition: string;
      context: string;
    }>;
    keyProvisions?: string[];
  };
}

export default function Analysis() {
  const { documentId } = useParams<{ documentId: string }>();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery<AnalysisData>({
    queryKey: ["/api/documents", documentId, "analysis"],
    enabled: !!documentId,
  });

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your analysis report is being prepared for download.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Legal Document Analysis",
        text: "Check out my document analysis from LegalEase AI",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Analysis link copied to clipboard.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h1 className="text-2xl font-bold text-foreground">Analysis Not Found</h1>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The document analysis could not be found. Please try uploading your document again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { document, analysis } = data;
  const riskCounts = analysis.risks.reduce(
    (acc, risk) => {
      acc[risk.type]++;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Scale className="text-primary-foreground h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LegalEase AI</h1>
                <p className="text-sm text-muted-foreground">Legal Document Analyzer</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.href = "/"} data-testid="button-back-home">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analysis Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground" data-testid="text-analysis-title">
              Document Analysis Complete
            </h2>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Analysis Complete</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Analysis of: <span className="font-medium text-foreground" data-testid="text-document-name">{document.filename}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Assessment */}
            <RiskAssessment risks={analysis.risks} />

            {/* Document Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="text-primary mr-2 h-5 w-5" />
                  Document Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p data-testid="text-document-summary">{analysis.summary}</p>
                  
                  {analysis.keyProvisions && analysis.keyProvisions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-foreground font-medium mb-2">Key Provisions:</h4>
                      <ul className="space-y-2">
                        {analysis.keyProvisions.map((provision, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="text-green-500 mt-1 h-4 w-4 flex-shrink-0" />
                            <span>{provision}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Q&A Section */}
            <LegalQA documentId={document.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">High Risk</span>
                    <span className="text-sm font-medium text-destructive" data-testid="text-high-risk-count">
                      {riskCounts.high}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Medium Risk</span>
                    <span className="text-sm font-medium text-accent-foreground" data-testid="text-medium-risk-count">
                      {riskCounts.medium}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Low Risk</span>
                    <span className="text-sm font-medium text-green-600" data-testid="text-low-risk-count">
                      {riskCounts.low}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Terms Glossary */}
            <LegalGlossary terms={analysis.legalTerms} />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={handleDownload} 
                    className="w-full justify-start" 
                    variant="ghost"
                    data-testid="button-download"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Summary
                  </Button>
                  <Button 
                    onClick={handlePrint} 
                    className="w-full justify-start" 
                    variant="ghost"
                    data-testid="button-print"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Printer Report
                  </Button>
                  <Button 
                    onClick={handleShare} 
                    className="w-full justify-start" 
                    variant="ghost"
                    data-testid="button-share"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Legal Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-primary hover:underline">
                    Maharashtra Rent Control Act Guide
                  </a>
                  <a href="#" className="block text-sm text-primary hover:underline">
                    Tenant Rights in India
                  </a>
                  <a href="#" className="block text-sm text-primary hover:underline">
                    Security Deposit Laws by State
                  </a>
                  <a href="#" className="block text-sm text-primary hover:underline">
                    Sample Negotiation Templates
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
