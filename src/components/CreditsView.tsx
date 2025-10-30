import { Users, Code, Palette, Database, Cpu } from "lucide-react";

/**
 * Tela de Créditos - exibida aos domingos
 */
export const CreditsView = () => {
  const equipe = [
    { nome: "Ana Carolina Silva", funcao: "Desenvolvimento Frontend", icon: Code },
    { nome: "Bruno Henrique Santos", funcao: "Design & UX", icon: Palette },
    { nome: "Carlos Eduardo Souza", funcao: "Infraestrutura & DevOps", icon: Cpu },
    { nome: "Diana Ferreira Lima", funcao: "Backend & Integração", icon: Database },
    { nome: "Eduardo Alves Costa", funcao: "Coordenação de Projeto", icon: Users },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-12 fade-in">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Logo ou título */}
        <div className="mb-16">
          <h1 className="text-7xl font-black text-white mb-6">
            Kiosk Digital UNEB
          </h1>
          <div className="h-2 w-32 bg-gradient-to-r from-[hsl(var(--uneb-yellow))] to-[hsl(var(--uneb-blue-light))] mx-auto rounded-full"></div>
        </div>

        {/* Seção de créditos */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-[hsl(var(--uneb-yellow))] mb-12">
            Produzido e Criado Por
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipe.map((membro, idx) => {
              const Icon = membro.icon;
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-[hsl(var(--kiosk-card))] to-[hsl(var(--kiosk-bg))] rounded-2xl p-8 shadow-[var(--shadow-card)] border border-[hsl(var(--border))] slide-in hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--uneb-yellow))] to-[hsl(var(--uneb-blue-light))] flex items-center justify-center mb-6">
                      <Icon className="w-10 h-10 text-[hsl(var(--kiosk-bg))]" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">
                      {membro.nome}
                    </h3>
                    <p className="text-lg text-[hsl(var(--kiosk-text-secondary))]">
                      {membro.funcao}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-16 text-[hsl(var(--muted-foreground))] text-xl">
          <p>Universidade do Estado da Bahia - UNEB</p>
          <p className="mt-2">© {new Date().getFullYear()} - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};
