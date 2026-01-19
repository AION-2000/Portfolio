import { Octokit } from '@octokit/rest';
import { Project } from '../types';

// Configuration
const GITHUB_USERNAME = 'AION-2000';
// Note: In client-side code, we must use VITE_ prefix. 
// If VITE_GITHUB_TOKEN is not set, we'll try to fetch without auth (lower rate limit)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Fallback data in case GitHub API fails or rate limit exceeded
const FALLBACK_PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Fruit_Classif_XAI',
        category: 'AI / Deep Learning',
        image: 'https://picsum.photos/seed/fruit/800/600',
        description: 'Enhancing Fruit Classification with Deep Learning, Explainable AI (XAI), and Database Integration.',
        link: 'https://github.com/AION-2000?tab=repositories',
        languages: ['Python', 'TensorFlow', 'OpenCV'],
        stars: 0,
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
        stars: 0,
        updatedAt: '2024-01-01'
    },
    {
        id: 3,
        title: 'Ecommerce_Auto',
        category: 'Automation',
        image: 'https://picsum.photos/seed/ecom/800/800',
        description: 'Automated system for streamlining e-commerce operations and workflows.',
        link: 'https://github.com/AION-2000?tab=repositories',
        languages: ['Python', 'Automation'],
        stars: 0,
        updatedAt: '2024-01-01'
    }
];

// Category mapping helper
const getCategoryFromRepo = (repo: any): string => {
    const topics = repo.topics || [];
    const language = repo.language || '';

    if (topics.includes('ai') || topics.includes('machine-learning') || topics.includes('deep-learning')) {
        return 'AI / Machine Learning';
    }
    if (topics.includes('web') || topics.includes('webapp') || language === 'JavaScript' || language === 'TypeScript') {
        return 'Web Development';
    }
    if (topics.includes('automation') || topics.includes('bot')) {
        return 'Automation';
    }
    if (topics.includes('nlp') || topics.includes('natural-language-processing')) {
        return 'NLP / Detection';
    }
    if (language === 'Python') {
        return 'Python Project';
    }

    return 'Software Development';
};

// Language stack helper
const getLanguages = (repo: any): string[] => {
    const languages: string[] = [];

    if (repo.language) {
        languages.push(repo.language);
    }

    const topics = (repo.topics || []) as string[];
    const frameworkMap: Record<string, string> = {
        'tensorflow': 'TensorFlow',
        'pytorch': 'PyTorch',
        'flask': 'Flask',
        'react': 'React',
        'vue': 'Vue',
        'django': 'Django',
        'opencv': 'OpenCV',
        'scikit-learn': 'Scikit-learn',
        'nodejs': 'Node.js',
        'express': 'Express'
    };

    topics.forEach(topic => {
        if (frameworkMap[topic]) {
            languages.push(frameworkMap[topic]);
        }
    });

    return languages.length > 0 ? languages : ['Code'];
};

// Image helper
const getProjectImage = (repo: any): string => {
    if (repo.open_graph_image_url && repo.open_graph_image_url !== 'https://opengraph.githubassets.com/1/...') {
        return repo.open_graph_image_url;
    }
    const seed = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://picsum.photos/seed/${seed}/800/600`;
};

export const fetchGitHubProjects = async (): Promise<Project[]> => {
    try {
        console.log('🔄 Fetching projects from GitHub API...');
        const octokit = new Octokit({
            auth: GITHUB_TOKEN,
            userAgent: 'Portfolio-App'
        });

        const { data: repos } = await octokit.repos.listForUser({
            username: GITHUB_USERNAME,
            type: 'owner',
            sort: 'updated',
            per_page: 100
        });

        const projects = repos
            .filter((repo: any) => {
                if (repo.fork) return false;
                if (!repo.description || repo.description.trim() === '') return false;
                return true;
            })
            .map((repo: any, index: number) => ({
                id: index + 1,
                title: repo.name,
                category: getCategoryFromRepo(repo),
                image: getProjectImage(repo),
                description: repo.description,
                link: repo.html_url,
                languages: getLanguages(repo),
                stars: repo.stargazers_count,
                updatedAt: repo.updated_at
            }));

        console.log(`✅ Fetched ${projects.length} projects successfully`);
        return projects;

    } catch (error) {
        console.error("❌ GitHub Fetch Error:", error);
        return FALLBACK_PROJECTS;
    }
};
