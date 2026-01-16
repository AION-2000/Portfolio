import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '../types';
import { GitBranch, ArrowUpRight, Filter, ArrowDownUp, Star, Calendar, Hash } from 'lucide-react';
import { ScrollVelocity } from './ScrollVelocity';

// Fallback projects for development
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Fruit_Classif_XAI',
    category: 'AI / Deep Learning',
    image: 'https://picsum.photos/seed/fruit/800/600',
    description: 'Enhancing Fruit Classification with Deep Learning, Explainable AI (XAI), and Database Integration.',
    link: 'https://github.com/AION-2000?tab=repositories',
    languages: ['Python', 'TensorFlow', 'OpenCV'],
    stars: 5,
    updatedAt: '2024-01-01'
  },
  {
    id: 2,
    title: 'AI_Image_Gen',
    category: 'Web / GenAI',
    image: 'https://picsum.photos/seed/genai/800/800',
    description: 'Full-stack AI Image Generator Web App using Flask & OpenAI API.',
    link: 'https://github.com/AION-2000?tab=repositories',
    languages: ['Python', 'Flask', 'JavaScript'],
    stars: 3,
    updatedAt: '2024-02-01'
  },
  {
    id: 3,
    title: 'Ecommerce_Auto',
    category: 'Automation',
    image: 'https://picsum.photos/seed/ecom/800/800',
    description: 'Automated system for streamlining e-commerce operations and workflows.',
    link: 'https://github.com/AION-2000?tab=repositories',
    languages: ['Python', 'Automation'],
    stars: 2,
    updatedAt: '2024-03-01'
  },
  {
    id: 4,
    title: 'Plagiarism_Bot',
    category: 'NLP / Detection',
    image: 'https://picsum.photos/seed/nlp/700/500',
    description: 'AI-powered plagiarism checker and detection system using NLP techniques.',
    link: 'https://github.com/AION-2000?tab=repositories',
    languages: ['Python', 'NLP', 'Scikit-learn'],
    stars: 7,
    updatedAt: '2024-04-01'
  },
];

type SortOption = 'stars' | 'updated' | 'name';

// Load projects from generated JSON or fallback
const loadProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('/projects.json');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Loaded projects from GitHub data');
      return data;
    }
  } catch (error) {
    console.warn('⚠️ Could not load projects.json, using fallback');
  }
  return FALLBACK_PROJECTS;
};

const Gallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [displayCount, setDisplayCount] = useState(6);

  // Load projects on mount
  useEffect(() => {
    loadProjects().then(setProjects);
  }, []);

  // Extract all unique languages
  const allLanguages = Array.from(
    new Set(projects.flatMap(p => p.languages || []))
  ).sort();

  const filters = ['All', 'Python', ...allLanguages.filter(l => l !== 'Python')];

  // Filter and sort projects
  let filteredProjects = selectedLanguage === 'All'
    ? projects
    : projects.filter(p => p.languages?.includes(selectedLanguage));

  // Sort projects
  filteredProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return (b.stars || 0) - (a.stars || 0);
      case 'updated':
        return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Pagination
  const displayedProjects = filteredProjects.slice(0, displayCount);
  const hasMore = displayCount < filteredProjects.length;

  const pythonCount = projects.filter(p => p.languages?.includes('Python')).length;

  return (
    <section id="work" className="relative bg-espresso-900 w-full z-10 shadow-[0_-50px_100px_rgba(0,0,0,1)] border-t border-espresso-700">

      {/* Velocity Text Strip */}
      <ScrollVelocity />

      <div className="max-w-7xl mx-auto py-32 px-6 md:px-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-espresso-700 pb-6 gap-6">
          <div>
            <span className="font-mono text-accent-orange text-xs mb-2 block animate-pulse">● PROJECT INDEX</span>
            <h2 className="font-mono text-xl sm:text-2xl md:text-5xl text-latte-100 tracking-tighter">
              git log <span className="text-latte-500">--oneline</span>
            </h2>
          </div>
          <div className="hidden md:block font-mono text-latte-500 text-xs text-right">
            Total Repos: {projects.length}<br />
            Python Projects: <span className="text-accent-orange">{pythonCount}</span>
          </div>
        </div>

        {/* Language Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center gap-3 flex-wrap"
        >
          <Filter className="w-4 h-4 text-latte-500" />
          <span className="font-mono text-xs text-latte-500">Filter by:</span>
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => {
                setSelectedLanguage(filter);
                setDisplayCount(6); // Reset pagination when filtering
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 font-mono text-xs transition-all duration-300 ${selectedLanguage === filter
                ? 'bg-accent-orange text-espresso-950 border-accent-orange'
                : 'bg-espresso-800 text-latte-400 border-espresso-700 hover:border-latte-500'
                } border`}
              data-hover
            >
              {filter === 'Python' && '🐍 '}{filter}
              {selectedLanguage === filter && (
                <span className="ml-2">({filteredProjects.length})</span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Sorting Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex items-center gap-3 flex-wrap"
        >
          <ArrowDownUp className="w-4 h-4 text-latte-500" />
          <span className="font-mono text-xs text-latte-500">Sort by:</span>

          <motion.button
            onClick={() => setSortBy('updated')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 font-mono text-xs transition-all duration-300 flex items-center gap-2 ${sortBy === 'updated'
              ? 'bg-accent-blue text-espresso-950 border-accent-blue'
              : 'bg-espresso-800 text-latte-400 border-espresso-700 hover:border-latte-500'
              } border`}
            data-hover
          >
            <Calendar className="w-3 h-3" />
            Recently Updated
          </motion.button>

          <motion.button
            onClick={() => setSortBy('stars')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 font-mono text-xs transition-all duration-300 flex items-center gap-2 ${sortBy === 'stars'
              ? 'bg-accent-blue text-espresso-950 border-accent-blue'
              : 'bg-espresso-800 text-latte-400 border-espresso-700 hover:border-latte-500'
              } border`}
            data-hover
          >
            <Star className="w-3 h-3" />
            Most Stars
          </motion.button>

          <motion.button
            onClick={() => setSortBy('name')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 font-mono text-xs transition-all duration-300 flex items-center gap-2 ${sortBy === 'name'
              ? 'bg-accent-blue text-espresso-950 border-accent-blue'
              : 'bg-espresso-800 text-latte-400 border-espresso-700 hover:border-latte-500'
              } border`}
            data-hover
          >
            <Hash className="w-3 h-3" />
            Name
          </motion.button>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12 perspective-1000"
        >
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-16"
          >
            <motion.button
              onClick={() => setDisplayCount(prev => prev + 6)}
              whileHover={{ scale: 1.05, backgroundColor: '#E67E22' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-espresso-800 border border-latte-500 text-latte-500 font-mono text-sm transition-all duration-300 hover:text-espresso-950 group"
              data-hover
            >
              <span className="flex items-center gap-2">
                View More Projects
                <span className="text-xs opacity-60">
                  ({filteredProjects.length - displayCount} remaining)
                </span>
              </span>
            </motion.button>
          </motion.div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-latte-500 text-sm">No projects found with selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Internal Parallax Effect: Image moves slightly opposite to scroll
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // 3D Tilt Logic
  const xMotion = useMotionValue(0);
  const yMotion = useMotionValue(0);

  const xSpring = useSpring(xMotion, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(yMotion, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    xMotion.set(xPct);
    yMotion.set(yPct);
  };

  const handleMouseLeave = () => {
    xMotion.set(0);
    yMotion.set(0);
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-espresso-800 border border-espresso-700 hover:border-latte-400 transition-colors flex flex-col transform-gpu block cursor-none"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      data-hover
    >
      {/* Window Header */}
      <div className="bg-espresso-950 px-3 py-2 flex items-center justify-between border-b border-espresso-700 z-20 relative translate-z-10">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors duration-300"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors duration-300 delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors duration-300 delay-150"></div>
        </div>
        <div className="font-mono text-[10px] text-latte-500 truncate max-w-[150px]">
          ~/repo/{project.title.toLowerCase()}
        </div>
      </div>

      {/* Image Container with Parallax */}
      <div className="relative aspect-video overflow-hidden border-b border-espresso-700 translate-z-0">
        <div className="absolute inset-0 bg-espresso-900/20 group-hover:bg-transparent transition-all duration-500 z-10 pointer-events-none" />

        <motion.div style={{ y, scale: 1.1 }} className="w-full h-full">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-espresso-900 to-transparent z-20">
          <div className="flex items-center gap-2 mb-1">
            <GitBranch size={14} className="text-accent-orange" />
            <span className="font-mono text-xs text-accent-orange">{project.category}</span>
          </div>
        </div>
      </div>

      <div className="p-6 relative bg-espresso-800 flex-1 translate-z-20">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-mono text-xl text-latte-100 group-hover:text-accent-blue transition-colors duration-300">{project.title}</h3>
          <ArrowUpRight className="text-latte-500 w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
        </div>
        <p className="font-mono text-latte-400 text-xs leading-relaxed border-l border-espresso-700 pl-3 mb-6">
          // {project.description}
        </p>

        <div className="flex gap-2 mt-auto flex-wrap">
          {project.languages?.map((lang) => (
            <span
              key={lang}
              className={`px-2 py-1 border text-[10px] rounded-sm transition-colors ${lang === 'Python'
                ? 'bg-accent-orange/10 border-accent-orange/30 text-accent-orange'
                : 'bg-espresso-900 border-espresso-700 text-latte-500'
                }`}
            >
              {lang === 'Python' && '🐍 '}{lang}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default Gallery;