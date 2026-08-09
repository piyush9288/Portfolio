import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: "PIYUSH RAJ",
  role: "AI/ML & SOFTWARE DEVELOPER",
  about: "Building intelligent systems, AI-powered products and scalable software experiences.",
  contact: {
    email: "piyush30450@gmail.com",
    phone: "+91 9431430356",
    linkedin: "https://www.linkedin.com/in/piyush-raj-ai",
    address: "Patna, Bihar 800020, India."
  },
  skillCategories: [
    {
      title: "Programming & Frameworks",
      skills: ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Matplotlib", "SQL"]
    },
    {
      title: "Version Control & Tools",
      skills: ["Git", "GitHub", "VS Code", "Postman", "Jupyter Notebook"]
    },
    {
      title: "Generative AI",
      skills: ["OpenAI Models", "Gemini", "Prompt Engineering", "Retrieval-Augmented Generation (RAG)", "LangChain"]
    },
    {
      title: "Machine Learning",
      skills: ["Supervised Learning", "Unsupervised Learning", "Classification", "Regression", "Clustering", "Feature Engineering", "Model Evaluation"]
    },
    {
      title: "Natural Language Processing",
      skills: ["Transformers", "NLP", "Text Embeddings", "Semantic Search"]
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "MySQL"]
    },
    {
      title: "Software Engineering",
      skills: ["Data Structures", "Algorithms", "Object-Oriented Programming", "REST APIs", "Debugging", "Unit Testing", "Problem Solving"]
    }
  ],
  projects: [
    {
      id: "ai-personal-os",
      title: "AI Personal OS",
      date: "Jun 2026 - Present",
      technologies: ["Python", "FastAPI", "PostgreSQL", "LangChain", "Gemini API", "RAG"],
      description: [
        "Developed an AI-powered personal operating system to manage tasks, goals, notes, and schedules.",
        "Built REST APIs and integrated Gemini API with Retrieval-Augmented Generation (RAG) to provide context-aware AI responses.",
        "Designed a modular backend architecture with PostgreSQL for efficient data management and scalable application development."
      ]
    },
    {
      id: "smart-research-assistant",
      title: "Smart Research Assistant",
      date: "Sep 2025 - Oct 2025",
      technologies: ["Python", "LangChain", "Gemini API", "RAG", "FastAPI"],
      description: [
        "Developed an AI-powered research assistant for document analysis, summarization, and question answering.",
        "Implemented Retrieval-Augmented Generation (RAG) with Large Language Models to generate accurate, context-aware responses.",
        "Integrated REST APIs and optimized prompt engineering to improve response quality and user experience."
      ]
    },
    {
      id: "ai-resume-analyzer",
      title: "AI Resume Analyzer",
      date: "Jul 2025 - Aug 2025",
      technologies: ["Python", "Streamlit", "Gemini API", "NLP"],
      description: [
        "Built an AI-based resume analyzer to evaluate resumes against job descriptions and provide personalized improvement suggestions.",
        "Applied Natural Language Processing (NLP) techniques for resume parsing, keyword extraction, and ATS score analysis.",
        "Integrated Gemini API to generate actionable feedback and optimize resumes for AI and software engineering roles."
      ]
    }
  ],
  education: [
    {
      institution: "Techno Main Salt Lake",
      duration: "2021 - 2025",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      gpa: "CGPA: 8.02/10"
    }
  ]
};
