import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Send, User, Bot } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface QaInteraction {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface LegalQAProps {
  documentId: string;
}

export default function LegalQA({ documentId }: LegalQAProps) {
  const [question, setQuestion] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: interactions = [], isLoading } = useQuery<QaInteraction[]>({
    queryKey: ["/api/documents", documentId, "questions"],
    enabled: !!documentId,
  });

  const askQuestionMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest('POST', `/api/documents/${documentId}/questions`, {
        question,
      });
      return response.json();
    },
    onSuccess: (newInteraction) => {
      queryClient.setQueryData(
        ["/api/documents", documentId, "questions"],
        (old: QaInteraction[] = []) => [...old, newInteraction]
      );
      setQuestion("");
      toast({
        title: "Question Answered",
        description: "Your question has been answered based on the document content.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Answer Question",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      askQuestionMutation.mutate(question.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="text-primary mr-2 h-5 w-5" />
          Ask Questions About Your Document
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Chat History */}
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto" data-testid="qa-history">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : interactions.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                No questions yet. Ask anything about your document to get started!
              </p>
            </div>
          ) : (
            interactions.map((interaction) => (
              <div key={interaction.id} className="space-y-3">
                {/* User Question */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-lg p-3">
                    <p className="text-sm" data-testid={`question-${interaction.id}`}>
                      {interaction.question}
                    </p>
                  </div>
                </div>
                
                {/* AI Answer */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="text-primary-foreground h-4 w-4" />
                  </div>
                  <div className="flex-1 bg-primary/10 rounded-lg p-3">
                    <p className="text-sm" data-testid={`answer-${interaction.id}`}>
                      {interaction.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Question Input */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your document..."
            disabled={askQuestionMutation.isPending}
            className="flex-1"
            data-testid="input-question"
          />
          <Button 
            type="submit" 
            disabled={askQuestionMutation.isPending || !question.trim()}
            data-testid="button-ask"
          >
            {askQuestionMutation.isPending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
