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
  'Inteligência Artificial e Machine Learning': [
    { name: 'Desenvolvimento com Python', proficiency: 'Expert' },
    { name: 'TensorFlow & Keras', proficiency: 'Advanced' },
    { name: 'PyTorch', proficiency: 'Advanced' },
    { name: 'Scikit-learn', proficiency: 'Expert' },
    { name: 'Processamento de Linguagem Natural (NLP)', proficiency: 'Advanced' },
    { name: 'Visão Computacional', proficiency: 'Intermediate' },
    { name: 'Genkit', proficiency: 'Advanced' },
  ],
  'Desenvolvimento Web Full-Stack': [
    { name: 'TypeScript', proficiency: 'Expert' },
    { name: 'React / Next.js', proficiency: 'Expert' },
    { name: 'Node.js', proficiency: 'Expert' },
    { name: 'Python (Django, Flask)', proficiency: 'Advanced' },
    { name: 'Bancos de Dados (PostgreSQL & MongoDB)', proficiency: 'Advanced' },
    { name: 'GraphQL', proficiency: 'Advanced' },
  ],
  'Automação de Processos (n8n)': [
    { name: 'Criação de Workflows em N8N', proficiency: 'Expert' },
    { name: 'Nós N8N Customizados', proficiency: 'Advanced' },
    { name: 'Integração de APIs', proficiency: 'Expert' },
    { name: 'Auto-hospedagem de N8N', proficiency: 'Advanced' },
  ],
  'DevOps e Implantação': [
    { name: 'Docker & Kubernetes', proficiency: 'Advanced' },
    { name: 'Google Cloud & AWS', proficiency: 'Advanced' },
    { name: 'Git & CI/CD', proficiency: 'Expert' },
    { name: 'Terraform', proficiency: 'Intermediate' },
  ],
};
