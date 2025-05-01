# Agenda de Contatos

Uma aplicação moderna e acessível para gerenciamento de contatos, desenvolvida com Vue.js e Tailwind CSS.

## 🚀 Funcionalidades

- ✨ Gerenciamento completo de contatos (CRUD)
- 🎨 Interface moderna e responsiva
- ♿ Recursos avançados de acessibilidade
  - Alto contraste
  - Ajuste de tamanho de fonte
  - Redução de movimento
  - Navegação por teclado
  - Compatibilidade com leitores de tela
- 🔍 Visualização detalhada de contatos
- 🏢 Informações completas incluindo dados empresariais
- 💾 Persistência de dados com json-server

## 🛠️ Tecnologias Utilizadas

- Vue.js 3 com TypeScript
- Tailwind CSS para estilização
- Vite como bundler
- json-server para simulação de API
- Vue Router para navegação
- Vitest para testes unitários

## ⚙️ Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/glauber-mag/agenda-contatos.git
   cd agenda-contatos
   Instale as dependências:
   bash
   Run
   npm install
   Inicie o json-server (em um terminal separado):
   bash
   Run
   npm run json-server
   Inicie a aplicação em modo de desenvolvimento:
   bash
   Run
   npm run dev
   🧪 Executando os Testes
   Para executar os testes unitários:
   
   bash
   Run
   npm run test
   🌟 Recursos de Acessibilidade
   Alto Contraste
   Ative pressionando o botão "Acessibilidade" ou usando o atalho Alt + A
   Melhora a legibilidade para usuários com deficiência visual
   Tamanho da Fonte
   Ajuste o tamanho da fonte de 80% até 150%
   Controles intuitivos com botões A+ e A-
   Redução de Movimento
   Remove animações e transições
   Ideal para usuários com sensibilidade a movimento
   Navegação por Teclado
   Suporte completo para navegação via teclado
   Indicadores visuais de foco
   Atalhos de teclado para funções principais
   📝 Estrutura do Projeto
   plaintext
   
   agenda-contatos/├── src/│   ├── components/│   │   ├── accessibility/    # Componentes de acessibilidade│   │   ├── base/            # Componentes base reutilizáveis│   │   ├── contacts/        # Componentes específicos de contatos│   ├── styles/              # Estilos globais e utilitários│   ├── tests/               # Testes unitários│   ├── views/               # Componentes de página│   └── App.vue             # Componente raiz├── public/                  # Arquivos públicos└── package.json            # Dependências e scripts
   🤝 Contribuindo
   Faça o fork do projeto
   Crie sua branch de feature (git checkout -b feature/AmazingFeature)
   Commit suas mudanças (git commit -m 'Add some AmazingFeature')
   Push para a branch (git push origin feature/AmazingFeature)
   Abra um Pull Request
   📄 Licença
   Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
   
   🎯 Próximos Passos
   Implementação de busca e filtros
   Exportação de contatos
   Temas personalizáveis
   Sincronização com serviços externos
   Suporte para múltiplos idiomas
   📞 Suporte
   Para reportar bugs ou sugerir novas funcionalidades, por favor abra uma issue no repositório.