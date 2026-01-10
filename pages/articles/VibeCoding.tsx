import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Code, Terminal, Sparkles } from 'lucide-react';
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
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      {children}
    </div>
  );
};

const VibeCoding: React.FC = () => {
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
              <Code className="w-4 h-4" />
              ENGINEERING
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-serif">
            My Year of Vibe Coding
          </h1>
          
          <div className="flex flex-wrap gap-6 text-secondary font-light">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span>Topic: <span className="text-white font-medium">AI Tools</span></span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Focus: <span className="text-white font-medium">Reflection</span></span>
              </div>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-12 font-light text-primary/90 leading-8 text-lg">
          
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Reflections on Cursor, AI tools, and building real systems</h2>
              <p className="text-secondary mb-6">
                For AI, 2025 was the year of vibe coding. For me, it was too.
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section>
              <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">The Shift Felt (and Still Feels) Surreal</h2>
              <p className="text-secondary mb-6">
                When I first started using Cursor during my internship in June, I didn’t expect it to become my closest collaborator for the next six months. Since then, it has helped me with roughly 200,000 lines of code across very different domains: a quant optimization project for my internship, the iOS app and website for Qubiee, and an early version of our AI system.
              </p>
              <p className="text-secondary mb-6">
                Looking back now, what stands out most is not how much I built, but how dramatically vibe coding itself changed over that time.
              </p>
              <p className="text-secondary mb-6">
                Back in June, I would never have trusted an AI agent to generate an entire file from just a few sentences. I still remember giving what felt like a simple instruction and ending up with a code file full of emoji-laced error prints and nested try-excepts statements, watching a clean 100-line script balloon into something ten times longer, and realizing it was somehow less readable than the original problem. Most of the time, if I dared to give a vague or general instruction, I would be rewarded with a sprawling, broken codebase that seemed to appear out of nowhere. The tools were exciting, but brittle. You could feel the edge everywhere.
              </p>
              <p className="text-secondary mb-6">
                Fast forward to today, and the difference is stark.
              </p>
              <p className="text-secondary mb-6">
                With essentially the same development habits, I now find that if the instructions are clear, I rarely need to rewrite what the agent produces. In some cases, I’m even comfortable letting the agent take control of my computer to debug issues on its own. It can make a sequence of reasonable CLI calls, locate the issue, fix it, and test again without hand-holding.
              </p>
              <p className="text-secondary mb-6">
                That still feels a little surreal.
              </p>
              <p className="text-secondary">
                This shift isn’t just subjective. During the summer, I worked on an algorithmically heavy quant optimization project and tested the strongest models available at the time. None of them could produce a correct implementation. Revisiting that same class of problems today, it suddenly feels plausible that state-of-the-art models might succeed where earlier ones consistently failed. It might simply be the right moment to present those problems again and be ready to be surprised.
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section>
              <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">Vibe Coding is Reshaping My Engineering Process</h2>
              <p className="text-secondary mb-6">
                Working with AI coding tools didn’t just speed me up. It forced me to rethink how I work.
              </p>
              <p className="text-secondary mb-6">
                After half a year of building with Cursor, I’ve learned that results correlate strongly with how precisely I specify the work. I no longer dump vague instructions and hope for the best. Instead, I follow a loop that’s become almost ritual:
              </p>
              <ol className="list-decimal pl-6 space-y-4 text-secondary mb-6">
                  <li>Define the problem precisely.</li>
                  <li>Ask the model to propose architectures, trade-offs, and alternatives.</li>
                  <li>Write a short plan, often as a markdown spec.</li>
                  <li>Let the agent implement.</li>
                  <li>Read everything it generated.</li>
                  <li>Make small logic corrections, add edge cases, and ask the agent to write tests.</li>
                  <li>Finish the manual setup and deploy.</li>
              </ol>
              <p className="text-secondary mb-6">
                This loop sounds obvious, but it took months to internalize. The biggest shift was accepting that the “thinking” phase matters more than the typing phase. When the spec is good, the code is usually good.
              </p>
              <p className="text-secondary mb-6">
                I’ve also become more opinionated about model choice as the ecosystem matured. Claude Sonnet is my default for most development tasks, while I rely on auto-routing when the work is straightforward. But the deeper change isn’t about preference. It’s about reliability.
              </p>
              <p className="text-secondary mb-6">
                The tools have crossed a threshold where end-to-end generation and autonomous debugging no longer feel risky by default.
              </p>
              <p className="text-secondary">
                In hindsight, that’s the clearest signal of progress. The improvement didn’t come from a single trick or prompt. It came from steady advances in models and tooling. Vibe coding didn’t just become faster. It became viable for increasingly complex, real-world engineering work.
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section>
              <h2 className="text-2xl font-serif text-white mb-6 border-l-2 border-accent pl-4">The Last 30 Percent is the Real Work</h2>
              <p className="text-secondary mb-6">
                In the first half of my internship, GPT-5 didn’t exist. Now, with new iterations across the ecosystem—GPT-5.2, Gemini-3, and Claude Opus–class models—the ceiling keeps rising. It’s increasingly clear that imagination is no longer the limiting factor for AI applications. It’s only the starting line.
              </p>
              <p className="text-secondary mb-6">
                With the help of vibe coding tools, we were able to prototype Qubiee in roughly two months, something that would have been unthinkable before 2025. The pace felt almost like fast-forward, yet by the end of that push, close to 70 percent of the core functionality was working reliably. That experience mirrors what I’ve seen more broadly: AI makes the first phase of building dramatically easier.
              </p>
              <p className="text-secondary mb-6">
                But the remaining 30 percent is where engineering turns into research.
              </p>
              <p className="text-secondary mb-6">
                That final stretch is where you build evaluation sets, catalog failure modes, refine routing, keep humans in the loop, and iterate relentlessly. It’s where reliability, not velocity, becomes the constraint. Especially in AI-backed systems, that last 30 percent often takes orders of magnitude more time than the first. Building something truly excellent isn’t a single breakthrough moment. It’s sustained craftsmanship: teams of builders, state-of-the-art models, and the discipline to measure correctness and robustness as carefully as speed.
              </p>
              <p className="text-secondary mb-6">
                Looking ahead to 2026, what AI will enable feels genuinely exciting. For heavier workloads, agents still take tens of minutes to finish, and parallel execution remains expensive by nature. But that only reinforces the lesson: speed gets you most of the way there. The last 30 percent is still the real work.
              </p>
            </section>
          </RevealOnScroll>

        </div>
      </article>
    </div>
  );
};

export default VibeCoding;
