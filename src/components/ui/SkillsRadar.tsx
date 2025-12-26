import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
  name: string;
  value: number;
}

interface SkillsRadarProps {
  skills: Skill[];
  size?: number;
}

export const SkillsRadar = ({ skills, size = 300 }: SkillsRadarProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const levels = 5;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
    const r = (radius * value) / 100;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
    const r = radius + 30;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = skills
    .map((skill, i) => {
      const point = getPoint(i, skill.value);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return (
    <div ref={ref} className="relative">
      <svg width={size} height={size} className="mx-auto">
        <defs>
          <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(180 100% 50% / 0.3)" />
            <stop offset="100%" stopColor="hsl(280 100% 70% / 0.3)" />
          </linearGradient>
          <linearGradient id="radar-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(180 100% 50%)" />
            <stop offset="100%" stopColor="hsl(280 100% 70%)" />
          </linearGradient>
        </defs>

        {/* Background circles */}
        {Array.from({ length: levels }).map((_, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={(radius * (i + 1)) / levels}
            fill="none"
            stroke="hsl(240 10% 20%)"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}

        {/* Axis lines */}
        {skills.map((_, i) => {
          const point = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="hsl(240 10% 20%)"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="url(#radar-gradient)"
          stroke="url(#radar-stroke)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ transformOrigin: "center" }}
        />

        {/* Data points */}
        {skills.map((skill, i) => {
          const point = getPoint(i, skill.value);
          return (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="6"
              fill="hsl(180 100% 50%)"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              className="drop-shadow-[0_0_6px_hsl(180_100%_50%)]"
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const point = getLabelPoint(i);
          return (
            <motion.text
              key={i}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
            >
              {skill.name}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
};
