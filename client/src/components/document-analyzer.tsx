import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import FileUpload from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface DocumentAnalyzerProps {
  onAnalysisComplete: (documentId: string) => void;
}

export default function DocumentAnalyzer({ onAnalysisComplete }: DocumentAnalyzerProps) {
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('document', file);

      const response = await apiRequest('POST', '/api/documents/analyze', formData);
      return response.json();
    },
    onSuccess: (data) => {
      // Clear any existing analysis cache to prevent showing stale data
      queryClient.removeQueries({ queryKey: ["/api/documents"] });
      
      toast({
        title: "Analysis Complete",
        description: `Your ${data.document.filename} has been analyzed successfully.`,
      });
      onAnalysisComplete(data.document.id);
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Failed to analyze document. Please try again.";
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (file: File) => {
    setError("");
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, DOC, DOCX, and text files are supported.");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return;
    }

    analyzeMutation.mutate(file);
  };

  return (
    <FileUpload
      onFileSelect={handleFileSelect}
      isUploading={analyzeMutation.isPending}
      error={error}
      data-testid="document-analyzer"
    />
  );
}
