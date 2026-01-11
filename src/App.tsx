import React, { useState, useEffect } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Terminal,
  GraduationCap,
  Award,
  Phone,
  FileText,
  Menu,
  X,
} from 'lucide-react';

// --- Types ---
interface Skill {
  category: string;
  items: string[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  role?: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  points: string[];
  appLink?: string;
}

// --- Components ---

const Section = ({ id, className = "", children }: { id: string, className?: string, children: React.ReactNode }) => (
  <section id={id} className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl md:text-6xl font-bold mb-20 tracking-tighter text-center grok-glow-text">
    {children}
  </h2>
);

const ExperienceCard = ({ exp, index, isPromotion }: { exp: Experience, index: number, isPromotion?: boolean }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distance = centerY - cardCenterY;
        setScrollY(distance * 0.05); // Parallax intensity
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const companyLinks: Record<string, string> = {
    'Jolt': 'https://www.thejoltapp.com',
    'SecNinjaz Technologies LLP': 'https://www.secninjaz.com',
    'Deva Consultancy Services': 'https://devaconsultancy.com'
  };

  const link = companyLinks[exp.company];

  return (
    <div
      ref={cardRef}
      className={`relative mb-8 pl-8 md:pl-12 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: `translateY(${scrollY}px)`,
        transition: 'transform 0.1s ease-out, opacity 0.4s ease-out'
      }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-8 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" />

      {/* Timeline line */}
      {index < 5 && (
        <div className="absolute left-[5px] top-11 w-0.5 h-full bg-white/20" />
      )}

      {/* Floating Card */}
      <div
        className="relative border border-white/10 rounded-2xl p-8 bg-black/40 backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 hover:-translate-y-2 active:scale-110 active:-translate-y-3 transition-all duration-300 group cursor-pointer"
      >
        {/* Promotion Badge */}
        {isPromotion && (
          <div className="absolute -top-3 left-8 inline-flex items-center gap-2 px-4 py-1.5 bg-black border border-white/20 rounded-full shadow-lg">
            <span className="text-xs font-display uppercase tracking-widest text-white">↑ Promotion</span>
          </div>
        )}

        {/* Period */}
        <div className="mb-3 text-xs text-neutral-500 font-display uppercase tracking-widest">{exp.period}</div>

        {/* Role */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:grok-glow-text transition-all duration-300">{exp.role}</h3>

        {/* Company & Type */}
        <div className="text-neutral-400 mb-6 flex items-center gap-2 text-sm font-display">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2 group/link"
              onClick={(e) => e.stopPropagation()}
            >
              {exp.company}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          ) : (
            exp.company
          )}
          <span className="text-white/20">•</span> {exp.type}
        </div>

        {/* Points */}
        <ul className="space-y-3 text-neutral-400 text-sm leading-relaxed font-sans">
          {exp.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        {/* Play Store Badge */}
        {exp.appLink && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <a
              href={exp.appLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all group/badge"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <span className="text-sm font-display uppercase tracking-wider text-white">View on Play Store</span>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover/badge:opacity-100 transition-opacity" />
            </a>
          </div>
        )}

        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const projectImages: Record<string, string> = {
    // Images removed as requested
  };

  const image = projectImages[project.title];

  const handleCardClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group h-full flex flex-col relative overflow-hidden border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-300 cursor-pointer p-6"
    >
      {/* Top Section: Icon + Name */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-6">
        {/* Icon */}
        {image && (
          <img
            src={image}
            alt={project.title}
            className="w-full h-48 md:w-32 md:h-32 flex-shrink-0 object-contain bg-black rounded-2xl group-hover:scale-110 transition-transform duration-500"
          />
        )}

        {/* Name */}
        <div className="flex-1 w-full">
          <h3 className="text-2xl font-bold text-white group-hover:grok-glow-text transition-all duration-300 mt-4 md:mt-0">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-400 mb-6 leading-relaxed text-sm font-sans">
        {project.description}
      </p>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full border border-white/10 text-neutral-400 font-display uppercase tracking-wider hover:border-white/30 hover:text-white transition-colors"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Decorative corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills: Skill[] = [
    { category: "Languages", items: ["Kotlin", "Dart", "Java", "C++", "SQL", "C"] },
    { category: "Development", items: ["Kotlin", "XML", "Jetpack Compose", "Flutter"] },
    { category: "Technologies/Frameworks", items: ["GitHub", "Git", "GitLab", "Spring Boot", "Android Studio", "VS Code", "Postman", "Firebase", "Figma"] },
  ];

  const experience: Experience[] = [
    {
      role: "Android Developer Intern",
      company: "Jolt",
      period: "Nov 2025 - Present",
      type: "On-site",
      points: [
        "Deployed JOLT, a distraction-blocking & productivity suite with Jetpack Compose + MVVM, achieving 10K+ downloads and 7K monthly active users.",
        "Designed Figma prototypes → production UI with responsive layouts, focus sessions (85% completion rate), app limits, and real-time analytics dashboards.",
        "Implemented Coroutines and background scheduling for JOLT's usage tracking feature; this work decreased battery drain by 8% during average daily use - a major win for users."
      ],
      appLink: "https://play.google.com/store/apps/details?id=com.thejoltapp"
    },
    {
      role: "Android Developer Intern",
      company: "SecNinjaz Technologies LLP",
      period: "Sep 2025 - Nov 2025",
      type: "On-site",
      points: [
        "Designed secure messaging platform implementing end-to-end encryption using RSA (key exchange) and AES-256 (payload encryption), guaranteeing cryptographic privacy for 200+ users without server-side message access.",
        "Optimized real-time communication through WebSocket implementation with decentralized message routing, achieving sub-100ms latency and automatic reconnection recovery during network failures.",
        "Partnered with backend engineers to architect distributed peer-to-peer synchronization layer, reducing server infrastructure dependency by 70% while maintaining encryption standards and achieving eventual consistency across nodes."
      ]
    },
    {
      role: "Android Developer Intern",
      company: "Deva Consultancy Services",
      period: "Sep 2024 - Sep 2025",
      type: "Remote",
      points: [
        "Created an MVP for a Social Media cum Matrimony app to Client, converting Figma designs into a responsive UI with 100% accuracy, boosting usability by 20%.",
        "Integrated a Spring Boot backend, optimizing network calls and reducing response times by 30%, enhancing overall app performance.",
        "Collaborated with backend teams using Compose UI, Coroutines, and Retrofit for efficient API integration, elevating data flow and user experience by 25%."
      ]
    }
  ];

  const projects: Project[] = [
    {
      title: "JOLT",
      description: "Distraction-blocking & productivity suite with Jetpack Compose + MVVM architecture. Features focus sessions, app limits, and real-time analytics dashboards. Achieved 10K+ downloads and 7K monthly active users.",
      tech: ["Jetpack Compose", "Kotlin", "MVVM", "Coroutines", "Firebase"],
      link: "https://play.google.com/store/apps/details?id=com.thejoltapp"
    },
    {
      title: "INNOGEEKS APP",
      description: "Community app for university club using Kotlin and XML, leveraging Firebase for data storage. Features student attendance marking and resource sharing with admin-client model, supporting 250+ active users.",
      tech: ["Native Android", "XML", "Kotlin", "Firebase"],
      link: "#"
    },
    {
      title: "UNILET GATEWAY",
      description: "Society tracker app similar to JioGate using Jetpack Compose for modern UI. Redesigned Node.js backend to manage user data and gate entry logs for 1000+ resident entries, minimizing data sync time by 50%.",
      tech: ["Jetpack Compose", "Kotlin", "Node.js", "REST APIs"],
      link: "#"
    },
    {
      title: "COLLABCRAFT",
      description: "Native Android app connecting users with teammates or mentors for projects and hackathons. Architected Spring Boot backend with JWT-based authentication, securing 10+ endpoints and boosting collaboration for 50+ users.",
      tech: ["Kotlin", "Jetpack Compose", "Spring Boot", "JWT", "Coroutines"],
      link: "https://github.com/jeezzzz"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#" className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2 grok-glow-text cursor-pointer z-50">
            JEEZZZZ.DEV
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12">
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link text-white">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <a href="#about" className="text-2xl font-display uppercase tracking-widest text-neutral-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#experience" className="text-2xl font-display uppercase tracking-widest text-neutral-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
          <a href="#projects" className="text-2xl font-display uppercase tracking-widest text-neutral-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
          <a href="#contact" className="text-2xl font-display uppercase tracking-widest text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col lg:flex-row items-center h-full">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20 pt-12 lg:pt-0">
            <h1 className="text-5xl md:text-8xl lg:text-[100px] font-display font-bold leading-[0.9] tracking-tighter mb-8 grok-glow-text animate-fade-in select-none">
              AJEESH <br />
              <span className="text-neutral-500">RAWAL</span>
            </h1>

            <p className="text-xl md:text-2xl text-white max-w-xl mb-12 font-display tracking-wide leading-relaxed animate-slide-up">
              Crafting <span className="text-neutral-400">native Android apps</span> and <span className="text-neutral-400">innovative mobile solutions</span> with modern tech stacks.
            </p>

            <div className="flex flex-wrap gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#contact"
                className="btn-grok relative z-0"
              >
                Start a Project
              </a>
              <a
                href="#about"
                className="px-8 py-3 rounded-full border border-transparent text-neutral-400 hover:text-white font-display font-medium tracking-wide uppercase text-sm transition-colors flex items-center gap-2 group relative z-0"
              >
                View Portfolio <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Right Image - Extended Height */}
          <div className="w-full lg:absolute lg:right-0 lg:top-0 lg:w-[55%] lg:h-full h-[50vh] md:h-[700px] flex justify-end items-center z-10 mt-12 lg:mt-0 pointer-events-none">
            <div className="relative w-full h-[175%] group pointer-events-auto">
              {/* Image with blending and hover effect */}
              <img
                src="/profile-bg-Photoroom.png"
                alt="Ajeesh Rawal"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                style={{
                  objectPosition: '70% 10%',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to top, transparent 0%, black 60%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to top, transparent 0%, black 60%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in'
                }}
              />
              {/* Gradient Overlays for seamless blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />

              {/* Decorative Glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-[100px] -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Education & Skills */}
      <Section id="about">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-5">
            <h3 className="text-3xl font-display font-bold mb-12 flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-white" />
              EDUCATION
            </h3>
            <div className="space-y-12">
              <div className="group">
                <div className="text-xs text-neutral-500 font-display uppercase tracking-widest mb-2">Expected 2026</div>
                <h4 className="text-xl font-bold text-white mb-1">B.Tech in CSE (AI)</h4>
                <p className="text-neutral-400 text-sm mb-2">KIET Group of Institutions</p>
                <div className="inline-block px-3 py-1 border border-white/10 text-white text-xs font-display uppercase tracking-wider">
                  84%
                </div>
              </div>
              <div className="group">
                <div className="text-xs text-neutral-500 font-display uppercase tracking-widest mb-2">2020 - 2022</div>
                <h4 className="text-xl font-bold text-white mb-1">Intermediate (CBSE Board)</h4>
                <p className="text-neutral-400 text-sm mb-2">Modern Public School</p>
                <div className="inline-block px-3 py-1 border border-white/10 text-white text-xs font-display uppercase tracking-wider">
                  92.4%
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-display font-bold mb-12 mt-24 flex items-center gap-4">
              <Award className="w-8 h-8 text-white" />
              ACHIEVEMENTS
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span className="text-neutral-400 text-sm leading-relaxed group-hover:text-white transition-colors font-sans">2nd Runner-Up at Hack With India (Microsoft Office, Gurugram) - Engineered a cost-effective, scalable solution demonstrating proficiency in full-stack development and system design.</span>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span className="text-neutral-400 text-sm leading-relaxed group-hover:text-white transition-colors font-sans">Presented IoT sensor network for real-time waste monitoring at InnoTech'23, demonstrating proficiency in embedded systems and wireless communication to 500+ attendees.</span>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span className="text-neutral-400 text-sm leading-relaxed group-hover:text-white transition-colors font-sans">Core Team Member at Innogeeks - Mentored 50+ junior developers in Android development with 90% knowledge retention rate.</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-7">
            <h3 className="text-3xl font-display font-bold mb-12 flex items-center gap-4">
              <Terminal className="w-8 h-8 text-white" />
              TECHNICAL ARSENAL
            </h3>
            <div className="grid sm:grid-cols-2 gap-12">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-6">
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">{skill.category}</h4>
                  <div className={skill.category === "Tools" ? "grid grid-cols-3 gap-3 auto-rows-auto" : "grid grid-cols-2 gap-3"}>
                    {skill.items.map((item, j) => {
                      const techLinks: Record<string, string> = {
                        'Java': 'https://www.java.com',
                        'Kotlin': 'https://kotlinlang.org',
                        'Dart': 'https://dart.dev',
                        'C': 'https://en.cppreference.com/w/c',
                        'C++': 'https://en.cppreference.com/w/cpp',
                        'SQL': 'https://www.mysql.com',
                        'XML': 'https://developer.android.com/develop/ui/views/layout/declaring-layout',
                        'Jetpack Compose': 'https://developer.android.com/jetpack/compose',
                        'Flutter': 'https://flutter.dev',
                        'Spring Boot': 'https://spring.io/projects/spring-boot',
                        'Git': 'https://git-scm.com',
                        'GitHub': 'https://github.com',
                        'GitLab': 'https://about.gitlab.com',
                        'Postman': 'https://www.postman.com',
                        'Firebase': 'https://firebase.google.com',
                        'Figma': 'https://www.figma.com',
                        'Android Studio': 'https://developer.android.com/studio',
                        'VS Code': 'https://code.visualstudio.com',
                      };
                      const iconMap: Record<string, string> = {
                        'Java': 'openjdk',
                        'Kotlin': 'kotlin',
                        'Dart': 'dart',
                        'C': 'c',
                        'C++': 'cplusplus',
                        'SQL': 'mysql',
                        'XML': 'xml',
                        'Jetpack Compose': 'jetpackcompose',
                        'Flutter': 'flutter',
                        'Spring Boot': 'springboot',
                        'Git': 'git',
                        'GitHub': 'github',
                        'GitLab': 'gitlab',
                        'Postman': 'postman',
                        'Firebase': 'firebase',
                        'Figma': 'figma',
                        'Android Studio': 'androidstudio',
                        'VS Code': 'vscode',
                      };
                      const iconSlug = iconMap[item] || 'code';
                      const url = techLinks[item] || '#';
                      return (
                        <a
                          key={j}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2.5 border border-white/10 text-xs text-neutral-400 hover:border-white hover:text-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all cursor-pointer font-display uppercase tracking-wider flex items-center gap-2 group no-underline justify-start min-w-fit"
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${iconSlug}/ffffff`}
                            alt={item}
                            className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <span className="whitespace-nowrap">{item}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" className="bg-white/[0.02]">
        <SectionTitle>EXPERIENCE</SectionTitle>
        <div className="max-w-4xl mx-auto">
          {experience.map((exp, i) => {
            // Check if this is a promotion within MetaUpSpace
            const isPromotion = i > 0 &&
              exp.company === 'MetaUpSpace LLP' &&
              experience[i - 1].company === 'MetaUpSpace LLP';

            return (
              <ExperienceCard
                key={i}
                exp={exp}
                index={i}
                isPromotion={isPromotion}
              />
            );
          })}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <SectionTitle>PROJECTS</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </Section>


      {/* Testimonials - Commented out as requested */}
      {/* <Section id="testimonials" className="bg-white/[0.02]">
        <SectionTitle>TESTIMONIALS</SectionTitle>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            className="group border border-white/10 rounded-2xl p-8 bg-black/40 backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-sm text-neutral-500 mb-2 font-display">Professional Recommendation</p>
            </div>

            <div className="text-6xl font-bold text-white/20 leading-none mb-2">"</div>

            <blockquote className="text-neutral-400 leading-relaxed text-sm font-sans italic relative">
              <div className="max-h-32 group-hover:max-h-[1000px] overflow-hidden transition-all duration-500">
                Testimonials from colleagues and mentors will be added here soon. If you've worked with Ajeesh and would like to provide a recommendation, please reach out!
              </div>
            </blockquote>

            <div className="text-6xl font-bold text-white/20 leading-none text-right mt-2">"</div>
          </div>

          <div
            className="group border border-white/10 rounded-2xl p-8 bg-black/40 backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-sm text-neutral-500 font-display">Professional Recommendation</p>
            </div>

            <div className="text-6xl font-bold text-white/20 leading-none mb-2">"</div>

            <blockquote className="text-neutral-400 leading-relaxed text-sm font-sans italic relative">
              <div className="max-h-32 group-hover:max-h-[1000px] overflow-hidden transition-all duration-500">
                Testimonials from colleagues and mentors will be added here soon. If you've worked with Ajeesh and would like to provide a recommendation, please reach out!
              </div>
            </blockquote>

            <div className="text-6xl font-bold text-white/20 leading-none text-right mt-2">"</div>
          </div>
        </div>
      </Section> */}


      {/* Contact */}
      < Section id="contact" >
        <div className="text-center py-24 px-6 relative overflow-hidden max-w-5xl mx-auto border-y border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-white opacity-[0.02] blur-3xl pointer-events-none" />

          <h2 className="text-4xl md:text-5xl lg:text-8xl font-display font-bold mb-12 grok-glow-text tracking-tighter">
            LET'S BUILD
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
            <a
              href="tel:+917393085376"
              className="flex items-center justify-center gap-4 px-8 py-6 border border-white/10 hover:border-white hover:bg-white/5 transition-all group relative z-0"
            >
              <Phone className="w-6 h-6 text-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <span className="font-display tracking-wider">+91 73930 85376</span>
            </a>
            <a
              href="mailto:ajeeshrawal3376@gmail.com"
              className="flex items-center justify-center gap-4 px-8 py-6 border border-white/10 hover:border-white hover:bg-white/5 transition-all group relative z-0"
            >
              <Mail className="w-6 h-6 text-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <span className="font-display tracking-wider">ajeeshrawal3376@gmail.com</span>
            </a>
          </div>

          <div className="flex justify-center gap-8">
            <a
              href="https://github.com/jeezzzz"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-neutral-500 hover:text-black transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white overflow-hidden"
            >
              <Github className="w-8 h-8 transition-colors duration-300" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-display uppercase text-sm tracking-wider">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/ajeeshrawal376"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-neutral-500 hover:text-black transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white overflow-hidden"
            >
              <Linkedin className="w-8 h-8 transition-colors duration-300" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-display uppercase text-sm tracking-wider">LinkedIn</span>
            </a>
            <a
              href="https://drive.google.com/file/d/11Dr4c1D0TU0Vp88dzTdyNcHRcGu2c4W-/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-neutral-500 hover:text-black transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white overflow-hidden"
            >
              <FileText className="w-8 h-8 transition-colors duration-300" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-display uppercase text-sm tracking-wider">Resume</span>
            </a>
          </div>
        </div>
      </Section >

      {/* Footer */}
      < footer className="py-12 text-center text-neutral-600 text-xs font-display uppercase tracking-widest" >
        <p>© {new Date().getFullYear()} Ajeesh Rawal. All rights reserved.</p>
      </footer >
    </div >
  );
}

export default App;
