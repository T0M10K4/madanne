import { useEffect, useState } from "react";

export const LoveCounter = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date("2023-09-16T00:00:00");

    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Calcular anos e meses mais precisamente
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      
      if (months < 0) {
        years--;
        months += 12;
      }

      const remainingDays = days - (years * 365 + Math.floor(years / 4)) - (months * 30);

      setTimeElapsed({
        years,
        months,
        days: remainingDays,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <h2 className="text-4xl md:text-5xl font-romantic text-foreground drop-shadow-lg">
        Eu te amo há...
      </h2>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-4xl mx-auto">
        <TimeUnit value={timeElapsed.years} label="Anos" />
        <TimeUnit value={timeElapsed.months} label="Meses" />
        <TimeUnit value={timeElapsed.days} label="Dias" />
        <TimeUnit value={timeElapsed.hours} label="Horas" />
        <TimeUnit value={timeElapsed.minutes} label="Minutos" />
        <TimeUnit value={timeElapsed.seconds} label="Segundos" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary/20">
      <div className="text-3xl md:text-4xl font-counter font-bold text-primary tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-sm md:text-base font-counter text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
};
