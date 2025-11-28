import { useEffect, useState } from "react";

interface ParticleTransitionProps {
  onComplete: () => void;
}

export const ParticleTransition = ({ onComplete }: ParticleTransitionProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    // Criar partículas
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 500 - 250,
      y: Math.random() * 500 - 250,
      color: i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-accent" : "bg-primary-glow",
    }));
    
    setParticles(newParticles);

    // Completar após a animação
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-4 h-4 rounded-full ${particle.color}`}
          style={{
            '--tx': `${particle.x}px`,
            '--ty': `${particle.y}px`,
            animation: 'particle-burst 1s ease-out forwards',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
