import { useState } from "react";
import { useLocation } from "wouter";
import DocumentAnalyzer from "@/components/document-analyzer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Upload, Shield, MessageCircle, FileText, Smartphone, IndianRupee } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const onAnalysisComplete = (documentId: string) => {
    setLocation(`/analysis/${documentId}`);
  };

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
                <h1 className="text-xl font-bold text-foreground" data-testid="app-title">LegalEase AI</h1>
                <p className="text-sm text-muted-foreground">Legal Document Analyzer</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#examples" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a>
              <a href="#support" className="text-muted-foreground hover:text-foreground transition-colors">Support</a>
              <Button variant="default" data-testid="button-signin">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Understand Legal Documents
              <span className="text-primary block">In Plain English</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI-powered legal document analyzer designed for Indian communities. Get instant explanations, 
              risk assessments, and legal guidance in simple language.
            </p>
            
            {/* Document Analyzer Component */}
            <div className="max-w-2xl mx-auto mb-12">
              <DocumentAnalyzer onAnalysisComplete={onAnalysisComplete} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">How LegalEase AI Helps You</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for Indian legal documents with AI-powered insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Plain English Explanations</h4>
                <p className="text-muted-foreground">
                  Complex legal jargon translated into simple, understandable language 
                  tailored for Indian legal context.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Risk Detection</h4>
                <p className="text-muted-foreground">
                  Automatically identify unfair clauses, missing protections, and 
                  potential legal issues specific to Indian law.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Interactive Q&A</h4>
                <p className="text-muted-foreground">
                  Ask questions about your document and get instant answers 
                  based on Indian legal precedents and regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Document Types</h4>
                <p className="text-muted-foreground">
                  Supports rental agreements, employment contracts, property documents, 
                  and other common legal documents in India.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Mobile Accessible</h4>
                <p className="text-muted-foreground">
                  Fully responsive design works perfectly on smartphones, 
                  making legal help accessible anywhere, anytime.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <IndianRupee className="text-primary h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Affordable Access</h4>
                <p className="text-muted-foreground">
                  Free tier available with premium features at prices 
                  accessible to low-income communities across India.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-muted/30" id="examples">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Real-World Examples</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how LegalEase AI helps with common Indian legal documents
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <FileText className="h-16 w-16 text-accent" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium text-accent-foreground">Rental Agreement</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Mumbai Rental Analysis</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Upload rental agreement → AI identifies unfair security deposit clause → 
                  Explains Maharashtra Rent Control Act limits → Provides negotiation template
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>2 risks found</span>
                  <span>3 min analysis</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                <FileText className="h-16 w-16 text-green-600" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">Employment Contract</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">IT Job Contract Review</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Upload employment contract → AI highlights non-compete issues → 
                  Explains Indian labor law protections → Risk assessment with recommendations
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>1 high risk found</span>
                  <span>2 min analysis</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                <FileText className="h-16 w-16 text-blue-600" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700">Property Document</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Property Sale Deed Check</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Upload sale deed → AI verifies document completeness → 
                  Explains stamp duty implications → Identifies missing legal clauses
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Document verified</span>
                  <span>4 min analysis</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" data-testid="button-try-now">
              Try Your Document Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12" id="support">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Scale className="text-primary-foreground h-4 w-4" />
                </div>
                <span className="font-bold text-foreground">LegalEase AI</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Making legal documents accessible and understandable for everyone in India.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-4">Features</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Document Analysis</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Risk Detection</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Legal Q&A</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Plain English</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-4">Legal Resources</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Indian Contract Act</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Rent Control Laws</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Labor Laws</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Property Laws</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          

        </div>
      </footer>
    </div>
  );
}
