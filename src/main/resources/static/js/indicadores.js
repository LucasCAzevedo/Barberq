class DadosRenderer {
    constructor(endpointUrl) {
        this.endpointUrl = endpointUrl;
    }

    renderizar() {
        fetch(this.endpointUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados');
                }
                return response.json();
            })
            .then(data => {
                this.renderizarDados(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    renderizarDados(data) {
        // Renderizar dados para média de barbeiros por barbearia
        const mediaBarbeiros = document.querySelector('.Barbeiros-Barbearia');
        mediaBarbeiros.innerText = data.mediaBarbeiros.toFixed(2); // Formata para duas casas decimais

        // Renderizar dados para média de serviços por barbeiro
        const mediaServicos = document.querySelector('.Serviços-Barbearia');
        mediaServicos.innerText = data.mediaServicos.toFixed(2); // Formata para duas casas decimais

        // Renderizar dados para média de serviços cancelados por barbearia
        const mediaServicosCancelados = document.querySelector('.Serviços-Cancelados');
        mediaServicosCancelados.innerText = data.mediaServicosCancelados.toFixed(2); // Formata para duas casas decimais
    }
}

// Utilize a classe para renderizar dados
const renderer = new DadosRenderer('http://localhost:8080/api/indicadores');
renderer.renderizar();
