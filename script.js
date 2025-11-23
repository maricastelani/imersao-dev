const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("header div input");
const searchButton = document.getElementById("botao-busca");
let dados = [];

// Função para carregar os dados do JSON e renderizar todos os cards inicialmente
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        const json = await resposta.json();
        dados = json.jundiai_tourism_db; // Acessa a lista de locais dentro do JSON

        // AGORA SIM: Ativa a busca apenas depois que os dados foram carregados.
        searchInput.addEventListener('input', iniciarBusca);
        searchButton.addEventListener('click', iniciarBusca);
        searchInput.disabled = false; // Habilita o campo de busca
        searchInput.placeholder = "O que você procura em Jundiaí?"; // Restaura o placeholder
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        searchInput.placeholder = "Erro ao carregar dados.";
    }
}

function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase();
    
    // Se o campo de busca estiver vazio, não faz nada (mantém a mensagem inicial)
    if (termoBusca.trim() === '') {
        renderizarMensagemInicial();
        return;
    }
    const resultados = dados.filter(local => 
        local.name.toLowerCase().includes(termoBusca) || 
        local.description.toLowerCase().includes(termoBusca) ||
        local.category.toLowerCase().includes(termoBusca) ||
        local.tags.join(' ').toLowerCase().includes(termoBusca) // Busca também nas tags
    );
    renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes

    // Se a busca foi feita mas não encontrou nada, exibe a mensagem de "nenhum resultado"
    if (cardsParaRenderizar.length === 0) {
        if (searchInput.value.trim() !== '') {
            cardContainer.innerHTML = `<p class="nenhum-resultado">Nenhum resultado encontrado para "${searchInput.value}".</p>`;
        }
        return;
    }

    for (const local of cardsParaRenderizar) {
        const article = document.createElement("article");
        article.classList.add("card");

        // Cria um link para o Google Maps com o endereço
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.address)}`;

        // Lógica para criar um link de contato mais descritivo
        let contatoHtml = '';
        if (local.contact && local.contact !== "Indisponível") {
            let linkUrl = '';
            let linkTitle = '';

            // Verifica se é um número de telefone (procurando por parênteses)
            if (local.contact.includes('(')) {
                const numeroLimpo = local.contact.replace(/\D/g, ''); // Remove caracteres não numéricos
                linkUrl = `tel:+55${numeroLimpo}`; // Cria um link 'tel:' para chamadas
                linkTitle = local.contact; // O texto do link será o próprio número
            } else if (local.contact.startsWith('@')) {
                linkUrl = `https://www.instagram.com/${local.contact.substring(1)}`;
                linkTitle = 'Instagram';
            } else { // Assume que é um site
                linkUrl = local.contact.startsWith('http') ? local.contact : `https://${local.contact}`;
                linkTitle = 'Site Oficial';
            }

            contatoHtml = `<p><strong>Mais informações:</strong> <a href="${linkUrl}" target="_blank">${linkTitle}</a></p>`;
        }

        article.innerHTML = `
            <img 
                class="card-imagem" 
                src="${local.image}" 
                alt="${local.name}" 
                loading="lazy">
            <div class="card-conteudo">
                <div class="card-header">
                    <h2>${local.name}</h2>
                    <span class="card-categoria">${local.category}</span>
                </div>
                <p>${local.description}</p>
                <div class="card-info">
                    <p><strong>Endereço:</strong> <a href="${googleMapsLink}" target="_blank">${local.address}</a></p>
                    <p><strong>Horário:</strong> ${local.hours}</p>
                    ${contatoHtml}
                </div>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}

function renderizarMensagemInicial() {
    cardContainer.innerHTML = `
        <div class="mensagem-inicial">
            <h2>Quer descobrir o que Jundiaí tem de especial?</h2>
            <p>Experimente buscar por “vinícola”, “gastronomia”, “parque” ou “fazenda”.</p>
        </div>
    `;
}

// Desabilita o campo de busca inicialmente para evitar buscas antes dos dados carregarem
searchInput.disabled = true;
searchInput.placeholder = "Carregando experiências...";

// Carrega os dados assim que o script é executado
carregarDados();
