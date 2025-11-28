import { useState } from "react";
import { PlayButton } from "@/components/PlayButton";
import { ParticleTransition } from "@/components/ParticleTransition";
import { Sunflower } from "@/components/Sunflower";
import { LoveCounter } from "@/components/LoveCounter";
import { PhotoCarousel } from "@/components/PhotoCarousel";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handlePlayClick = () => {
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setHasStarted(true);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Partículas de fundo sutis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary/20 rounded-full animate-float" />
        <div className="absolute top-20 right-20 w-3 h-3 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {!hasStarted && !showTransition && (
        <div className="flex items-center justify-center min-h-screen">
          <PlayButton onClick={handlePlayClick} />
        </div>
      )}

      {showTransition && (
        <ParticleTransition onComplete={handleTransitionComplete} />
      )}

      {hasStarted && (
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 space-y-12">
            <Sunflower />
            <LoveCounter />
          </div>
          
          <PhotoCarousel />
        </div>
      )}
    </div>
  );
};

export default Index;
