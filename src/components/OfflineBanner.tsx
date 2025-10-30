import { WifiOff } from "lucide-react";

/**
 * Banner de aviso quando o sistema está offline
 */
export const OfflineBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-700 shadow-lg animate-pulse">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-center gap-4">
          <WifiOff className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white">
            Sistema operando em modo offline
          </span>
        </div>
      </div>
    </div>
  );
};
