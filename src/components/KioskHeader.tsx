import { useEffect, useState } from "react";

/**
 * Cabeçalho do Kiosk com logo UNEB, título e relógio ao vivo
 */
export const KioskHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className="w-full bg-gradient-to-r from-[hsl(var(--uneb-blue))] to-[hsl(var(--uneb-blue-light))] shadow-[var(--shadow-header)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-8 py-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo e Título */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[hsl(var(--uneb-blue))] font-black text-3xl">UNEB</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                Kiosk Digital UNEB
              </h1>
              <p className="text-lg text-white/80 font-medium mt-1">
                Departamento de Ciências Exatas e da Terra
              </p>
            </div>
          </div>

          {/* Relógio e Data */}
          <div className="text-right">
            <div className="text-6xl font-black text-[hsl(var(--uneb-yellow))] tracking-wider text-shadow-glow">
              {formatTime(currentTime)}
            </div>
            <div className="text-xl text-white/90 font-medium mt-2 capitalize">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-2 bg-gradient-to-r from-[hsl(var(--uneb-yellow))] via-[hsl(var(--uneb-yellow-dark))] to-[hsl(var(--uneb-yellow))]" />
    </header>
  );
};
