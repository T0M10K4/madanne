import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import backgroundMusic from "@/assets/background-music.mp3";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export const AudioPlayer = ({ autoPlay = false }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    if (autoPlay) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [autoPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-card/60 backdrop-blur-sm border-t border-primary/20 py-6 px-4 animate-fade-in" style={{ animationDelay: "1.5s" }}>
      <audio ref={audioRef} src={backgroundMusic} loop />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Progress Bar */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-xs font-counter text-muted-foreground min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
            
            <span className="text-xs font-counter text-muted-foreground min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="flex-shrink-0 w-10 h-10 rounded-full hover:bg-secondary text-foreground flex items-center justify-center transition-all duration-300"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Song Title */}
        <div className="text-center mt-4">
          <p className="text-sm font-romantic text-foreground/80">
            Você Endoideceu Meu Coração
          </p>
        </div>
      </div>
    </div>
  );
};
