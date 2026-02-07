const URL = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL';

async function buscarMoedas() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        renderizarCards(data);
    } catch (error) {
        document.getElementById('cards').innerHTML = '<p>Erro ao buscar cotações.</p>';
        console.error(error);
    }
}

function renderizarCards(data) {
    const container = document.getElementById('cards');
    container.innerHTML = ''; // Limpa o "Carregando"

    // Mapeia os dados da API para o HTML
    const moedas = [data.USDBRL, data.EURBRL, data.BTCBRL];
    
    moedas.forEach(moeda => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${moeda.name}</h3>
            <p>Compra: R$ ${parseFloat(moeda.bid).toFixed(2)}</p>
            <p>Venda: R$ ${parseFloat(moeda.ask).toFixed(2)}</p>
        `;
        container.appendChild(card);
    });
}

// Executa ao carregar
buscarMoedas();

// Botão de atualizar
document.getElementById('refresh').addEventListener('click', buscarMoedas);