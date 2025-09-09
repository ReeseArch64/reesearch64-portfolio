'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { analyzeProjects, type AnalyzeProjectsOutput } from '@/ai/flows/ai-project-spotlight';
import { projects } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2 } from 'lucide-react';

type ProjectSpotlightProps = {
  onAnalysisComplete: (data: AnalyzeProjectsOutput) => void;
};

export default function ProjectSpotlight({ onAnalysisComplete }: ProjectSpotlightProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<string | null>(null);

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setInsights(null);
    try {
      const projectDescriptions = projects.map((p) => p.description);
      const result = await analyzeProjects({ projectDescriptions });
      onAnalysisComplete(result);
      setInsights(result.insights);
    } catch (e) {
      console.error(e);
      setError('Failed to analyze projects. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-8 flex flex-col items-center gap-4">
      {!insights && (
        <Button onClick={handleAnalysis} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Projects...
            </>
          ) : (
            '✨ Spotlight Projects with AI'
          )}
        </Button>
      )}

      {error && <Alert variant="destructive" className="max-w-3xl"><AlertDescription>{error}</AlertDescription></Alert>}
      
      {insights && (
        <Alert className="max-w-3xl text-left">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle className="font-headline">AI-Powered Insights</AlertTitle>
          <AlertDescription>{insights}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
