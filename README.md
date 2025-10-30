# 🖥️ Painel de Horários e Avisos - DCET II

![Status](https://img.shields.io/badge/Status-In_Development-green?style=for-the-badge&logo=git&logoColor=white&labelColor=464646&color=2EA043)
![Versão](https://img.shields.io/badge/Versão-2.0-red)

## 📋 Descrição
Projeto desenvolvido para a exibição dinâmica de horários de aulas, notícias institucionais e avisos no contexto universitário, promovendo maior integração entre a comunidade acadêmica e as informações institucionais.

## ✨ Funcionalidades
- 🕒 **Horários em tempo real**: Exibição das aulas do dia, com filtragem por turno (manhã, tarde, noite).
- 📰 **Quadro de notícias**: Rotação automática de imagens institucionais a cada 30 segundos.
- 📹 **Vídeo introdutório**: Reprodução automática com opção de ativar o áudio.
- 🌐 **Modo offline**: Tela especial informando perda de conexão.
- 📌 **Atualização automática**: Ciclo contínuo entre horários e quadro de notícias.

## 🛠️ Stack Tecnológico
| Componente | Tecnologia |
|------------|------------|
| Frontend | Vite, TypeScript, React, shadcn-ui, Tailwind CSS |
| Bibliotecas | Papa Parse 5.3, Bootstrap 5.2 |
| Hardware | Raspberry Pi 4 Model B |
| Sistema | Raspberry Pi OS Lite |



## ⚙️ Configuração e Instalação

### ✅ Pré-requisitos
- Servidor web (Apache, Nginx ou similar)
- Navegador moderno (Chrome, Firefox, Edge)
- Raspberry Pi (utilizado no modo quiosque com Bash Script)
  
```bash
# Para deploy em Raspberry Pi
sudo apt update && sudo apt install -y chromium-browser unclutter
```
### 📁 Estrutura de Arquivos

```
Kiosk-UNEB-2.0/
│
├── node_modules/
│
├── public/
│   ├── horarios/
│   │   ├── segunda.csv
│   │   ├── terca.csv
│   │   ├── quarta.csv
│   │   ├── quinta.csv
│   │   ├── sexta.csv
│   │   ├── sabado.csv
│   │   └── robots.txt
│   │
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── use-toast.ts
│   │   │
│   │   ├── AutoScrollList.tsx
│   │   ├── CreditsView.tsx
│   │   ├── KioskHeader.tsx
│   │   ├── NewsView.tsx
│   │   ├── OfflineBanner.tsx
│   │   └── ScheduleView.tsx
│   │
│   ├── config/
│   │   └── kiosk.config.ts
│   │
│   ├── data/
│   │   └── horarios.ts
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useKioskCycle.ts
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   └── pages/
│       ├── Index.tsx
│       ├── NotFound.tsx
│       ├── App.tsx
│       ├── App.css
│       ├── index.css
│       ├── main.tsx
│       └── vite-env.d.ts
│
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

## 🚀 Como Usar

1. **Substitua os arquivos conforme necessário:**
   - Adicione seus arquivos `.csv` em `assets/doc/horarios/`.
   - Coloque as imagens de notícias em `assets/doc/noticias/`.

2. **Configuração de tempo:**
   - No arquivo `classTime.js`:
     ```js
     setTimeout(nextNews, 30000); // Tempo por notícia (30s)
     const intervaloEntreSequencias = 30 * 1000; // Tempo entre ciclos (30s)
     ```
   - No `refresh.js`:
     ```js
     setInterval(() => location.reload(), 30 * 60 * 1000); // Reinício a cada 30 minutos
     ```

## 🖥️ Execução em Modo Quiosque com Raspberry Pi

O sistema foi configurado para rodar automaticamente em uma televisão utilizando um **Raspberry Pi** em modo **kiosk**, com auxílio de scripts Bash que iniciam o navegador em tela cheia ao ligar o dispositivo, garantindo funcionamento contínuo e autônomo.

## 📦 Dependências

- [Papa Parse](https://www.papaparse.com/) – Leitura de arquivos CSV
- [Bootstrap 5](https://getbootstrap.com/) – Estilização responsiva
- [Google Fonts – Roboto](https://fonts.google.com/specimen/Roboto) – Tipografia

## 🛠️ Troubleshooting

| Problema                       | Solução                                                                 |
|-------------------------------|--------------------------------------------------------------------------|
| Notícias não aparecem         | Verifique os caminhos e nomes das imagens no array `noticias[]` no `classTime.js`. |
| Horários não atualizam        | Confirme se os arquivos CSV possuem os cabeçalhos corretos:<br>`disciplina`, `professor`, `inicio`, `fim`, `sala`. |

## 👩‍💻 Sobre o Projeto de Extensão

Durante minha atuação como bolsista de extensão, participei de projetos voltados à integração entre universidade e comunidade, aplicando soluções tecnológicas em contextos educativos. Este painel de horários e avisos é um exemplo prático desse trabalho, conectando a experiência acadêmica à comunicação institucional de forma eficiente.

### Atividades realizadas:
- Organização de eventos, oficinas e palestras.
- Desenvolvimento de materiais educativos digitais.
- Criação de soluções práticas para problemas enfrentados pela comunidade.

### Habilidades desenvolvidas:
- Trabalho em equipe
- Gestão de projetos
- Comunicação e apresentação de soluções tecnológicas

## 📄 Licença

Este projeto é de uso institucional. Para uso ou modificação externa, consulte a coordenação responsável pelo DCET II.

