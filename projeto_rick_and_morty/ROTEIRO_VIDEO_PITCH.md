# 🎬 ROTEIRO COMPLETO PARA O VÍDEO PITCH (ATÉ 4 MINUTOS)

**Entregável:** 3. Vídeo Pitch (25% da nota)  
**Tempo Máximo:** 4 minutos  
**Onde hospedar:** YouTube (Não Listado ou Público)  
**Dica de Gravação:** Use o OBS Studio, Loom, ou gravador de tela do Windows (`Windows + Alt + R` ou Ferramenta de Captura).

---

## ⏱️ CRONOGRAMA MINUTO A MINUTO

### 00:00 - 00:45 | 1. Introdução e Visão Geral
* **O que mostrar na tela:** O site aberto no navegador, no topo da página (seção Hero).
* **O que falar:**
  > "Olá professor(a), me chamo Kelly e esta é a apresentação do meu projeto da disciplina de Desenvolvimento Web Front-End. O objetivo foi criar uma aplicação web interativa que consome uma API pública sobre o mundo dos desenhos animados, utilizando exclusivamente HTML, CSS e JavaScript puro, sem nenhum framework. Escolhi a API oficial de Rick and Morty, um desenho de enorme sucesso dos anos 2000, com dezenas de dimensões e centenas de personagens."

---

### 00:45 - 01:45 | 2. Demonstração em Tempo Real (Interface e Funcionalidades)
* **O que mostrar na tela:** 
  1. Role a página suavemente até a seção dos personagens.
  2. Digite "Morty" na barra de busca e veja os cards sendo atualizados.
  3. Mude o filtro de status para "Vivo" e depois para "Morto".
  4. Mostre a paginação clicando no botão "Próximo" ou na página 2.
  5. Abra a janela de navegação responsiva (ou inspecione em modo mobile) para mostrar o menu e a adaptação do grid.
* **O que falar:**
  > "Aqui podemos ver a página funcionando em tempo real. Observem que temos uma área de busca por nome com debounce, filtros por status vital (como vivo, morto ou desconhecido) e por espécie. Cada card exibe a foto oficial do personagem, nome, status com badge colorido, gênero traduzido, dimensão de origem, contagem de episódios e localização atual. Além disso, temos paginação dinâmica integrada diretamente com a contagem da API, permitindo navegar por mais de 800 personagens."

---

### 01:45 - 02:45 | 3. Demonstração Técnica no Navegador (DevTools / Console / Rede)
* **O que mostrar na tela:**
  1. Pressione `F12` para abrir o DevTools do navegador.
  2. Clique na aba **Console** e mostre que não há nenhum erro.
  3. Vá para a aba **Rede (Network)**, filtre por `Fetch/XHR`.
  4. Recarregue a página ou faça uma busca para mostrar a requisição `character?page=...` com código **200 OK**.
  5. Clique na requisição e mostre o JSON retornado com a chave `results` e o array de personagens.
* **O que falar:**
  > "Passando para a validação técnica exigida: abrindo o DevTools na aba Console, comprovamos que a aplicação roda limpa, sem erros de script. Na aba Rede (Network), podemos inspecionar as requisições HTTP do tipo fetch disparadas para a URL `rickandmortyapi.com/api/character`. Vemos o status 200 OK e a resposta pura em JSON com a lista de personagens, que é consumida assincronamente pelo navegador."

---

### 02:45 - 03:45 | 4. Explicação do Código e Validação da Criação Dinâmica
* **O que mostrar na tela:** O editor de código (VS Code) com o projeto aberto.
  1. **Mostre o `index.html`:** Destaque que a `div id="cardsContainer"` está **completamente vazia** no HTML estático.
  2. **Mostre o `script.js`:**
     - Aponte a função `buscarPersonagens()` com a chamada `fetch(url).then(...).catch(...)`.
     - Aponte a função `criarCards()`, mostrando claramente o uso de `document.createElement("div")`, criação da imagem, tags e a inserção com `appendChild()`.
* **O que falar:**
  > "Agora comprovando a arquitetura do código: no nosso arquivo `index.html`, vejam que não existe nenhum card fixo ou estático. O container `cardsContainer` é apenas um ponto de ancoragem no DOM. 
  > No `script.js`, realizamos o consumo através da função nativa `fetch()`, utilizando `.then()` para converter o fluxo em JSON e tratar exceções com `.catch()`. 
  > Em seguida, a função `criarCards()` itera sobre o array recebido e faz a manipulação direta do DOM, instanciando os elementos através de `document.createElement()` e montando a hierarquia com `appendChild()`. Cada card é 100% construído pelo JavaScript."

---

### 03:45 - 04:00 | 5. Conclusão e Encerramento
* **O que falar:**
  > "O projeto cumpre todos os requisitos: uso estrito de HTML, CSS e JavaScript puros, integração em tempo real via Fetch API, layout responsivo e coerente com o tema, e geração 100% dinâmica dos elementos. Agradeço pela atenção!"

---

## 📋 CHECKLIST ANTES DE ENVIAR O VÍDEO
- [ ] O áudio está nítido e compreensível?
- [ ] O vídeo tem menos de 4 minutos?
- [ ] A aba Rede/Network do DevTools apareceu mostrando a requisição da API?
- [ ] Os trechos `fetch` e `appendChild` foram mostrados no código?
- [ ] A configuração no YouTube está como **"Não Listado"** (*Unlisted*) ou **"Público"** para que o professor consiga acessar?
