'use client';

import { useState } from 'react';
import { projects as allProjects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/project-card';
import ProjectSpotlight from '@/components/project-spotlight';
import type { AnalyzeProjectsOutput } from '@/ai/flows/ai-project-spotlight';

type Filter = 'All' | 'AI' | 'n8n' | 'Web';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All');
  const [spotlightData, setSpotlightData] = useState<AnalyzeProjectsOutput | null>(null);
  const [spotlightTopic, setSpotlightTopic] = useState<string | null>(null);

  const handleSpotlightUpdate = (data: AnalyzeProjectsOutput) => {
    setSpotlightData(data);
    setSpotlightTopic(null); // Reset topic selection
    setFilter('All'); // Reset category filter
  };

  const handleTopicSelect = (topic: string) => {
    setSpotlightTopic(topic);
    setFilter('All');
  };
  
  const handleCategorySelect = (f: Filter) => {
    setFilter(f);
    setSpotlightTopic(null); // Deselect any AI topic when using manual categories
  };

  const filteredProjects = () => {
    if (spotlightTopic && spotlightData) {
      const projectDescriptions = spotlightData.groupedProjects[spotlightTopic] || [];
      return allProjects.filter(p => projectDescriptions.includes(p.description));
    }
    if (spotlightData && !spotlightTopic) {
        // Show all projects related to the AI analysis
        const allSpotlightedDescriptions = Object.values(spotlightData.groupedProjects).flat();
        return allProjects.filter(p => allSpotlightedDescriptions.includes(p.description));
    }
    if (filter === 'All') return allProjects;
    return allProjects.filter((project) => project.category === filter);
  };
  
  const projectsToDisplay = filteredProjects();

  return (
    <section id="projects" className="w-full py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">A selection of my work.</p>
        </div>
        
        <ProjectSpotlight onAnalysisComplete={handleSpotlightUpdate} />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
            {!spotlightData ? (
                <>
                    {(['All', 'AI', 'n8n', 'Web'] as Filter[]).map((f) => (
                        <Button key={f} variant={filter === f ? 'default' : 'outline'} onClick={() => handleCategorySelect(f)}>
                            {f}
                        </Button>
                    ))}
                </>
            ) : (
                 <div className="flex flex-wrap justify-center gap-2">
                    <Button variant={!spotlightTopic ? 'default' : 'outline'} onClick={() => { setSpotlightTopic(null); }}>All Spotlighted</Button>
                    {spotlightData.commonTopics.map((topic) => (
                        <Button key={topic} variant={spotlightTopic === topic ? 'default' : 'outline'} onClick={() => handleTopicSelect(topic)}>
                            {topic}
                        </Button>
                    ))}
                 </div>
            )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsToDisplay.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
