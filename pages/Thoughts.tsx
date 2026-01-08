import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Brain } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    date: string;
    description: string;
    path: string;
    tags: string[];
}

const ARTICLES: Article[] = [
    {
        id: 'qubiee-ai-2026',
        title: 'Thoughts on Building Qubiee (AI)',
        date: 'January 2026',
        description: 'Reflecting on building Qubiee\'s AI system: moving from simple tool calling to orchestrated workflows, and what the "last 30%" of engineering really means.',
        path: '/thoughts/qubiee-ai',
        tags: ['AI Engineering', 'Reflection']
    }
];

export const Thoughts: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col pt-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full animate-fade-in pb-20">
            <header className="mb-16 border-b border-white/10 pb-8">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-serif">
                    Thoughts
                </h2>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {ARTICLES.map((article) => (
                    <Link
                        key={article.id}
                        to={article.path}
                        className="group flex flex-col bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,220,207,0.1)] hover:-translate-y-1"
                    >
                        <div className="p-8 flex flex-col h-full">
                            {/* Meta */}
                            <div className="flex items-center justify-between text-xs text-secondary/60 mb-6 font-mono uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    {article.date}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-accent transition-colors">
                                {article.title}
                            </h3>

                            {/* Description */}
                            <p className="text-secondary/80 font-light leading-relaxed mb-8 flex-grow">
                                {article.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center text-accent text-sm font-medium tracking-wide pt-6 border-t border-white/5">
                                READ REFLECTION <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
