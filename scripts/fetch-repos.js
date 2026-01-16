// Fetch GitHub repositories at build time
// This script runs during Vercel build, not at runtime
import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'AION-2000';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

// Fallback data in case GitHub API fails
const FALLBACK_PROJECTS = [
    {
        id: 1,
        title: 'Fruit_Classif_XAI',
        category: 'AI / Deep Learning',
        image: 'https://picsum.photos/seed/fruit/800/600',
        description: 'Enhancing Fruit Classification with Deep Learning, Explainable AI (XAI), and Database Integration.',
        link: 'https://github.com/AION-2000?tab=repositories',
        languages: ['Python', 'TensorFlow', 'OpenCV'],
        stars: 0,
        createdAt: '2024-01-01',
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
        createdAt: '2024-01-01',
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
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        id: 4,
        title: 'Plagiarism_Bot',
        category: 'NLP / Detection',
        image: 'https://picsum.photos/seed/nlp/700/500',
        description: 'AI-powered plagiarism checker and detection system using NLP techniques.',
        link: 'https://github.com/AION-2000?tab=repositories',
        languages: ['Python', 'NLP', 'Scikit-learn'],
        stars: 0,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    }
];

// Category mapping based on topics and languages
const getCategoryFromRepo = (repo) => {
    const topics = repo.topics || [];
    const language = repo.language || '';

    // Priority-based category detection
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

// Get language stack from repo
const getLanguages = (repo) => {
    const languages = [];

    if (repo.language) {
        languages.push(repo.language);
    }

    // Add common frameworks based on topics
    const topics = repo.topics || [];
    const frameworkMap = {
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

// Generate project image fallback
const getProjectImage = (repo) => {
    if (repo.open_graph_image_url && repo.open_graph_image_url !== 'https://opengraph.githubassets.com/1/...') {
        return repo.open_graph_image_url;
    }

    // Use picsum with repo name as seed for consistent images
    const seed = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://picsum.photos/seed/${seed}/800/600`;
};

async function fetchRepositories() {
    console.log('🔍 Fetching GitHub repositories...');

    if (!GITHUB_TOKEN) {
        console.warn('⚠️  No GitHub token found. Using fallback data.');
        console.warn('   Set GITHUB_TOKEN or VITE_GITHUB_TOKEN environment variable.');
        return FALLBACK_PROJECTS;
    }

    try {
        const octokit = new Octokit({ auth: GITHUB_TOKEN });

        // Fetch all public repositories
        const { data: repos } = await octokit.repos.listForUser({
            username: GITHUB_USERNAME,
            type: 'owner',
            sort: 'updated',
            per_page: 100
        });

        console.log(`✅ Found ${repos.length} repositories`);

        // Filter and transform repositories
        const projects = repos
            .filter(repo => {
                // Exclude forks
                if (repo.fork) return false;

                // Only include repos with descriptions (usually indicates real projects)
                if (!repo.description || repo.description.trim() === '') return false;

                return true;
            })
            .map((repo, index) => ({
                id: index + 1,
                title: repo.name,
                category: getCategoryFromRepo(repo),
                image: getProjectImage(repo),
                description: repo.description || 'No description available',
                link: repo.html_url,
                languages: getLanguages(repo),
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                createdAt: repo.created_at,
                updatedAt: repo.updated_at,
                topics: repo.topics || []
            }));

        console.log(`✅ Processed ${projects.length} projects (excluded ${repos.length - projects.length} forks/empty)`);

        return projects;

    } catch (error) {
        console.error('❌ Error fetching repositories:', error.message);
        console.warn('⚠️  Using fallback data');
        return FALLBACK_PROJECTS;
    }
}

async function main() {
    console.log('🚀 Starting GitHub repository fetch...');
    console.log(`   Username: ${GITHUB_USERNAME}`);
    console.log(`   Token: ${GITHUB_TOKEN ? '✅ Present' : '❌ Missing'}`);

    const projects = await fetchRepositories();

    // Ensure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write to public/projects.json
    const outputPath = path.join(publicDir, 'projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));

    console.log(`✅ Saved ${projects.length} projects to ${outputPath}`);
    console.log('🎉 Done!');
}

main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
