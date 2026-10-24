# RELATÓRIO TEÓRICO: DESENVOLVIMENTO DE APLICAÇÃO FRONT-END COM CONSUMO DE API

**Disciplina:** Desenvolvimento Web Front-End  
**Projeto:** Rick and Morty Universe Explorer  
**Tecnologias:** HTML5, CSS3 e JavaScript (Vanilla / Puro)  
**Autor(a):** Kelly  

---

## 1. O que é uma API e como funciona o consumo de dados em tempo real

Uma **API** (*Application Programming Interface*, ou Interface de Programação de Aplicações) é um conjunto de padrões, protocolos e rotinas que permite a comunicação e a troca de dados entre diferentes sistemas computacionais. No desenvolvimento web moderno, as APIs baseadas no padrão **REST** (*Representational State Transfer*) operam sobre o protocolo **HTTP/HTTPS**, permitindo que clientes (como o navegador web) solicitem e recebam dados estruturados — usualmente no formato **JSON** (*JavaScript Object Notation*).

### Funcionamento do Consumo em Tempo Real:
1. **Requisição do Cliente (*Request*):** O navegador dispara uma solicitação HTTP (geralmente do tipo `GET`) para um endpoint específico da API (ex.: `https://rickandmortyapi.com/api/character`).
2. **Processamento no Servidor:** O servidor da API recebe a requisição, processa parâmetros de consulta (*query parameters*, como filtros por nome, status ou página), consulta o banco de dados e empacota os registros encontrados em JSON.
3. **Resposta do Servidor (*Response*):** O servidor devolve a resposta contendo código de status HTTP (ex.: `200 OK`, `404 Not Found`), cabeçalhos (*headers*) e o corpo da mensagem (*body*) em JSON.
4. **Atualização Dinâmica no Cliente:** A aplicação JavaScript no navegador recebe os dados de forma assíncrona, faz o *parsing* do JSON e injeta as informações imediatamente na interface sem necessidade de recarregar a página (*Single Page Application* behavior).

---

## 2. Conceito de DOM Manipulation e a Criação de Elementos Dinâmicos via JavaScript

O **DOM** (*Document Object Model*, Modelo de Objeto do Documento) é uma interface de programação que representa a estrutura de um documento HTML como uma árvore hierárquica de nós (*nodes* e *elements*).

A **Manipulação do DOM** (*DOM Manipulation*) consiste em utilizar a linguagem JavaScript para acessar, criar, alterar estilos, atributos e remover elementos da árvore DOM em tempo de execução, reagindo a eventos do usuário ou à chegada de dados assíncronos de uma API.

### Importância da Criação Dinâmica:
Ao invés de codificar cards estáticos fixos no arquivo HTML:
- O HTML mantém apenas a casca estrutural (containers sem conteúdo estático predeterminado).
- O JavaScript lê o vetor de objetos retornado pela API e instancia os elementos em memória conforme a quantidade exata de itens recebidos.
- Isso confere escalabilidade: a interface adapta-se automaticamente a 1, 20 ou 1000 registros sem alteração no código-fonte da marcação.

---

## 3. Explicação das Funções Básicas Utilizadas para Consumo da API

Para concretizar o consumo e renderização dos dados, foram utilizadas funções nativas do ecossistema JavaScript do navegador:

### A) `fetch(url)`
A API `Fetch` fornece uma interface moderna e baseada em **Promises** para realizar requisições HTTP assíncronas. Ela substitui o antigo padrão `XMLHttpRequest` com uma sintaxe mais limpa e encadeável.

```javascript
fetch("https://rickandmortyapi.com/api/character?page=1")
    .then(response => {
        if (!response.ok) throw new Error("Erro HTTP: " + response.status);
        return response.json();
    })
    .then(data => {
        criarCards(data.results);
    })
    .catch(error => console.error("Falha na requisição:", error));
```

### B) `.then()` e `.catch()`
- **`.then(callback)`:** Manipula a resolução bem-sucedida de uma *Promise*. O primeiro `.then()` recebe o objeto `Response` bruto e invoca `response.json()` (que também é assíncrono). O segundo `.then()` recebe os dados convertidos em objeto JavaScript.
- **`.catch(callback)`:** Trata qualquer rejeição ou erro de rede/execução ocorrido no pipeline, permitindo exibir feedback visual ao usuário sem travar a aplicação.

### C) `document.createElement(tagName)`
Cria um novo elemento HTML especificado pela tag informada (ex.: `"div"`, `"img"`, `"h3"`, `"span"`), instanciando o nó na memória antes de sua inserção no DOM visível.

### D) `node.appendChild(childNode)`
Adiciona um nó como o último filho de um elemento pai existente ou recém-criado, construindo a hierarquia visual (ex.: inserindo nome, imagem e tags dentro da `div.card` e anexando o card ao `div#cardsContainer`).

---

## 4. Motivo da Escolha da API Rick and Morty

A API escolhida para o projeto foi a **Rick and Morty API** ([https://rickandmortyapi.com/](https://rickandmortyapi.com/)). Os principais fatores que motivaram a escolha foram:

1. **Relevância e Sucesso Cultural:** Rick and Morty é uma das animações de ficção científica mais influentes e premiadas dos anos 2010 até hoje, reunindo uma vasta galeria de personagens e universos paralelos.
2. **Acesso Público e Gratuito:** A API é 100% aberta, sem necessidade de chaves de API pagas ou restrições cadastrais excessivas, ideal para ambientes acadêmicos e demonstração técnica ao vivo.
3. **Riqueza de Metadados:** Cada personagem possui atributos estruturados completos (nome, imagem de alta resolução, status vital, espécie, gênero, planeta de origem, localização atual e lista de aparições em episódios), viabilizando uma interface rica e detalhada.
4. **Suporte Nativo a Filtros e Paginação:** A API oferece parâmetros de consulta para busca por nome (`name`), filtragem por status (`status`), espécie (`species`) e controle de paginação (`page`), permitindo implementar uma aplicação interativa e completa.

---

## 5. Regras de Acesso e Documentação da API Utilizada

### A) Autenticação e Chaves de Acesso
- **Token de Acesso / API Key:** Não é exigido. O endpoint é de livre acesso via CORS (*Cross-Origin Resource Sharing*), viabilizando requisições diretas a partir de qualquer navegador web cliente.

### B) Limites de Requisições (*Rate Limiting*)
- A API pública estabelece políticas de uso justo (*fair use*), com limites padrão em torno de **10.000 requisições por dia por endereço IP**.
- Para evitar chamadas desnecessárias e sobrecarga, a aplicação implementou uma estratégia de **Debounce** (atraso de 500ms) no campo de busca textual.

### C) Estrutura das Respostas
As requisições retornam objetos JSON estruturados em duas seções fundamentais:

```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "gender": "Male",
      "origin": { "name": "Earth (C-137)" },
      "location": { "name": "Citadel of Ricks" },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": ["https://rickandmortyapi.com/api/episode/1", "..."]
    }
  ]
}
```

- **`info`:** Metadados sobre a contagem total de itens (`count`) e número total de páginas (`pages`), essenciais para construir a barra de paginação e os indicadores estatísticos.
- **`results`:** Vetor com 20 personagens por página contendo todas as propriedades renderizadas dinamicamente na tela.
