import { useEffect, useState } from "react";
import sunflowerImage from "@/assets/sunflower.png";

interface Sunflower {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export const FallingSunflowers = () => {
  const [sunflowers, setSunflowers] = useState<Sunflower[]>([]);

  useEffect(() => {
    // Criar girassóis nas laterais
    const newSunflowers: Sunflower[] = [];
    
    // Lado esquerdo
    for (let i = 0; i < 5; i++) {
      newSunflowers.push({
        id: i,
        left: Math.random() * 15, // 0-15% da tela (lado esquerdo)
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        size: 20 + Math.random() * 15,
      });
    }
    
    // Lado direito
    for (let i = 5; i < 10; i++) {
      newSunflowers.push({
        id: i,
        left: 85 + Math.random() * 15, // 85-100% da tela (lado direito)
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        size: 20 + Math.random() * 15,
      });
    }
    
    setSunflowers(newSunflowers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sunflowers.map((sunflower) => (
        <div
          key={sunflower.id}
          className="absolute animate-fall opacity-40"
          style={{
            left: `${sunflower.left}%`,
            top: "-50px",
            animationDelay: `${sunflower.delay}s`,
            animationDuration: `${sunflower.duration}s`,
            width: `${sunflower.size}px`,
            height: `${sunflower.size}px`,
          }}
        >
          <img
            src={sunflowerImage}
            alt=""
            className="w-full h-full animate-spin-slow"
            style={{
              animationDuration: `${sunflower.duration * 0.5}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
