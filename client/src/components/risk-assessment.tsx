import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface Risk {
  id: string;
  type: "high" | "medium" | "low";
  title: string;
  description: string;
  section?: string;
  recommendation: string;
}

interface RiskAssessmentProps {
  risks: Risk[];
}

export default function RiskAssessment({ risks }: RiskAssessmentProps) {
  const getRiskIcon = (type: Risk["type"]) => {
    switch (type) {
      case "high":
        return <AlertTriangle className="text-destructive h-5 w-5" />;
      case "medium":
        return <AlertCircle className="text-accent h-5 w-5" />;
      case "low":
        return <Info className="text-blue-500 h-5 w-5" />;
    }
  };

  const getRiskColor = (type: Risk["type"]) => {
    switch (type) {
      case "high":
        return "bg-destructive/10 border-destructive/20";
      case "medium":
        return "bg-accent/10 border-accent/20";
      case "low":
        return "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800";
    }
  };

  const getRiskBadgeVariant = (type: Risk["type"]) => {
    switch (type) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
    }
  };

  const overallRisk = risks.some(r => r.type === "high") ? "High Risk" 
    : risks.some(r => r.type === "medium") ? "Medium Risk" 
    : risks.length > 0 ? "Low Risk" 
    : "No Risks Detected";

  const overallRiskColor = risks.some(r => r.type === "high") ? "bg-destructive/20 text-destructive-foreground" 
    : risks.some(r => r.type === "medium") ? "bg-accent/20 text-accent-foreground" 
    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <AlertTriangle className="text-accent mr-2 h-5 w-5" />
            Risk Assessment
          </CardTitle>
          <Badge className={overallRiskColor} data-testid="badge-overall-risk">
            {overallRisk}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {risks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Major Risks Detected</h3>
            <p className="text-muted-foreground">
              This document appears to follow standard legal practices. However, we recommend consulting 
              with a legal professional for complex matters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {risks.map((risk) => (
              <div
                key={risk.id}
                className={`p-4 rounded-lg border ${getRiskColor(risk.type)}`}
                data-testid={`risk-item-${risk.type}`}
              >
                <div className="flex items-start space-x-3">
                  {getRiskIcon(risk.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-foreground">{risk.title}</h5>
                      <Badge variant={getRiskBadgeVariant(risk.type)}>
                        {risk.type.charAt(0).toUpperCase() + risk.type.slice(1)} Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {risk.description}
                    </p>
                    <div className="bg-background/50 p-3 rounded border">
                      <p className="text-sm font-medium text-foreground mb-1">Recommendation:</p>
                      <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
                    </div>
                    {risk.section && (
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
                        <span>{risk.section}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
