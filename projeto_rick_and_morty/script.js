/* ================================================
   Rick and Morty - Script Principal
   Consumo da API e criação dinâmica de cards
   ================================================ */

// ===== URL base da API =====
const API_BASE = "https://rickandmortyapi.com/api/character";

// ===== Referências aos elementos do DOM =====
const cardsContainer = document.getElementById("cardsContainer");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const retryBtn = document.getElementById("retryBtn");
const paginationEl = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const speciesFilter = document.getElementById("speciesFilter");
const totalCharsEl = document.getElementById("totalChars");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

// ===== Estado da aplicação =====
let paginaAtual = 1;
let totalPaginas = 1;

// ================================================
// FUNÇÕES DE EXIBIÇÃO (Loading / Erro)
// ================================================

/**
 * Exibe o indicador de carregamento e esconde
 * o container de cards e a mensagem de erro.
 */
function mostrarLoading() {
    loadingEl.classList.remove("hidden");
    loadingEl.style.display = "flex";
    cardsContainer.innerHTML = "";
    errorEl.style.display = "none";
    paginationEl.innerHTML = "";
}

/**
 * Esconde o indicador de carregamento.
 */
function esconderLoading() {
    loadingEl.classList.add("hidden");
    loadingEl.style.display = "none";
}

/**
 * Exibe a mensagem de erro e esconde o loading.
 */
function mostrarErro() {
    esconderLoading();
    errorEl.style.display = "block";
    cardsContainer.innerHTML = "";
    paginationEl.innerHTML = "";
}

// ================================================
// FUNÇÃO PRINCIPAL: BUSCAR PERSONAGENS NA API
// ================================================

/**
 * Busca personagens na Rick and Morty API usando fetch.
 * Monta a URL com os filtros de busca, status e espécie.
 *
 * @param {number} pagina - Número da página a ser buscada
 */
function buscarPersonagens(pagina) {
    // Captura os valores atuais dos filtros
    const nome = searchInput.value.trim();
    const status = statusFilter.value;
    const species = speciesFilter.value;

    // Monta a URL com os parâmetros de consulta (query params)
    let url = API_BASE + "?page=" + pagina;

    if (nome) {
        url += "&name=" + encodeURIComponent(nome);
    }
    if (status) {
        url += "&status=" + encodeURIComponent(status);
    }
    if (species) {
        url += "&species=" + encodeURIComponent(species);
    }

    // Exibe loading enquanto a requisição é processada
    mostrarLoading();

    // ===== FETCH — Consumo da API =====
    fetch(url)
        .then(function (response) {
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }
            // Converte a resposta para JSON
            return response.json();
        })
        .then(function (data) {
            // Esconde o loading após receber os dados
            esconderLoading();

            // Atualiza as informações de paginação
            totalPaginas = data.info.pages;
            paginaAtual = pagina;

            // Atualiza o total de personagens na seção Sobre
            if (totalCharsEl) {
                totalCharsEl.textContent = data.info.count;
            }

            // Cria os cards dinamicamente com os dados recebidos
            criarCards(data.results);

            // Cria os botões de paginação
            criarPaginacao();
        })
        .catch(function (erro) {
            console.error("Erro ao buscar personagens:", erro);

            // Se o erro for 404 (nenhum resultado), mostra mensagem amigável
            esconderLoading();

            if (erro.message.includes("404")) {
                cardsContainer.innerHTML =
                    '<p style="text-align:center; color: var(--cor-texto-claro); grid-column: 1/-1; padding: 3rem 0; font-size: 1.1rem;">' +
                    '🔍 Nenhum personagem encontrado com esses filtros. Tente outra busca!</p>';
                paginationEl.innerHTML = "";
            } else {
                mostrarErro();
            }
        });
}

// ================================================
// CRIAÇÃO DINÂMICA DOS CARDS
// ================================================

/**
 * Recebe o array de personagens da API e cria os cards
 * dinamicamente utilizando createElement e appendChild.
 *
 * @param {Array} personagens - Array de objetos de personagens da API
 */
