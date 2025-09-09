'use server';

/**
 * @fileOverview An AI agent that analyzes project descriptions to find common topics,
 * group related projects, and highlight them for potential clients.
 *
 * - analyzeProjects - A function that handles the project analysis process.
 * - AnalyzeProjectsInput - The input type for the analyzeProjects function.
 * - AnalyzeProjectsOutput - The return type for the analyzeProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeProjectsInputSchema = z.object({
  projectDescriptions: z
    .array(z.string())
    .describe('An array of project descriptions to analyze.'),
});
export type AnalyzeProjectsInput = z.infer<typeof AnalyzeProjectsInputSchema>;

const AnalyzeProjectsOutputSchema = z.object({
  commonTopics: z
    .array(z.string())
    .describe('An array of common topics found in the project descriptions.'),
  groupedProjects: z
    .record(z.array(z.string()))
    .describe(
      'A record where keys are common topics and values are arrays of project descriptions related to that topic.'
    ),
  insights: z
    .string()
    .describe(
      'A summary of insights gained from analyzing the project descriptions, highlighting key areas of expertise.'
    ),
});
export type AnalyzeProjectsOutput = z.infer<typeof AnalyzeProjectsOutputSchema>;

export async function analyzeProjects(input: AnalyzeProjectsInput): Promise<AnalyzeProjectsOutput> {
  return analyzeProjectsFlow(input);
}

const analyzeProjectsPrompt = ai.definePrompt({
  name: 'analyzeProjectsPrompt',
  input: {schema: AnalyzeProjectsInputSchema},
  output: {schema: AnalyzeProjectsOutputSchema},
  prompt: `You are an AI project analysis expert.

You will analyze the provided project descriptions to identify common topics, group related projects under these topics, and provide a summary of insights highlighting the developer's expertise.

Project Descriptions:
{{#each projectDescriptions}}- {{{this}}}\n{{/each}}

Based on the project descriptions, identify common topics and group the projects accordingly.  Provide insights into the developer's expertise based on these projects.

Ensure that the output is structured as follows:

{
  "commonTopics": ["topic1", "topic2", ...],
  "groupedProjects": {
    "topic1": ["projectDescription1", "projectDescription2", ...],
    "topic2": ["projectDescription3", "projectDescription4", ...],
    ...
  },
  "insights": "A summary of the key areas of expertise demonstrated by the projects."
}
`, // Ensure valid JSON is returned
});

const analyzeProjectsFlow = ai.defineFlow(
  {
    name: 'analyzeProjectsFlow',
    inputSchema: AnalyzeProjectsInputSchema,
    outputSchema: AnalyzeProjectsOutputSchema,
  },
  async input => {
    const {output} = await analyzeProjectsPrompt(input);
    return output!;
  }
);
