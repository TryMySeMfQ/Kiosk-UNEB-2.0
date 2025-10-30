import { KioskHeader } from "@/components/KioskHeader";
import { ScheduleView } from "@/components/ScheduleView";
import { NewsView } from "@/components/NewsView";
import { CreditsView } from "@/components/CreditsView";
import { OfflineBanner } from "@/components/OfflineBanner";
import { useKioskCycle } from "@/hooks/useKioskCycle";

/**
 * Página principal do Kiosk Digital UNEB
 * Alterna automaticamente entre horários e notícias
 * Aos domingos, exibe apenas a tela de créditos
 */
const Index = () => {
  const { currentView, isOnline, isDomingo } = useKioskCycle();

  return (
    <div className="min-h-screen bg-[hsl(var(--kiosk-bg))] flex flex-col overflow-hidden">
      {/* Banner offline */}
      {!isOnline && <OfflineBanner />}

      {/* Cabeçalho fixo (não exibe aos domingos) */}
      {!isDomingo && <KioskHeader />}

      {/* Área de conteúdo principal */}
      <main className={isDomingo ? "h-screen" : "flex-1 overflow-hidden"}>
        {isDomingo ? (
          <CreditsView />
        ) : currentView === "schedule" ? (
          <ScheduleView />
        ) : (
          <NewsView />
        )}
      </main>
    </div>
  );
};

export default Index;
