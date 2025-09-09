export type Project = {
  title: string;
  description: string;
  category: 'AI' | 'n8n' | 'Web';
  image: string;
  tags: string[];
  link?: string;
  dataAiHint?: string;
};

export const projects: Project[] = [
  {
    title: 'AI-Powered Customer Support Chatbot',
    description:
      'Developed a deep learning-based chatbot for a major e-commerce platform, reducing response times by 80% and improving customer satisfaction using advanced NLP techniques.',
    category: 'AI',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'robot analytics',
    tags: ['Python', 'TensorFlow', 'NLP', 'React', 'Kubernetes'],
    link: '#',
  },
  {
    title: 'N8N Workflow for Sales Automation',
    description:
      'Designed and implemented an n8n workflow that automates the entire sales lead qualification process, integrating with Salesforce, Gmail, and Slack to streamline operations.',
    category: 'n8n',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'gears automation',
    tags: ['n8n', 'Salesforce', 'API Integration', 'Node.js'],
    link: '#',
  },
  {
    title: 'Scalable E-commerce Web Platform',
    description:
      'Architected and led the development of a high-traffic e-commerce website with a microservices backend, ensuring 99.99% uptime and handling thousands of concurrent users.',
    category: 'Web',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'web shopping',
    tags: ['Next.js', 'TypeScript', 'Docker', 'PostgreSQL', 'AWS'],
    link: '#',
  },
  {
    title: 'Predictive Maintenance AI for Manufacturing',
    description:
      'Created a machine learning model to predict equipment failures in a manufacturing plant, saving millions in potential downtime. Deployed as a scalable API service.',
    category: 'AI',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'factory machine',
    tags: ['Scikit-learn', 'Pandas', 'Flask', 'Docker'],
    link: '#',
  },
  {
    title: 'Automated Content Syndication with N8N',
    description:
      'Built a complex n8n automation to syndicate blog content across multiple social media platforms, including scheduling, image generation, and performance tracking.',
    category: 'n8n',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'social media',
    tags: ['n8n', 'REST APIs', 'Webhooks', 'Airtable'],
    link: '#',
  },
  {
    title: 'Real-time Data Visualization Dashboard',
    description:
      'Developed a web-based dashboard for visualizing real-time IoT sensor data, featuring interactive charts and alerts. Built with React and WebSockets for live updates.',
    category: 'Web',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'dashboard charts',
    tags: ['React', 'D3.js', 'WebSockets', 'Node.js', 'InfluxDB'],
    link: '#',
  },
];

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
