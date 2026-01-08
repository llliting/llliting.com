
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionPageProps {
  title: string;
  description: string;
}

// Helper component for scroll-triggered animations
const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
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

export const SectionPage: React.FC<SectionPageProps> = ({ title, description }) => {
  // Specific content for Qubiee page
  if (title === 'Qubiee') {
    return (
      <div className="flex-grow flex flex-col pt-32 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto w-full animate-fade-in pb-20">
        <header className="mb-8 border-b border-white/10 pb-8 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-serif">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-secondary font-light leading-relaxed">
            Quant Prep, Reimagined.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12 font-light text-primary/90 leading-8 text-lg pb-16">
          <RevealOnScroll>
            <section>
              <p className="text-secondary">
                After two years in the quant recruiting trenches, I realized the biggest hurdle wasn't just the math—it was the chaos. Between outdated question banks and a "green book" filled with messy, color-coded iterations, I found myself more lost in the 200-page manual than in the actual problems.
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section>
              <p className="text-secondary">
                Qubiee is an all-in-one study application designed to streamline the quant journey. By integrating performance tracking, AI-powered guidelines, and a collaborative community, Qubiee turns a solitary, disorganized grind into a structured path toward a dream job.
              </p>
            </section>
          </RevealOnScroll>

          {/* Buttons Area */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-4">
            <a
              href="https://apps.apple.com/us/app/qubiee/id6754060406"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(230,220,207,0.2)] cursor-pointer inline-block text-center w-full md:w-auto"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 border border-primary/30 rounded-full group-hover:border-primary/0 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary transition-all duration-500 ease-out"></div>

              {/* Button Text */}
              <span className="relative z-10 font-serif text-base tracking-widest uppercase text-primary group-hover:text-[#1a120b] transition-colors duration-500 flex items-center justify-center gap-2">
                App Store
              </span>
            </a>

            <a
              href="https://qubieedu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(230,220,207,0.2)] cursor-pointer inline-block text-center w-full md:w-auto"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 border border-primary/30 rounded-full group-hover:border-primary/0 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary transition-all duration-500 ease-out"></div>

              {/* Button Text */}
              <span className="relative z-10 font-serif text-base tracking-widest uppercase text-primary group-hover:text-[#1a120b] transition-colors duration-500 flex items-center justify-center gap-2">
                Website
              </span>
            </a>
          </div>

          <RevealOnScroll>
            <section>
              <p className="text-secondary">
                I am proud to have brought this vision to life during my final semester of Financial Engineering at Columbia. The experience of building a product from 0 to 1, founding a tech start-up, self-learning, and iterating through collaboration has been an unforgettable milestone. The lessons I learned during this journey are ones I will carry with me throughout my career.
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="border-t border-white/10 pt-8 mt-8">
              <Link to="/thoughts/qubiee-ai" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors group">
                Thoughts on Building Qubiee (AI) <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </section>
          </RevealOnScroll>
        </div>
      </div>
    );
  }

  // Specific content for Wealth Rod page
  if (title === 'Wealth Rod') {
    return (
      <div className="flex-grow flex flex-col pt-32 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto w-full animate-fade-in pb-20">
        <header className="mb-8 border-b border-white/10 pb-8 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-serif">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-secondary font-light leading-relaxed">
            {description}
          </p>
        </header>

        {/* Center Interaction Area */}
        <div className="flex flex-col items-center justify-center py-16">
          {/* Primary CTA - Modern & Stylistic */}
          <button
            className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(230,220,207,0.3)] cursor-pointer"
            onClick={() => alert("Wealth Rod tool coming soon.")}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 border border-primary/30 rounded-full group-hover:border-primary/0 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary transition-all duration-500 ease-out"></div>

            {/* Button Text */}
            <span className="relative z-10 font-serif text-lg tracking-widest uppercase text-primary group-hover:text-[#1a120b] transition-colors duration-500">
              Try Wealth Rod
            </span>
          </button>
        </div>

        {/* Content - Always Visible with Scroll Animations */}
        <div className="space-y-16 font-light text-primary/90 leading-8 text-lg pb-24">
          <RevealOnScroll>
            <section>
              <p className="text-secondary">
                Polymath once suggested that we inhabit a world of simulation, where every emergence carries its own quiet significance. If that is true, then the sudden appearance of Bitcoin in late 2008 was no accident; it was the moment a new measuring rod slipped into human hands. History, seen this way, becomes a long practicum in evolution, and technological and socio-political advancements may, therefore, converge toward an optimal multi-planetary civilization. And when that day arrives, one question will tower above all others—what will serve as the final, ungameable unit of account for a species no longer bound to a single rock? That must be a framework that is globally accessible, mathematically constrained, and resistant to geopolitical manipulation.
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section>
              <h3 className="text-2xl font-serif text-white mb-4 border-l-2 border-primary/30 pl-4">The Need for Dual Perspective</h3>
              <p className="text-secondary">
                Drawing inspiration from the principles articulated in <em>The Bitcoin Standard</em>, this project engages with a core challenge in modern financial analysis: the instability of the official measuring rod. In a macroeconomic environment characterized by unprecedented Quantitative Easing and unconstrained fiscal policy, the traditional fiat currency functions as an unreliable, elastic metric. While these state-issued figures are essential for operational purposes, their susceptibility to base-rate distortion often obscures a clear understanding of genuine asset growth.
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section>
              <h3 className="text-2xl font-serif text-white mb-4 border-l-2 border-primary/30 pl-4">The Project's Complementary Metric</h3>
              <p className="text-secondary">
                This project offers an essential complementary tool for viewing and understanding your wealth. It is a simple, unflinching mechanism designed to translate the performance of your portfolio—or any critical asset—into the Bitcoin standard, focusing on quantifying its daily, monthly, and yearly movement relative to Bitcoin itself. Providing this metric alongside traditional dollar-denominated reports allows users to fully appreciate the real value of their assets through a lens of absolute scarcity. This perspective is not intended to replace existing standards but to provide a necessary dual perspective for anyone seeking a comprehensive understanding of their economic position in a world of complex, multi-layered valuation.
              </p>
            </section>
          </RevealOnScroll>
        </div>
      </div>
    );
  }

  // Default layout for other pages (Trades, Life, Thoughts, Qubiee)
  return (
    <div className="flex-grow flex flex-col pt-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full animate-fade-in">
      <header className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-serif">
          {title}
        </h2>
      </header>

      <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-sm bg-surface/20 backdrop-blur-sm">
        <p className="text-xl font-serif text-white/50 italic">Content coming soon</p>
        <div className="w-12 h-[1px] bg-white/20 mt-4"></div>
      </div>
    </div>
  );
};
