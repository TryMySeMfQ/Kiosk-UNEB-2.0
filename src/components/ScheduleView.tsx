import { useState, useEffect } from "react";
import { loadHorariosDoDia, getDiaDaSemana, type Horario } from "@/data/horarios";
import { BookOpen, Clock, User, MapPin } from "lucide-react";
import { AutoScrollList } from "./AutoScrollList"; // ajuste o caminho

const diaLabel = (d: string) => {
  if (["segunda", "terca", "quarta", "quinta", "sexta"].includes(d)) return `${d}-feira`;
  return d;
};

export const ScheduleView = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const diaAtual = getDiaDaSemana();

  useEffect(() => {
    loadHorariosDoDia(diaAtual).then(setHorarios);
  }, [diaAtual]);

  return (
    <div className="w-full h-full p-12 fade-in overflow-y-auto">
      <div className="max-w-[1400px] mx-auto">
        {/* Título */}
        <div className="mb-10 text-center">
          <h2 className="text-6xl font-black text-white mb-4">Horários de Hoje</h2>
          <div className="text-3xl text-[hsl(var(--uneb-yellow))] font-bold capitalize">
            {diaLabel(diaAtual)}
          </div>
        </div>

        {/* Lista com auto-scroll */}
        {horarios.length > 0 ? (
          <AutoScrollList
            items={horarios}
            height={600}       // ajuste a janela visível conforme sua tela
            speed={32}         // px/s: aumente/diminua para deixar mais rápido/lento
            pauseOnHover       // opcional: pausar quando passar o mouse
            className="space-y-4"
            renderItem={(horario, idx) => (
              <div
                className="bg-gradient-to-r from-[hsl(var(--kiosk-card))] to-[hsl(var(--kiosk-bg))] rounded-2xl p-6 shadow-[var(--shadow-card)] border-l-4 border-[hsl(var(--uneb-yellow))] hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-8">
                  {/* Horário */}
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <Clock className="w-6 h-6 text-[hsl(var(--uneb-yellow))]" />
                    <span className="text-3xl font-black text-white">
                      {horario.inicio} - {horario.fim}
                    </span>
                  </div>

                  {/* Disciplina */}
                  <div className="flex items-start gap-3 flex-1">
                    <BookOpen className="w-6 h-6 text-[hsl(var(--uneb-blue-light))] mt-1 flex-shrink-0" />
                    <span className="text-2xl font-bold text-[hsl(var(--kiosk-text-primary))] leading-tight">
                      {horario.disciplina}
                    </span>
                  </div>

                  {/* Professor */}
                  <div className="flex items-center gap-3 min-w-[280px]">
                    <User className="w-5 h-5 text-[hsl(var(--kiosk-text-secondary))]" />
                    <span className="text-xl text-[hsl(var(--kiosk-text-secondary))]">
                      {horario.professor}
                    </span>
                  </div>

                  {/* Sala */}
                  <div className="flex items-center gap-3 min-w-[150px]">
                    <MapPin className="w-5 h-5 text-[hsl(var(--uneb-yellow))]" />
                    <span className="text-xl font-bold text-[hsl(var(--uneb-yellow))]">
                      {horario.sala}
                    </span>
                  </div>
                </div>
              </div>
            )}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-3xl text-[hsl(var(--muted-foreground))]">
              Sem aulas programadas para hoje
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