function criarCards(personagens) {
    // Limpa o container antes de adicionar novos cards
    cardsContainer.innerHTML = "";

    // Itera sobre cada personagem recebido
    personagens.forEach(function (personagem, index) {
        // --- Cria o elemento principal do card ---
        var card = document.createElement("div");
        card.classList.add("card");
        // Atraso na animação para efeito cascata
        card.style.animationDelay = (index * 0.05) + "s";

        // --- Cria a imagem do personagem ---
        var img = document.createElement("img");
        img.classList.add("card-img");
        img.src = personagem.image;
        img.alt = "Imagem de " + personagem.name;
        img.loading = "lazy";

        // --- Cria o corpo do card ---
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // --- Nome do personagem ---
        var nome = document.createElement("h3");
        nome.classList.add("card-name");
        nome.textContent = personagem.name;

        // --- Badge de Status (Alive / Dead / Unknown) ---
        var statusBadge = document.createElement("span");
        statusBadge.classList.add("status-badge");

        // Define a classe CSS conforme o status
        var statusTexto = "";
        if (personagem.status === "Alive") {
            statusBadge.classList.add("status-alive");
            statusTexto = "Vivo";
        } else if (personagem.status === "Dead") {
            statusBadge.classList.add("status-dead");
            statusTexto = "Morto";
        } else {
            statusBadge.classList.add("status-unknown");
            statusTexto = "Desconhecido";
        }
        statusBadge.textContent = statusTexto + " — " + personagem.species;

        // --- Informação de Gênero ---
        var generoInfo = document.createElement("p");
        generoInfo.classList.add("card-info");

        var generoLabel = document.createElement("span");
        generoLabel.classList.add("label");
        generoLabel.textContent = "Gênero: ";

        var generoValor = document.createTextNode(traduzirGenero(personagem.gender));
        generoInfo.appendChild(generoLabel);
        generoInfo.appendChild(generoValor);

        // --- Informação de Origem ---
        var origemInfo = document.createElement("p");
        origemInfo.classList.add("card-info");

        var origemLabel = document.createElement("span");
        origemLabel.classList.add("label");
        origemLabel.textContent = "Origem: ";

        var origemValor = document.createTextNode(personagem.origin.name);
        origemInfo.appendChild(origemLabel);
        origemInfo.appendChild(origemValor);

        // --- Informação de Episódios ---
        var episodiosInfo = document.createElement("p");
        episodiosInfo.classList.add("card-info");

        var episodiosLabel = document.createElement("span");
        episodiosLabel.classList.add("label");
        episodiosLabel.textContent = "Episódios: ";

        var episodiosValor = document.createTextNode(personagem.episode.length);
        episodiosInfo.appendChild(episodiosLabel);
        episodiosInfo.appendChild(episodiosValor);

        // --- Localização atual ---
        var localizacao = document.createElement("div");
        localizacao.classList.add("card-location");

        var locLabel = document.createElement("span");
        locLabel.classList.add("label");
        locLabel.textContent = "Última localização conhecida";

        var locValor = document.createElement("span");
        locValor.textContent = personagem.location.name;

        localizacao.appendChild(locLabel);
        localizacao.appendChild(locValor);

        // --- Monta a estrutura do card usando appendChild ---
        cardBody.appendChild(nome);
        cardBody.appendChild(statusBadge);
        cardBody.appendChild(generoInfo);
        cardBody.appendChild(origemInfo);
        cardBody.appendChild(episodiosInfo);
        cardBody.appendChild(localizacao);

        card.appendChild(img);
        card.appendChild(cardBody);

        // --- Adiciona o card ao container principal ---
        cardsContainer.appendChild(card);
    });
}

// ================================================
// TRADUÇÃO DE GÊNERO
// ================================================

/**
 * Traduz o gênero do personagem do inglês para o português.
 *
 * @param {string} gender - Gênero em inglês (Male, Female, Genderless, unknown)
 * @returns {string} Gênero traduzido para português
 */
function traduzirGenero(gender) {
    switch (gender) {
        case "Male":
            return "Masculino";
        case "Female":
            return "Feminino";
        case "Genderless":
            return "Sem gênero";
        default:
            return "Desconhecido";
    }
}

// ================================================
// PAGINAÇÃO
// ================================================

/**
 * Cria os botões de paginação dinamicamente com base
 * no total de páginas retornado pela API.
 */
