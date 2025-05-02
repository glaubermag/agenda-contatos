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
    
    npm install --global @capacitor/cli  

---

## 📦 Scripts Úteis

- **npm run dev**  
    Inicia o servidor Vite em modo de desenvolvimento.

- **npm run build**  
    Compila e tipa o projeto (vue-tsc && vite build).

- **npm run preview**  
    Previsualiza o build em um servidor local.

- **npm run json-server**  
    Inicia o mock de API (porta 3000) lendo db.json.

- **npm run test**  
    Executa os testes unitários com Vitest.

- **npm run test:coverage**  
    Roda testes e gera relatório de cobertura.

- **npm run copy-web**  
    Limpa e copia os arquivos dist/* para android/app/src/main/assets/www.

- **npm run android**  
    Build + copy-web + abre o projeto Android no Android Studio.

- **npm run android:livereload**  
    Build + copy-web + executa no dispositivo Android com live-reload.

- **npm run ios**  
    Build + copy-web + abre o projeto iOS no Xcode.

- **npm run ios:livereload**  
    Build + copy-web + executa no dispositivo iOS com live-reload.

---

## 💻 Como Executar no Navegador

1. Clone o repositório:  
    
    git clone https://github.com/glauber-mag/agenda-contatos.git  
    cd agenda-contatos  

2. Instale dependências:  
    
    npm install  

3. Inicie o json-server (em um terminal separado):  
    
    npm run json-server  

4. Inicie o servidor de desenvolvimento:  
    
    npm run dev  

---

## 📱 Como Executar no Android/iOS com Capacitor

1. Build da aplicação:  
    
    npm run build  

2. Inicialize o Capacitor (somente na primeira vez):  
    
    npx cap init agenda-contatos com.seuprojeto.agenda  

3. Adicione plataformas & sincronize:  
    
    npx cap add android  
    npx cap add ios  
    npm run copy-web  
    npx cap sync  

4. Abrir no Android Studio:  
    
    npm run android  

5. Abrir no Xcode (macOS):  
    
    npm run ios  

> ⚠️ **Dica:** sempre que fizer alterações na pasta dist/, execute npm run copy-web ou npm run android:livereload / npm run ios:livereload para refletir mudanças no app nativo.

---

## 🧪 Executando os Testes

Para executar os testes unitários:  
    
    npm run test  

Para relatório de cobertura:  
    
    npm run test:coverage  

---

## 🌟 Recursos de Acessibilidade

- **Alto Contraste**  
    - Ative pressionando o botão "Acessibilidade" ou usando Alt + A  
    - Melhora a legibilidade para usuários com deficiência visual

- **Tamanho da Fonte**  
    - Ajuste de 80% até 150%  
    - Controles intuitivos com botões A+ e A−

- **Redução de Movimento**  
    - Remove animações e transições  
    - Ideal para usuários com sensibilidade a movimento

- **Navegação por Teclado**  
    - Suporte completo para navegação por teclado  
    - Indicadores visuais de foco  
    - Atalhos de teclado para funções principais

---

## 📝 Estrutura do Projeto

    agenda-contatos/
    ├── src/
    │   ├── components/
    │   │   ├── accessibility/    # Componentes de acessibilidade
    │   │   ├── base/             # Componentes base reutilizáveis
    │   │   ├── contacts/         # Componentes de contatos
    │   ├── styles/               # Estilos globais e utilitários
    │   ├── tests/                # Testes unitários
    │   ├── views/                # Páginas / views
    │   └── App.vue               # Componente raiz
    ├── public/                   # Arquivos estáticos
    ├── db.json                   # Dados mock da API
    ├── capacitor.config.ts       # Configuração do Capacitor
    └── package.json              # Dependências e scripts

---

## 🤝 Contribuindo

1. Faça fork do projeto.  
2. Crie sua branch de feature:  
    
    git checkout -b feature/NomeDaFeature  

3. Commit suas mudanças:  
    
    git commit -m "Adiciona NomeDaFeature"  

4. Faça push para sua branch:  
    
    git push origin feature/NomeDaFeature  

5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](./LICENSE) para mais detalhes.

## 🔧 API

### Visão Geral
A API do projeto é construída em PHP e utiliza um arquivo JSON como banco de dados, oferecendo uma solução simples e eficiente para gerenciamento de contatos.

### Configuração da API
Para utilizar a API, você precisará:

- Um servidor com suporte a PHP 7.4 ou superior  
- Permissões de escrita para os arquivos:  
  - `db.json` (666 ou 777)  
  - `debug.log` (666 ou 777)  
- Extensões PHP necessárias:  
  - `json`  
  - `fileinfo`  

---

### Endpoints Disponíveis

| Método | Endpoint           | Descrição                       | Códigos de Retorno  |
|--------|--------------------|----------------------------------|---------------------|
| GET    | `/contacts`        | Lista todos os contatos         | 200                 |
| GET    | `/contacts/{id}`   | Retorna um contato específico   | 200, 404            |
| POST   | `/contacts`        | Cria um novo contato            | 201                 |
| PUT    | `/contacts/{id}`   | Atualiza um contato completamente | 200, 404          |
| PATCH  | `/contacts/{id}`   | Atualiza um contato parcialmente | 200, 404          |
| DELETE | `/contacts/{id}`   | Remove um contato               | 204, 404            |

---

### Sistema de Logs

O arquivo `debug.log` registra automaticamente:

- Data e hora da requisição  
- Método HTTP utilizado  
- URI acessada  
- ID do recurso (quando aplicável)  
- Dados completos em operações PUT  
- Erros e respostas 404 com IDs disponíveis  

---

### Tratamento de Erros

Respostas de erro incluem:

```json
{
  "error": "Contact not found",
  "requested_id": 123,
  "available_ids": [1, 2, 3, 4]
}
```

---

### Exemplos de Requisições

**Criar Contato (POST)**

```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "(11) 98765-4321",
  "website": "joaosilva.com.br",
  "company": {
    "name": "Empresa XYZ",
    "catchPhrase": "Inovação é nosso lema",
    "bs": "Soluções digitais"
  },
  "address": {
    "street": "Rua das Flores",
    "suite": "Apto 123",
    "city": "São Paulo",
    "zipcode": "01234-567",
    "geo": {
      "lat": "-23.5505",
      "lng": "-46.6333"
    }
  }
}
```

**Atualização Parcial (PATCH)**

```json
{
  "name": "João Silva Jr.",
  "email": "joao.jr@exemplo.com"
}
```

---

### Características Técnicas

- IDs são sempre numéricos e auto-incrementais  
- Conversão automática de IDs para inteiro  
- Reindexação automática após deleções  
- Suporte completo a CORS  
- Validação de tipos de dados  
- Logs detalhados para debug  
- Estrutura do arquivo JSON mantida consistente  

---

### Estrutura do Banco de Dados

O arquivo `db.json` mantém a seguinte estrutura:

```json
{
  "contacts": [
    {
      "id": 1,
      "name": "Nome do Contato",
      "email": "email@exemplo.com",
      "phone": "123456789",
      "website": "exemplo.com",
      "company": {
        "name": "Empresa",
        "catchPhrase": "Slogan",
        "bs": "Business"
      },
      "address": {
        "street": "Rua Exemplo",
        "suite": "Apto 123",
        "city": "Cidade",
        "zipcode": "12345-678",
        "geo": {
          "lat": "-23.5505",
          "lng": "-46.6333"
        }
      }
    }
  ]
}
```

---

### Notas de Implementação

- A API cria automaticamente o arquivo `db.json` se não existir  
- Logs são mantidos em `debug.log` para rastreamento  
- Todos os IDs são convertidos para inteiro para garantir consistência  
- CORS está configurado para permitir acesso de qualquer origem  
- Suporte a requisições OPTIONS para preflight CORS  
- Respostas sempre incluem cabeçalhos JSON apropriados  
