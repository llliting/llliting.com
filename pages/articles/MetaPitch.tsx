import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, TrendingUp, DollarSign, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
        >
            {children}
        </div>
    );
};

const MetaPitch: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-grow flex flex-col pt-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full animate-fade-in pb-20">
            {/* Back Button */}
            <button
                onClick={() => navigate('/trades')}
                className="text-secondary/60 hover:text-accent transition-colors text-sm flex items-center gap-2 mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Trades
            </button>

            <article className="bg-[#1a120b]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                {/* Header */}
                <header className="mb-12 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4 text-sm text-accent mb-4 font-mono tracking-wider">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            AUGUST 2024
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            LONG POSITION
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-serif">
                        Meta Platforms Inc. (META)
                    </h1>

                    <div className="flex flex-wrap gap-6 text-secondary font-light">
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <Target className="w-4 h-4 text-accent" />
                            <span>Target: <span className="text-white font-medium">$580</span></span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <DollarSign className="w-4 h-4 text-accent" />
                            <span>Rec: <span className="text-white font-medium">BUY</span></span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="space-y-12 font-light text-primary/90 leading-8 text-lg">

                    {/* Executive Summary / Thesis */}
                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Investment Thesis: The AI Application Winner</h2>
                            <p className="text-secondary mb-6">
                                Meta is among the world’s largest companies and the leading social media giant. It is at the forefront of the current AI wave. We've all witnessed the surge in Nvidia's stock, driven by the skyrocketing demand for AI infrastructure. With ChatGPT now entering its second year and Nvidia possibly already halfway through its high-growth phase, it might be a good time to consider future winners in AI applications.
                            </p>
                            <p className="text-secondary">
                                I believe Meta will definitely be one of the top winners. While AI is currently most widely used in chatbots, text summarization, and coding, Meta has shown a strong capability in commercializing AI for digital advertising.
                            </p>
                        </section>
                    </RevealOnScroll>

                    {/* Business Segments */}
                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Business Segments & Strategic Pivot</h2>
                            <p className="text-secondary mb-6">
                                The company operates through two segments: <strong>Family of Apps</strong> and <strong>Reality Labs</strong>.
                            </p>
                            <ul className="list-disc pl-6 space-y-4 text-secondary mb-6">
                                <li>
                                    <strong>Family of Apps:</strong> Includes Facebook, Instagram, WhatsApp, and Threads.
                                </li>
                                <li>
                                    <strong>Reality Labs:</strong> Focuses on VR/AR. While this segment has been a financial drag, the recent cancellation of their high-end headset to focus on Ray-Ban smart glasses suggests a strategic pivot that could help turn around losses.
                                </li>
                            </ul>
                        </section>
                    </RevealOnScroll>

                    {/* The AI Ecosystem */}
                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">The AI Ecosystem: Compute & Data</h2>
                            <p className="text-secondary mb-6">
                                Meta is focusing on building its AI ecosystem within the Family of Apps to generate direct profits. Two key components are essential here: <strong>computing power</strong> and <strong>data</strong>.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                                    <h3 className="text-white font-serif text-xl mb-3">Computing Power</h3>
                                    <p className="text-secondary text-base">
                                        Meta is a top purchaser of Nvidia GPUs and is collaborating with Broadcom to develop custom ASIC chips. They have a fortress balance sheet allowing them to sustain the AI arms race.
                                    </p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                                    <h3 className="text-white font-serif text-xl mb-3">Data Advantage</h3>
                                    <p className="text-secondary text-base">
                                        With over 3 billion monthly active users (half the world's population), Meta possesses an unrivaled dataset to train customized AI models and target ads effectively.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </RevealOnScroll>

                    {/* Monetization */}
                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Monetization: AI in Digital Advertising</h2>
                            <p className="text-secondary mb-6">
                                Meta's current focus sets it apart from cloud-focused competitors like Google, Microsoft, and Amazon. By integrating the Meta Assistant and LLaMA-powered tools across its platforms, Meta is expanding ad formats and improving targeting.
                            </p>
                            <p className="text-secondary mb-6">
                                <strong>Evidence of Success:</strong> In Q2, Meta's operating margin reached <strong>38%</strong> (up 850 bps YoY), with revenue growing <strong>22%</strong>. In comparison, Google's search and YouTube segments grew only 14% and 13% respectively. This highlights Meta as a superior platform for advertisers.
                            </p>
                        </section>
                    </RevealOnScroll>

                    {/* LLaMA & Open Source */}
                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">The LLaMA Advantage</h2>
                            <p className="text-secondary mb-6">
                                Meta's open-source approach with LLaMA is a strategic masterstroke. By making the source code freely available, they attract developers and institutions to build on their standard without licensing fees.
                            </p>
                            <p className="text-secondary">
                                Just as Apple's open-source Swift language solidified its ecosystem, widespread adoption of LLaMA could make Meta the backbone of future AI software development.
                            </p>
                        </section>
                    </RevealOnScroll>

                    {/* Financials & Valuation */}
                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Financials & Valuation</h2>
                            <p className="text-secondary mb-6">
                                Despite being up 62% YTD (as of Aug 2024), Meta remains relatively undervalued:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-secondary mb-6">
                                <li><strong>P/E Ratio:</strong> ~28x (vs. Microsoft 37x, Amazon 46x)</li>
                                <li><strong>Operating Margin:</strong> ~38-40%</li>
                                <li><strong>Revenue Growth:</strong> 22% YoY</li>
                            </ul>
                        </section>
                    </RevealOnScroll>

                    {/* Risks */}
                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Risks & Hedging</h2>
                            <p className="text-secondary">
                                We must remain cautious about AI hype and macroeconomic uncertainties. Meta's capital spending has increased by 50% YoY. While efficient, this level of spend presents risk.
                            </p>
                            <p className="text-secondary mt-4 italic border-l-4 border-white/20 pl-4 py-2 bg-white/5">
                                <strong>Recommendation:</strong> Consider a put option around $480 extending through mid-2025 alongside the long position to hedge against broader market volatility.
                            </p>
                        </section>
                    </RevealOnScroll>

                </div>
            </article>
        </div>
    );
};

export default MetaPitch;