function criarPaginacao() {
    // Limpa a paginação anterior
    paginationEl.innerHTML = "";

    // Se há apenas 1 página, não exibe paginação
    if (totalPaginas <= 1) return;

    // --- Botão "Anterior" ---
    var btnAnterior = document.createElement("button");
    btnAnterior.textContent = "◀ Anterior";
    btnAnterior.disabled = paginaAtual === 1;
    btnAnterior.addEventListener("click", function () {
        if (paginaAtual > 1) {
            buscarPersonagens(paginaAtual - 1);
            rolarParaPersonagens();
        }
    });
    paginationEl.appendChild(btnAnterior);

    // --- Botões numéricos ---
    // Exibe no máximo 5 páginas por vez para não sobrecarregar
    var inicio = Math.max(1, paginaAtual - 2);
    var fim = Math.min(totalPaginas, paginaAtual + 2);

    // Se não estamos no começo, mostra a primeira página e "..."
    if (inicio > 1) {
        var primeiraPag = criarBotaoPagina(1);
        paginationEl.appendChild(primeiraPag);

        if (inicio > 2) {
            var dots = document.createElement("span");
            dots.textContent = "...";
            dots.style.color = "var(--cor-texto-claro)";
            dots.style.padding = "0 8px";
            paginationEl.appendChild(dots);
        }
    }

    for (var i = inicio; i <= fim; i++) {
        var btnPag = criarBotaoPagina(i);
        paginationEl.appendChild(btnPag);
    }

    // Se não estamos no final, mostra "..." e a última página
    if (fim < totalPaginas) {
        if (fim < totalPaginas - 1) {
            var dots2 = document.createElement("span");
            dots2.textContent = "...";
            dots2.style.color = "var(--cor-texto-claro)";
            dots2.style.padding = "0 8px";
            paginationEl.appendChild(dots2);
        }
        var ultimaPag = criarBotaoPagina(totalPaginas);
        paginationEl.appendChild(ultimaPag);
    }

    // --- Botão "Próximo" ---
    var btnProximo = document.createElement("button");
    btnProximo.textContent = "Próximo ▶";
    btnProximo.disabled = paginaAtual === totalPaginas;
    btnProximo.addEventListener("click", function () {
        if (paginaAtual < totalPaginas) {
            buscarPersonagens(paginaAtual + 1);
            rolarParaPersonagens();
        }
    });
    paginationEl.appendChild(btnProximo);
}

/**
 * Cria um botão de página numérica.
 *
 * @param {number} numero - Número da página
 * @returns {HTMLButtonElement} O botão criado
 */
function criarBotaoPagina(numero) {
    var btn = document.createElement("button");
    btn.textContent = numero;

    if (numero === paginaAtual) {
        btn.classList.add("active");
    }

    btn.addEventListener("click", function () {
        buscarPersonagens(numero);
        rolarParaPersonagens();
    });

    return btn;
}

/**
 * Rola a página suavemente até a seção de personagens.
 */
function rolarParaPersonagens() {
    document.getElementById("personagens").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ================================================
// EVENTOS DE FILTRO E BUSCA
// ================================================

// Variável para controlar o debounce da busca
var debounceTimer;

/**
 * Evento de digitação no campo de busca.
 * Utiliza debounce para evitar múltiplas requisições.
 */
searchInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
        buscarPersonagens(1);
    }, 500);
});

/**
 * Evento de mudança no filtro de status.
 */
statusFilter.addEventListener("change", function () {
    buscarPersonagens(1);
});

/**
 * Evento de mudança no filtro de espécie.
 */
speciesFilter.addEventListener("change", function () {
    buscarPersonagens(1);
});

/**
 * Evento do botão "Tentar Novamente" na mensagem de erro.
 */
retryBtn.addEventListener("click", function () {
    buscarPersonagens(paginaAtual);
});

// ================================================
// MENU MOBILE (TOGGLE)
// ================================================

/**
 * Alterna a visibilidade do menu de navegação no mobile.
 */
menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("active");
    });
});

// ================================================
// INICIALIZAÇÃO
// ================================================

/**
 * Ao carregar a página, busca os personagens da primeira página.
 * Esta é a chamada inicial que popula os cards automaticamente.
 */
buscarPersonagens(1);
