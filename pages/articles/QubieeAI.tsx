import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Brain, Cpu, Sparkles } from 'lucide-react';
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

const QubieeAI: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-grow flex flex-col pt-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full animate-fade-in pb-20">
            {/* Back Button */}
            <button
                onClick={() => navigate('/thoughts')}
                className="text-secondary/60 hover:text-accent transition-colors text-sm flex items-center gap-2 mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Thoughts
            </button>

            <article className="bg-[#1a120b]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                {/* Header */}
                <header className="mb-12 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4 text-sm text-accent mb-4 font-mono tracking-wider">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            JANUARY 2026
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            SYSTEMS THINKING
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-serif">
                        Thoughts on Building Qubiee (AI)
                    </h1>


                </header>

                {/* Content */}
                <div className="space-y-12 font-light text-primary/90 leading-8 text-lg">

                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">2025 was the year of vibe coding.</h2>
                            <p className="text-secondary mb-6">
                                With modern coding copilots, we built Qubiee in three months, something that would have taken a small team far longer not long ago. At the beginning of 2026, it feels like the right moment to pause and reflect: on what we shipped, what broke, what we fixed, and what it taught me about mastery, not just of code, but of building with AI.
                            </p>
                            <p className="text-secondary">
                                I’ll start with the AI system, because unexpectedly, it became the most joyful part of the build.
                            </p>
                        </section>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Month 3: When AI Enters the Loop</h2>
                            <p className="text-secondary mb-6">
                                I’ll admit it: building agents was the most fun I had all year.
                            </p>
                            <p className="text-secondary mb-6">
                                Just two months earlier, my days were consumed by the unglamorous work that every “AI product” quietly depends on, cleaning question tags and company tags, validating keys and answer checkers, wrestling with LaTeX prompts and solutions, and writing Python regex formatters that occasionally “fixed” one issue by creating a larger stylistic mess somewhere else.
                            </p>
                            <p className="text-secondary mb-6">
                                For many nights, I opened seed files and returned to the good old ritual of fixing formatting line by line. Sanitizing the question bank alone took at least two weeks of spare time, far more than I expected. When the beta finally shipped, I could breathe again. I used that breathing room to step back and rebuild the question-loading pipeline properly.
                            </p>
                            <p className="text-secondary">
                                That was the turning point: moving from content cleanup to workflow design.
                            </p>
                        </section>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Why Agents are Fun (and Why They’re Not Trivial)</h2>
                            <p className="text-secondary mb-6">
                                Tool calling is easy. Constructing a workable solution is not.
                            </p>
                            <p className="text-secondary mb-6">
                                Agents are not magical. They are structured decisions. The real work lies in designing workflows that survive edge cases, route correctly, know when to ask for help, and remain cost-efficient enough to run in production.
                            </p>
                            <p className="text-secondary mb-6">
                                Answer checking is a simple example. When an answer is numeric, deterministic validation works well. But when a response is symbolic, conceptual, or phrased differently from the canonical solution, rule-based checks often cannot decide correctness. That is when we call the model.
                            </p>
                            <p className="text-secondary mb-6">
                                We feed the AI the question prompt and canonical solution and ask whether the user’s answer matches the canonical answer. If it does not, we run a second step: evaluate the user’s answer directly against the prompt and grade it using an explicit rubric. Even in this easy case, the workflow matters as much as the model itself.
                            </p>
                            <p className="text-secondary">
                                AI is powerful precisely because it can do many small things, but it only becomes reliable when those things are arranged deliberately.
                            </p>
                        </section>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">A Tour of Qubiee’s Current AI System</h2>
                            <p className="text-secondary mb-6">
                                Today, Qubiee’s AI supports several classes of workflows.
                            </p>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-white font-serif text-xl mb-2">1) Question-level help</h3>
                                    <p className="text-secondary">
                                        Each question is treated as a first-class object. The system provides question-specific explanations anchored to the question ID and its canonical solution. Hints are progressive and stateful. The system looks up hint history from cache, generates hints across two to three distinct aspects, tracks which stage the user is currently at, and caches each newly generated hint to avoid repetition while preserving continuity.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-white font-serif text-xl mb-2">2) General concept chat</h3>
                                    <p className="text-secondary">
                                        When no question ID is provided, the system enters a general mode, focusing on intuition, conceptual explanations, and targeted practice guidance without tying the conversation to a single prompt.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-white font-serif text-xl mb-2">3) Performance analysis with intelligent routing</h3>
                                    <p className="text-secondary">
                                        The system pulls user performance data from Firestore, including accuracy, topic breakdowns, and trend signals. It supports multi-tool queries, such as comparing a user’s performance against global aggregates. Routing is hybrid by design. High-confidence requests are handled cheaply and quickly through regex routes. Questions like “How am I doing?” or “What are my weak areas?” are resolved deterministically, while an LLM fallback handles the long tail of ambiguous or nuanced phrasing.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-white font-serif text-xl mb-2">4) Report management APIs</h3>
                                    <p className="text-secondary">
                                        Users can submit issue reports ranging from incorrect answer keys to duplicated questions or validation errors. The system automatically evaluates reports. High-confidence cases are processed automatically, while lower-confidence ones are escalated to admins. Each escalation still includes a suggested diagnosis to reduce review time.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-white font-serif text-xl mb-2">5) Question upload pipeline</h3>
                                    <p className="text-secondary">
                                        The upload pipeline detects question type, validates answer correctness, rephrases content into quant interview style, categorizes topics and difficulty, extracts tags, checks for similarity and duplication, generates sequential QIDs, validates generator and checker expressions, and finally saves the question to the appropriate Firebase collection while indexing it in the RAG system.
                                    </p>
                                </div>
                            </div>
                            <p className="text-secondary mt-6">
                                It is a lot of moving pieces, and that is the point. Once you move beyond demos, AI stops being a single model call and starts looking like orchestration. Constraints, routing, and carefully designed interfaces between human judgment and machine inference begin to matter.
                            </p>
                        </section>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Vibe Coding, Upgraded</h2>
                            <p className="text-secondary mb-6">
                                I started coding with Cursor during my summer internship, and since then, the experience itself has changed dramatically.
                            </p>
                            <p className="text-secondary mb-6">
                                Back in June, there was no way I would have trusted an agent to generate entire files from just a few sentences. I still remember opening files filled with emoji-led error prints and watching a simple 100-line script balloon into something ten times longer and far less readable than the original problem.
                            </p>
                            <p className="text-secondary mb-6">
                                Fast forward to now, and the difference is stark. With essentially the same development habits, I find that as long as the instructions are clear, I rarely need to make changes to what the agent produces. In some cases, I am even comfortable letting the agent take control of my computer to debug issues on its own.
                            </p>
                            <p className="text-secondary mb-6">
                                This shift is not just subjective. During the summer, I worked on an algorithmically heavy quant optimization project and tried the strongest models available at the time. None of them could produce a correct implementation. Revisiting that same class of problems today, it feels entirely plausible that state-of-the-art models might succeed where earlier ones consistently failed. It may simply be the right moment to present those problems again and be ready to be surprised.
                            </p>
                            <p className="text-secondary mb-6">
                                Working with AI coding tools also reshaped my engineering process. After half a year of building with Cursor, I’ve learned that results correlate strongly with how I specify the work. I no longer dump vague instructions and hope for the best. Instead, I use a consistent loop:
                            </p>
                            <ol className="list-decimal pl-6 space-y-4 text-secondary mb-6">
                                <li>Define the problem precisely.</li>
                                <li>Ask the model to propose architectures and trade-offs, and brainstorm with it.</li>
                                <li>Write a plan (often as a short markdown spec).</li>
                                <li>Let the agent implement.</li>
                                <li>Read everything it generated.</li>
                                <li>Make small logic corrections, add test cases, and ask the agent to write tests.</li>
                                <li>Finish the manual setup and deploy.</li>
                            </ol>
                            <p className="text-secondary mb-6">
                                I have also become more opinionated about model choice as the ecosystem has matured. Claude Sonnet has become my default for most development tasks, while I switch to auto routing when the work is straightforward. But the deeper change is not about preference. It is about reliability. The tools themselves have crossed a threshold where end-to-end generation and autonomous debugging no longer feel risky by default.
                            </p>
                            <p className="text-secondary">
                                In hindsight, that is the clearest signal of progress. The improvement did not come from a single trick or technique. It came from rapid advances in models and tooling. Vibe coding did not just become faster. It became viable for increasingly complex, real-world engineering work.
                            </p>
                        </section>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <section>
                            <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">General Thoughts: The “Last 30%” is the Real Work</h2>
                            <p className="text-secondary mb-6">
                                In the first half of my internship, GPT-5 did not exist. Now, with new iterations across the ecosystem, including GPT-5.2, Gemini-3, and Claude Opus class models, the ceiling keeps rising. It is increasingly clear that imagination is not the limit of AI applications. It is only the starting line.
                            </p>
                            <p className="text-secondary mb-6">
                                Qubiee today is still a toy system in the scientific sense, not because it is weak, but because it is early. It can likely handle the majority of the problems we throw at it, perhaps 70 percent of what the product ultimately needs.
                            </p>
                            <p className="text-secondary mb-6">
                                The remaining 30 percent is where engineering turns into research. Building evaluation sets, cataloging failure modes, refining routing, keeping humans in the loop, and iterating relentlessly all live here. That final stretch can take orders of magnitude more time than the first. Building a truly excellent AI system is not a single breakthrough. It is sustained craftsmanship, teams of builders, state-of-the-art models, and the discipline to measure reliability as carefully as speed.
                            </p>
                            <p className="text-secondary">
                                And more than anything else, that is what this build taught me.
                            </p>
                        </section>
                    </RevealOnScroll>

                </div>
            </article>
        </div>
    );
};

export default QubieeAI;
