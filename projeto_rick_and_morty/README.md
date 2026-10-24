# 🛸 Rick & Morty - Universo de Personagens

Aplicação web interativa desenvolvida com **HTML5, CSS3 e JavaScript puro (Vanilla)** que consome a API oficial de Rick and Morty para exibição dinâmica de personagens em tempo real.

Projeto desenvolvido para a disciplina de **Desenvolvimento Web Front-End**.

---

## 🚀 Funcionalidades

- **Consumo de API RESTful em Tempo Real:** Integração via `fetch()` assíncrono com a [The Rick and Morty API](https://rickandmortyapi.com/).
- **Geração Dinâmica de Cards:** Nenhum card estático no HTML. Toda a estrutura é instanciada e injetada no DOM via `document.createElement()` e `appendChild()`.
- **Informações Detalhadas em Cada Card:**
  - Imagem do avatar oficial
  - Nome do personagem
  - Indicador de status vital (Vivo, Morto, Desconhecido) com cores temáticas
  - Espécie e Gênero (traduzido para o português)
  - Planeta ou dimensão de origem
  - Última localização conhecida
  - Quantidade de episódios em que aparece
- **Busca Textual com Debounce:** Pesquisa em tempo real com controle de requisições.
- **Filtros Combinados:** Filtragem por Status (Vivo, Morto, Desconhecido) e por Espécie (Humano, Alien, Robô, etc.).
- **Paginação Completa:** Navegação dinâmica por mais de 40 páginas e 800 personagens.
- **Interface Responsiva:** Design adaptável para celulares, tablets e desktops com menu hambúrguer interativo.
- **Feedback Visual:** Telas de carregamento (*loading*) animadas e tratamento de erros com opção de nova tentativa.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Marcação semântica e acessível.
- **CSS3:** Flexbox, CSS Grid, variáveis customizadas (`:root`), animações e Media Queries.
- **JavaScript (ES6+ Vanilla):** Manipulação da DOM, Fetch API, tratamento de eventos e Promises.
- **Google Fonts:** Tipografias temáticas *Creepster* e *Poppins*.

---

## 📂 Estrutura do Projeto

```text
web_development_front_end/
│
├── index.html              # Estrutura principal da página web
├── style.css               # Estilização completa e responsividade
├── script.js               # Lógica de consumo da API e manipulação do DOM
├── PARTE_TEORICA.md        # Relatório teórico completo (requisito do trabalho)
├── parte_teorica.html      # Versão pronta para impressão direta em PDF (Ctrl + P)
├── ROTEIRO_VIDEO_PITCH.md  # Script passo a passo para gravação do vídeo pitch (até 4 min)
└── README.md               # Documentação técnica do repositório
```

---

## 💻 Como Executar o Projeto

1. Clone este repositório ou baixe os arquivos em seu computador:
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   ```
2. Abra o arquivo `index.html` diretamente em qualquer navegador moderno (Google Chrome, Microsoft Edge, Mozilla Firefox, Opera).
3. Não é necessário instalar nenhuma dependência, Node.js ou servidor externo.

---

## 📤 Instruções para Envio ao GitHub

Caso precise subir o projeto para o seu GitHub pessoal:

```bash
# 1. Inicializar o repositório git local
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar o primeiro commit
git commit -m "feat: Projeto Rick and Morty completo com consumo de API e cards dinâmicos"

# 4. Vincular com o seu repositório remoto no GitHub
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# 5. Enviar os arquivos
git push -u origin main
```

---

## 📄 Licença e Créditos

- Dados e imagens fornecidos gratuitamente por [The Rick and Morty API](https://rickandmortyapi.com/).
- Projeto com finalidade exclusivamente acadêmica.
