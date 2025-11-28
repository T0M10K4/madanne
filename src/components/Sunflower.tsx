import sunflowerImage from "@/assets/sunflower.png";

export const Sunflower = () => {
  return (
    <div className="animate-bloom">
      <img 
        src={sunflowerImage} 
        alt="Girassol do nosso amor" 
        className="w-48 h-48 md:w-64 md:h-64 animate-float drop-shadow-[0_0_40px_hsl(var(--accent-glow)/0.6)]"
      />
    </div>
  );
};
