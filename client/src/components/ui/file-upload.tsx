import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  error?: string;
  className?: string;
}

export default function FileUpload({ onFileSelect, isUploading, error, className }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isUploading,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    noClick: false, // Allow clicking on the drop zone
  });

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <Upload className="mx-auto h-12 w-12 text-primary mb-3" />
          <h3 className="text-2xl font-semibold text-foreground mb-2" data-testid="text-upload-title">
            Upload Your Document
          </h3>
          <p className="text-muted-foreground">Supports PDF, DOC, and text files up to 10MB</p>
        </div>
        
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer",
            isDragActive || dragActive 
              ? "border-primary/50 bg-primary/5" 
              : "border-border hover:border-primary/50",
            isUploading && "opacity-50 cursor-not-allowed",
            error && "border-destructive/50 bg-destructive/5"
          )}
          data-testid="drop-zone"
        >
          <input {...getInputProps()} data-testid="input-file" />
          <div className="text-center">
            {isUploading ? (
              <>
                <div className="animate-pulse">
                  <FileText className="mx-auto h-8 w-8 text-primary mb-3" />
                </div>
                <p className="text-foreground font-medium mb-2">Processing your document...</p>
                <p className="text-sm text-muted-foreground">This may take a few moments</p>
              </>
            ) : (
              <>
                <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <p className="text-foreground font-medium mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-muted-foreground">
                  Rental agreements, employment contracts, property documents
                </p>
              </>
            )}
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive" data-testid="text-error-message">
                  Upload Error
                </p>
                <p className="text-sm text-destructive/80">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            className="flex-1" 
            disabled={isUploading}
            onClick={open}
            data-testid="button-analyze"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Analyzing..." : "Choose Document"}
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1"
            disabled={isUploading}
            onClick={() => {
              // Create a demo file from the sample rental agreement
              const demoContent = `RENTAL AGREEMENT\n\nThis Rental Agreement is made between Suresh Kumar (Landlord) and Priya Sharma (Tenant).\n\nRENTAL TERMS:\n1. RENT: Rs. 25,000 per month\n2. SECURITY DEPOSIT: Rs. 2,50,000 (10 times monthly rent - potentially excessive)\n3. LOCK-IN PERIOD: 11 months (no early termination allowed)\n4. RENT INCREASE: 15% yearly increase (high rate)\n5. TERMINATION: Complete forfeiture of security deposit if terminated early\n6. REGISTRATION: Agreement not registered (may affect legal validity)\n\nThis sample demonstrates various clauses that may need legal review.`;
              
              const file = new File([demoContent], "sample_rental_agreement.txt", {
                type: "text/plain",
              });
              onFileSelect(file);
            }}
            data-testid="button-demo"
          >
            <FileText className="mr-2 h-4 w-4" />
            Try Demo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
