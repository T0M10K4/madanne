import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "heart" | "circle" | "star";
  color: string;
}

export const DecorativeParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 25; i++) {
      const types: ("heart" | "circle" | "star")[] = ["heart", "circle", "star"];
      const colors = ["bg-primary/30", "bg-accent/30", "bg-primary-glow/30"];
      
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 8 + Math.random() * 20,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 8,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setParticles(newParticles);
  }, []);

  const renderParticle = (particle: Particle) => {
    if (particle.type === "heart") {
      return (
        <div className={`${particle.color} relative`} style={{ width: particle.size, height: particle.size }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <div className={`absolute top-0 left-0 w-1/2 h-1/2 ${particle.color.replace("/30", "/40")} rounded-full`} />
            <div className={`absolute top-0 right-0 w-1/2 h-1/2 ${particle.color.replace("/30", "/40")} rounded-full`} />
            <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[70%] ${particle.color.replace("/30", "/40")} rotate-45`} />
          </div>
        </div>
      );
    } else if (particle.type === "star") {
      return (
        <div className={`${particle.color}`} style={{ width: particle.size, height: particle.size }}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      );
    } else {
      return <div className={`${particle.color} rounded-full`} style={{ width: particle.size, height: particle.size }} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          {renderParticle(particle)}
        </div>
      ))}
    </div>
  );
};
