import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "CEO",
    company: "Promode Agro Farms",
    content: "Uttam delivered an exceptional ERP system that transformed our agricultural operations. The attention to detail and understanding of our business needs was outstanding.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Operations Director",
    company: "RetailTech Solutions",
    content: "The POS system design was intuitive and efficient. Our checkout times reduced by 40% after implementation. Highly recommend!",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "CTO",
    company: "AI Dynamics",
    content: "Working with Uttam on our AI automation platform was a game-changer. His understanding of complex workflows and AI integration is remarkable.",
    rating: 5,
  },
  {
    name: "Sneha Kapoor",
    role: "Product Manager",
    company: "FinFlow Systems",
    content: "Uttam's design for our accounts tracking system was both beautiful and functional. The user experience improvements exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Founder",
    company: "LogiNext",
    content: "The inventory management solution delivered was enterprise-grade yet remarkably user-friendly. Our team adoption rate was 95% in the first week.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "Head of Digital",
    company: "Commerce Plus",
    content: "Uttam brought a systems-thinking approach that helped us build a scalable e-commerce platform. His expertise in UI/UX is top-notch.",
    rating: 5,
  },
];

export const Testimonials = () => {
  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            What clients say about working with me
          </p>
        </div>
      </div>

      {/* Scrolling testimonials container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -50 * testimonials.length * 24],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      className="glass-card group relative min-w-[350px] max-w-[350px] p-6"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        {/* Quote icon */}
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Quote className="h-5 w-5 text-primary" />
        </div>

        {/* Stars */}
        <div className="mb-4 flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="h-4 w-4 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <span className="text-sm font-bold text-primary-foreground">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
