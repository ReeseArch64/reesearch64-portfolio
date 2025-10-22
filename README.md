# AI Hub Portfolio

A modern, multilingual portfolio website showcasing expertise in AI, automation, and full-stack web development. Built with Next.js 15, featuring dark mode, internationalization, and AI-powered project analysis.

## 🚀 Features

- **Multilingual Support**: Available in English, Spanish, and Portuguese
- **Dark Mode Theme**: Modern dark UI with electric blue accents
- **AI Integration**: Powered by Google Genkit for intelligent project analysis
- **Responsive Design**: Mobile-first approach with smooth animations
- **Interactive Sections**: Hero, About, Skills, Projects, and Contact
- **Firebase Hosting**: Optimized for Firebase App Hosting
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend & AI
- **Firebase** - Hosting and backend services
- **Google Genkit** - AI model integration
- **Next.js API Routes** - Server-side functionality

### Development Tools
- **Turbopack** - Fast development builds
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/reesearch64/reesearch64-portfolio.git
   cd reesearch64-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 🚀 Deployment

### Firebase App Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

### Other Platforms

The project is compatible with:
- Vercel
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [lang]/           # Internationalized routes
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── layout/          # Layout components
│   ├── sections/        # Page sections
│   ├── ui/              # Reusable UI components
│   └── motion/          # Animation components
├── dictionaries/         # Translation files
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── ai/                  # AI integration
```

## 🌐 Internationalization

The portfolio supports multiple languages:
- **English** (en) - Default
- **Spanish** (es)
- **Portuguese** (pt)

Language files are located in `src/dictionaries/` and can be easily extended.

## 🎨 Customization

### Theme Colors
- **Background**: `#121212` (Dark gray)
- **Primary**: `#7DF9FF` (Electric blue)
- **Accent**: `#003049` (Deep blue)

### Fonts
- **Body**: Inter (Clean, readable)
- **Headlines**: Space Grotesk (Techy, scientific)

### Adding New Sections
1. Create component in `src/components/sections/`
2. Add translations to dictionary files
3. Import and use in `src/app/page.tsx`

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive layouts for tablets
- **Desktop Enhanced**: Rich interactions for desktop users

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run genkit:dev      # Start AI development server
npm run genkit:watch    # Watch AI development server

# Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run typecheck       # Run TypeScript checks
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Firebase](https://firebase.google.com/) - Backend services
- [Google Genkit](https://firebase.google.com/docs/genkit) - AI integration
