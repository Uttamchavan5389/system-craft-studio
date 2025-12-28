/**
 * ReactBits Integration Examples
 * 
 * This file shows how to use ReactBits components in your system-craft-studio project.
 * Copy and adapt these examples to enhance your existing components.
 */

import { 
  ShinyText, 
  ClickSpark, 
  StarBorder, 
  Magnet, 
  Aurora, 
  particles as Particles,
  GlitchText,
  ScrollReveal,
  AnimatedContent,
  SpotlightCard,
  Bounce
} from "@appletosolutions/reactbits";

// ============================================
// Example 1: Enhanced Hero Section with ReactBits
// ============================================
export const EnhancedHeroExample = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#667eea", "#764ba2", "#f093fb"]}
        amplitude={1.2}
        speed={0.8}
      />
      
      <div className="relative z-10 text-center">
        {/* Shiny Text for Main Heading */}
        <ShinyText 
          text="Product Designer" 
          className="text-6xl md:text-8xl font-bold mb-4"
        />
        
        {/* Glitch Text for Subtitle */}
        <GlitchText 
          text="UI/UX Engineer" 
          className="text-3xl md:text-5xl"
        />
        
        {/* Magnetic CTA Button */}
        <div className="mt-8">
          <Magnet magnetStrength={0.3}>
            <ClickSpark sparkColor="#ffd700" sparkCount={20}>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:scale-105 transition-transform">
                View My Work
              </button>
            </ClickSpark>
          </Magnet>
        </div>
      </div>
    </section>
  );
};

// ============================================
// Example 2: Enhanced Button with ReactBits
// ============================================
export const EnhancedButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <ClickSpark sparkColor="#00d4ff" sparkCount={15} sparkRadius={30}>
      <StarBorder color="#ffd700" speed="2s">
        <button 
          onClick={onClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          {children}
        </button>
      </StarBorder>
    </ClickSpark>
  );
};

// ============================================
// Example 3: Scroll Reveal Section
// ============================================
export const ScrollRevealSection = () => {
  return (
    <section className="py-20">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto p-8 bg-slate-800/50 rounded-lg backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Scroll Reveal Effect</h2>
          <p className="text-slate-300">
            This content reveals smoothly as you scroll down the page.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
};

// ============================================
// Example 4: Animated Content Cards
// ============================================
export const AnimatedCards = () => {
  const cards = [
    { title: "Design", description: "UI/UX Design" },
    { title: "Development", description: "React & Next.js" },
    { title: "Systems", description: "ERP & POS" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {cards.map((card, index) => (
        <AnimatedContent key={index} direction="vertical" delay={index * 200}>
          <SpotlightCard>
            <div className="p-6 bg-slate-800/50 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-slate-300">{card.description}</p>
            </div>
          </SpotlightCard>
        </AnimatedContent>
      ))}
    </div>
  );
};

// ============================================
// Example 5: Particles Background
// ============================================
export const ParticlesBackgroundExample = () => {
  return (
    <div className="relative h-screen">
      <Particles
        particleCount={150}
        particleColors={["#667eea", "#764ba2"]}
        moveParticlesOnHover={true}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <ShinyText text="Particles Background" className="text-4xl font-bold" />
        </div>
      </div>
    </div>
  );
};

// ============================================
// Example 6: Bounce Animation
// ============================================
export const BounceExample = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Bounce delay={0}>
        <div className="p-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg text-white font-bold text-xl">
          Bouncing Element
        </div>
      </Bounce>
    </div>
  );
};

// ============================================
// Example 7: Magnetic Card Hover
// ============================================
export const MagneticCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <Magnet magnetStrength={0.3}>
      <div className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl cursor-pointer hover:scale-105 transition-transform">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/90">{description}</p>
      </div>
    </Magnet>
  );
};

// ============================================
// Example 8: Premium Feature Badge
// ============================================
export const PremiumBadge = ({ text }: { text: string }) => {
  return (
    <StarBorder color="#ffd700" speed="2s">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
        <span className="text-yellow-400 font-semibold">⭐ {text}</span>
      </div>
    </StarBorder>
  );
};

// ============================================
// Example 9: Enhanced Text with Multiple Effects
// ============================================
export const EnhancedTextExample = () => {
  return (
    <div className="space-y-8 p-8">
      <ShinyText text="Shiny Text Effect" className="text-4xl font-bold" />
      <GlitchText text="Glitch Text Effect" className="text-3xl" />
      <div className="flex gap-4">
        <ClickSpark>
          <span className="text-2xl font-semibold cursor-pointer">Click Me!</span>
        </ClickSpark>
      </div>
    </div>
  );
};

// ============================================
// Example 10: Full Page with Multiple Effects
// ============================================
export const FullPageExample = () => {
  return (
    <div className="min-h-screen">
      {/* Aurora Background */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#667eea", "#764ba2", "#f093fb"]}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Bounce delay={0}>
            <ShinyText 
              text="Welcome to ReactBits" 
              className="text-6xl font-bold mb-4"
            />
          </Bounce>
          <AnimatedContent direction="vertical" delay={300}>
            <p className="text-xl text-slate-300 mt-4">
              Beautiful animations and effects for your React applications
            </p>
          </AnimatedContent>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[1, 2, 3].map((i) => (
            <ScrollReveal key={i}>
              <SpotlightCard>
                <div className="p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-2">Card {i}</h3>
                  <p className="text-slate-300">Card content with spotlight effect</p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Magnet magnetStrength={0.3}>
            <ClickSpark sparkColor="#ffd700" sparkCount={20}>
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold text-lg">
                Get Started
              </button>
            </ClickSpark>
          </Magnet>
        </div>
      </div>
    </div>
  );
};

