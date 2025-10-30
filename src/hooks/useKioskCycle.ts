import { useState, useEffect } from "react";
import { KIOSK_CONFIG, type ViewType } from "@/config/kiosk.config";
import { getDiaDaSemana } from "@/data/horarios";

/**
 * Hook para gerenciar o ciclo automático entre as visualizações do kiosk
 */
export const useKioskCycle = () => {
  const diaAtual = getDiaDaSemana();
  const isDomingo = diaAtual === "domingo";
  
  const [currentView, setCurrentView] = useState<ViewType>(isDomingo ? "schedule" : "schedule");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Detecta conexão online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Ciclo automático entre views (não roda aos domingos - apenas créditos)
  useEffect(() => {
    if (isDomingo) return; // Aos domingos, fica travado na tela de créditos

    const getDuration = (view: ViewType) => {
      return view === "schedule"
        ? KIOSK_CONFIG.scheduleDurationMs
        : KIOSK_CONFIG.newsDurationMs;
    };

    const timer = setTimeout(() => {
      setCurrentView((prev) => {
        const currentIndex = KIOSK_CONFIG.cycleOrder.indexOf(prev);
        const nextIndex = (currentIndex + 1) % KIOSK_CONFIG.cycleOrder.length;
        return KIOSK_CONFIG.cycleOrder[nextIndex];
      });
    }, getDuration(currentView));

    return () => clearTimeout(timer);
  }, [currentView, isDomingo]);

  // Auto-refresh da página
  useEffect(() => {
    if (KIOSK_CONFIG.autoRefreshMinutes > 0) {
      const refreshInterval = KIOSK_CONFIG.autoRefreshMinutes * 60 * 1000;
      const timer = setTimeout(() => {
        window.location.reload();
      }, refreshInterval);

      return () => clearTimeout(timer);
    }
  }, []);

  // Desabilitar context menu (kiosk mode)
  useEffect(() => {
    if (KIOSK_CONFIG.disableContextMenu) {
      const preventDefault = (e: Event) => e.preventDefault();
      document.addEventListener("contextmenu", preventDefault);
      return () => document.removeEventListener("contextmenu", preventDefault);
    }
  }, []);

  // Desabilitar atalhos de teclado problemáticos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F11 (fullscreen), Ctrl+S (save), etc.
      if (
        e.key === "F11" ||
        (e.ctrlKey && ["s", "p", "u"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { currentView, isOnline, isDomingo };
};
