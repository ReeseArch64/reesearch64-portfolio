export type Project = {
  title: string;
  description: string;
  category: 'AI' | 'n8n' | 'Web';
  image: string;
  tags: string[];
  link?: string;
  dataAiHint?: string;
};

export const projects: Project[] = [];

export const skills = {
  'AI & Machine Learning': [
    { name: 'Python', proficiency: 'Expert' },
    { name: 'TensorFlow & Keras', proficiency: 'Advanced' },
    { name: 'PyTorch', proficiency: 'Advanced' },
    { name: 'Scikit-learn', proficiency: 'Expert' },
    { name: 'Natural Language Processing (NLP)', proficiency: 'Advanced' },
    { name: 'Computer Vision', proficiency: 'Intermediate' },
    { name: 'Genkit', proficiency: 'Advanced' },
  ],
  'Web Development': [
    { name: 'TypeScript', proficiency: 'Expert' },
    { name: 'React / Next.js', proficiency: 'Expert' },
    { name: 'Node.js', proficiency: 'Expert' },
    { name: 'Python (Django, Flask)', proficiency: 'Advanced' },
    { name: 'PostgreSQL & MongoDB', proficiency: 'Advanced' },
    { name: 'GraphQL', proficiency: 'Advanced' },
  ],
  'Automation (n8n)': [
    { name: 'N8N Workflow Design', proficiency: 'Expert' },
    { name: 'Custom N8N Nodes', proficiency: 'Advanced' },
    { name: 'API Integration', proficiency: 'Expert' },
    { name: 'Self-hosting N8N', proficiency: 'Advanced' },
  ],
  'Tools & Platforms': [
    { name: 'Docker & Kubernetes', proficiency: 'Advanced' },
    { name: 'Google Cloud & AWS', proficiency: 'Advanced' },
    { name: 'Git & CI/CD', proficiency: 'Expert' },
    { name: 'Terraform', proficiency: 'Intermediate' },
  ],
};
