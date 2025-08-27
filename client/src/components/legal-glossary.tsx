import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Book, ChevronDown, ChevronUp } from "lucide-react";

interface LegalTerm {
  term: string;
  definition: string;
  context: string;
}

interface LegalGlossaryProps {
  terms: LegalTerm[];
}

export default function LegalGlossary({ terms }: LegalGlossaryProps) {
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleTerm = (term: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(term)) {
      newExpanded.delete(term);
    } else {
      newExpanded.add(term);
    }
    setExpandedTerms(newExpanded);
  };

  const displayTerms = showAll ? terms : terms.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Book className="text-primary mr-2 h-5 w-5" />
          Legal Terms Explained
        </CardTitle>
      </CardHeader>
      <CardContent>
        {terms.length === 0 ? (
          <div className="text-center py-4">
            <Book className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No legal terms identified in this document.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayTerms.map((term) => (
              <Collapsible
                key={term.term}
                open={expandedTerms.has(term.term)}
                onOpenChange={() => toggleTerm(term.term)}
              >
                <CollapsibleTrigger asChild>
                  <div 
                    className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                    data-testid={`term-${term.term.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-foreground text-sm">{term.term}</h5>
                      {expandedTerms.has(term.term) ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-left">
                      {term.definition.slice(0, 80)}
                      {term.definition.length > 80 ? "..." : ""}
                    </p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 p-3 bg-background border rounded-lg">
                    <div className="space-y-2">
                      <div>
                        <h6 className="font-medium text-foreground text-xs mb-1">Definition:</h6>
                        <p className="text-xs text-muted-foreground">{term.definition}</p>
                      </div>
                      <div>
                        <h6 className="font-medium text-foreground text-xs mb-1">Indian Law Context:</h6>
                        <p className="text-xs text-muted-foreground">{term.context}</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
            
            {terms.length > 5 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="w-full text-primary hover:underline"
                data-testid="button-toggle-terms"
              >
                {showAll ? "Show Less" : `View All Terms (${terms.length} found)`}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
