# Agenda de Contatos

Uma aplicação moderna, responsiva e acessível para gerenciamento de contatos, desenvolvida com Vue 3, Capacitor e Tailwind CSS.

## 🚀 Funcionalidades

- ✨ Gerenciamento completo de contatos (CRUD)
- 🎨 Interface moderna e responsiva
- ♿ Recursos avançados de acessibilidade:
  - Alto contraste
  - Ajuste de tamanho de fonte
  - Redução de movimento
  - Navegação por teclado
  - Compatibilidade com leitores de tela
- 🔍 Visualização detalhada de contatos
- 🏢 Informações completas incluindo dados empresariais
- 💾 Persistência de dados com json-server

## 🛠️ Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/) com TypeScript
- [Vite](https://vitejs.dev/) como bundler
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [Vue Router](https://router.vuejs.org/) para navegação
- [Pinia](https://pinia.vuejs.org/) para gerenciamento de estado
- [json-server](https://github.com/typicode/json-server) para simulação de API
- [Vitest](https://vitest.dev/) para testes unitários
- [Capacitor](https://capacitorjs.com/) para build mobile

## ⚙️ Pré-requisitos

- Node.js v14 ou superior
- npm ou yarn
- Android Studio (para Android)
- Xcode (para iOS)
- Capacitor CLI instalado globalmente:
  ```bash
  npm install --global @capacitor/cli
  ```

---

## 💻 Como Executar no Navegador

1. Clone o repositório:
   ```bash
   git clone https://github.com/glauber-mag/agenda-contatos.git
   cd agenda-contatos
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o json-server (em um terminal separado):
   ```bash
   npm run json-server
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 📱 Como Executar no Android/iOS com Capacitor

### 1. Build da aplicação
```bash
npm run build
```

### 2. Inicialize o Capacitor (se for a primeira vez)
```bash
npx cap init agenda-contatos com.seuprojeto.agenda
```

### 3. Sincronize os recursos da web com o projeto nativo
```bash
npx cap add android
npx cap add ios
npx cap sync
```

### 4. Abrir no Android Studio
```bash
npx cap open android
```

### 5. Abrir no Xcode (MacOS necessário)
```bash
npx cap open ios
```

> ⚠️ **Dica:** sempre que fizer mudanças na pasta `dist/`, execute novamente `npm run build` seguido de `npx cap sync`.

---

## 🧪 Executando os Testes

Para executar os testes unitários:
```bash
npm run test
```

---

## 🌟 Recursos de Acessibilidade

- **Alto Contraste**
  - Ative pressionando o botão "Acessibilidade" ou usando o atalho `Alt + A`
  - Melhora a legibilidade para usuários com deficiência visual

- **Tamanho da Fonte**
  - Ajuste o tamanho da fonte de 80% até 150%
  - Controles intuitivos com botões A+ e A−

- **Redução de Movimento**
  - Remove animações e transições
  - Ideal para usuários com sensibilidade a movimento

- **Navegação por Teclado**
  - Suporte completo para navegação via teclado
  - Indicadores visuais de foco
  - Atalhos de teclado para funções principais

---

## 📝 Estrutura do Projeto

```plaintext
agenda-contatos/
├── src/
│   ├── components/
│   │   ├── accessibility/    # Componentes de acessibilidade
│   │   ├── base/            # Componentes base reutilizáveis
│   │   ├── contacts/        # Componentes específicos de contatos
│   ├── styles/              # Estilos globais e utilitários
│   ├── tests/               # Testes unitários
│   ├── views/               # Componentes de página
│   └── App.vue             # Componente raiz
├── public/                  # Arquivos públicos
└── package.json            # Dependências e scripts
```

---

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua branch de feature:
   ```bash
   git checkout -b feature/NomeDaFeature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Adiciona NomeDaFeature'
   ```
4. Faça push para sua branch:
   ```bash
   git push origin feature/NomeDaFeature
   ```
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
