import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlayButtonProps {
  onClick: () => void;
}

export const PlayButton = ({ onClick }: PlayButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="relative w-32 h-32 rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_60px_hsl(var(--primary-glow)/0.5)] animate-pulse transition-all duration-300 hover:scale-110 border-4 border-primary-foreground/20"
    >
      <Play className="w-16 h-16 text-primary-foreground fill-primary-foreground ml-2" />
    </Button>
  );
};
