import Papa from "papaparse";

export interface Horario {
  disciplina: string;
  professor: string;
  curso: string;
  inicio: string;
  fim: string;
  sala: string;
}

export function getDiaDaSemana(): string {
  const dias = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
  return dias[new Date().getDay()];
}

export async function loadHorariosDoDia(dia: string): Promise<Horario[]> {
  try {
    const url = `/public/horarios/${dia}.csv?ts=${Date.now()}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      console.error(`❌ Erro ao carregar: ${url} (HTTP ${response.status})`);
      return [];
    }

    const csvText = await response.text();
    if (!csvText.trim()) return [];

    const { data, errors } = Papa.parse<Horario>(csvText, {
      header: true,
      skipEmptyLines: true,
      delimiter: ";",
    });

    if (errors?.length) console.warn("⚠ Erros de parsing:", errors[0]);

    // Opcional: ordena por horário de início (HH:MM)
    const asMinutes = (hhmm: string) => {
      const [h, m] = hhmm.split(":").map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    return data
      .filter((r) => r?.disciplina && r?.inicio && r?.fim)
      .sort((a, b) => asMinutes(a.inicio) - asMinutes(b.inicio));
  } catch (e) {
    console.error("Erro ao processar o CSV:", e);
    return [];
  }
}


