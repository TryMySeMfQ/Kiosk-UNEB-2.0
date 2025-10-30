/**
 * Configurações do Kiosk Digital UNEB
 * Todos os parâmetros de comportamento do painel
 */

export const KIOSK_CONFIG = {
  // Ordem do ciclo de visualizações
  cycleOrder: ["schedule", "news"] as const,
  
  // Duração de cada tela (ms)
  scheduleDurationMs: 45000, // 45 segundos
  newsDurationMs: 30000,      // 30 segundos
  
  // Auto-refresh da página
  autoRefreshMinutes: 30,
  
  // Atualização do relógio
  clockTickMs: 1000,
  
  // Horários
  showOnlyToday: true,
  defaultTurno: "all" as const,
  
  // Notícias (carrossel)
  newsSlideMs: 30000,
  fadeMs: 600,
  
  // Offline
  showOfflineBanner: true,
  
  // Comportamento kiosk
  disableContextMenu: true,
  hideCursor: true,
};

export type ViewType = typeof KIOSK_CONFIG.cycleOrder[number];
