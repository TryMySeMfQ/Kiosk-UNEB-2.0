import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";

/**
 * Carrossel automático de notícias institucionais
 */
export const NewsView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Lista de notícias (em produção, seria carregada de uma pasta de imagens)
  const noticias = [
    {
      titulo: "UNEB lança novo programa de extensão em Tecnologia",
      imagem: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1080&fit=crop",
      descricao: "Iniciativa visa aproximar universidade e comunidade através de projetos tecnológicos",
    },
    {
      titulo: "Semana de Ciência e Tecnologia começa na próxima segunda",
      imagem: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=1920&h=1080&fit=crop",
      descricao: "Palestras, workshops e hackathons marcam a programação do evento",
    },
    {
      titulo: "Alunos da UNEB conquistam primeiro lugar em competição nacional",
      imagem: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop",
      descricao: "Equipe se destacou na maratona de programação com projeto inovador",
    },
    {
      titulo: "Novo laboratório de Inteligência Artificial é inaugurado",
      imagem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop",
      descricao: "Espaço conta com equipamentos de última geração para pesquisa e ensino",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % noticias.length);
        setFade(true);
      }, 600);
    }, 30000); // Muda a cada 30 segundos

    return () => clearInterval(interval);
  }, [noticias.length]);

  const noticiaAtual = noticias[currentIndex];

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-[600ms] ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${noticiaAtual.imagem})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlay para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--kiosk-bg))] via-[hsl(var(--kiosk-bg))]/80 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 h-full flex flex-col justify-end p-16">
        <div
          className={`max-w-5xl transition-all duration-[600ms] ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge de notícia */}
          <div className="inline-flex items-center gap-3 bg-[hsl(var(--uneb-yellow))] text-[hsl(var(--kiosk-bg))] px-6 py-3 rounded-full mb-6">
            <Newspaper className="w-6 h-6" />
            <span className="text-2xl font-black uppercase tracking-wide">
              Notícia
            </span>
          </div>

          {/* Título */}
          <h2 className="text-7xl font-black text-white mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            {noticiaAtual.titulo}
          </h2>

          {/* Descrição */}
          <p className="text-3xl text-white/90 font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {noticiaAtual.descricao}
          </p>

          {/* Indicadores de página */}
          <div className="flex gap-3 mt-12">
            {noticias.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-16 bg-[hsl(var(--uneb-yellow))]"
                    : "w-8 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contador de notícias */}
      <div className="absolute top-8 right-8 bg-[hsl(var(--kiosk-bg))]/90 backdrop-blur-sm rounded-2xl px-6 py-4 border border-[hsl(var(--uneb-yellow))]">
        <span className="text-4xl font-black text-[hsl(var(--uneb-yellow))]">
          {currentIndex + 1} / {noticias.length}
        </span>
      </div>
    </div>
  );
};
