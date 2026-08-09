export interface Project {
  id: string;
  title: string;
  date: string;
  technologies: string[];
  description: string[];
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Education {
  institution: string;
  duration: string;
  degree: string;
  gpa: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  address: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  about: string;
  projects: Project[];
  skillCategories: SkillCategory[];
  education: Education[];
  contact: ContactInfo;
}
