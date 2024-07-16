document.addEventListener("DOMContentLoaded", function () {
    // Função principal para inicializar a página
    initPage();
});

function initPage() {
    verificarAutenticacao()
        .then(authStatus => {
            ajustarVisibilidadeBotoes(authStatus);
            const barbeariaId = obterIdBarbearia();
            if (barbeariaId) {
                obterDadosBarbearia(barbeariaId, authStatus);
            } else {
                console.error('ID da barbearia não especificado na URL.');
            }
        })
        .catch(error => {
            console.error('Erro ao verificar o status de autenticação:', error);
        });
}

function verificarAutenticacao() {
    return fetch('/auth/status')
        .then(response => response.json());
}

function ajustarVisibilidadeBotoes(authStatus) {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const btn4 = document.getElementById('btn4');
    const agendamentosSection = document.getElementById('agendamentosSection');

    if (authStatus.loggedIn) {
        if (authStatus.userType === 'barbearia') {
            btn1.style.display = 'none';
            btn2.style.display = 'block';
            btn3.style.display = 'block';
        } else if (authStatus.userType === 'barbeiro') {
            btn1.style.display = 'block';
            btn2.style.display = 'none';
            btn3.style.display = 'none';
        } else {
            btn1.style.display = 'none';
            btn2.style.display = 'none';
            btn3.style.display = 'none';
            btn4.style.display = 'none';
            agendamentosSection.style.display = 'none';
        }
    } else {
        btn1.style.display = 'none';
        btn2.style.display = 'none';
        btn3.style.display = 'none';
        btn4.style.display = 'none';
        agendamentosSection.style.display = 'none';
    }
}

function obterIdBarbearia() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function obterDadosBarbearia(barbeariaId, authStatus) {
    fetch(`/barbearias/${barbeariaId}`)
        .then(response => response.json())
        .then(dataBarbearia => {
            preencherDadosBarbearia(dataBarbearia);
            renderizarServicos(barbeariaId);
            renderizarBarbeiros(dataBarbearia.barbeiros, authStatus, barbeariaId);
            renderizarHorarios('2024-06-07');
            renderizarAgendamentos(barbeariaId);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados da barbearia:', error);
        });
}

function preencherDadosBarbearia(dataBarbearia) {
    document.getElementById('nomeBarbearia').textContent = dataBarbearia.nome;
    document.getElementById('enderecoBarbearia').textContent = `${dataBarbearia.rua}, ${dataBarbearia.numero}, ${dataBarbearia.bairro}`;
    document.getElementById('emailBarbearia').textContent = dataBarbearia.email;
}

function renderizarServicos(barbeariaId) {
    fetch(`./data/servicos.json`)
        .then(response => response.json())
        .then(servicosData => {
            if (!Array.isArray(servicosData)) {
                throw new TypeError('Os dados de serviços não estão em formato de array.');
            }

            const servicosContainer = document.getElementById('service-list');
            servicosContainer.innerHTML = '';

            servicosData.forEach(servico => {
                const card = document.createElement("div");
                card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
                card.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-nome">${servico.descricao}</h5>
                            <p class="card-text">Status: ${servico.preco}</p>
                        </div>
                    </div>
                `;
                servicosContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os dados dos serviços ou processar a resposta JSON:', error);
        });
}

function renderizarBarbeiros(dataBarbeiros, authStatus, barbeariaId) {
    const barbeirosContainer = document.getElementById('barbeirosContainer');
    dataBarbeiros.forEach(barbeiro => {
        let agendarButton = '';
        if (authStatus.loggedIn && authStatus.userType === 'cliente') {
            agendarButton = `<a href="agendarHorario.html?barbeiroId=${encodeURIComponent(barbeiro.id)}&email=${encodeURIComponent(barbeiro.email)}&barbeariaId=${encodeURIComponent(barbeariaId)}" class="btn btn-primary btn-card">Agendar</a>`;
        }
        const card = document.createElement("div");
        card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-nome">${barbeiro.nome}</h5>
                    ${agendarButton}
                </div>
            </div>
        `;
        barbeirosContainer.appendChild(card);
    });
}

function renderizarHorarios(dia) {
    const horariosContainer = document.getElementById('tabelaHorarios');
    horariosContainer.innerHTML = '';

    const horariosEstaticos = [
        { id: 1, horario: '2024-06-07T09:00:00', disponivel: true },
        { id: 2, horario: '2024-06-07T10:00:00', disponivel: false },
        { id: 3, horario: '2024-06-07T11:00:00', disponivel: true },
        { id: 4, horario: '2024-06-07T13:00:00', disponivel: true },
        { id: 5, horario: '2024-06-07T14:00:00', disponivel: false },
        { id: 6, horario: '2024-06-07T15:00:00', disponivel: true },
        { id: 7, horario: '2024-06-07T16:00:00', disponivel: true },
        { id: 8, horario: '2024-06-07T17:00:00', disponivel: false },
        { id: 9, horario: '2024-06-07T18:00:00', disponivel: true },
    ];

    const horariosDoDia = horariosEstaticos.filter(horario => {
        const dataHora = new Date(horario.horario);
        return dataHora.toISOString().startsWith(dia);
    });

    horariosDoDia.forEach(horario => {
        const horarioAtual = new Date(horario.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const cardDiv = document.createElement('div');
        cardDiv.className = 'col-sm-6 col-md-3 mb-3';
        cardDiv.innerHTML = `
            <div class="card mb-4 box-shadow">
                <div class="card-body">
                    <h5 class="card-title">${horarioAtual}</h5>
                </div>
            </div>
        `;
        horariosContainer.appendChild(cardDiv);
    });
}

function renderizarAgendamentos(barbeariaId) {
    const agendamentosContainer = document.getElementById('agendamentosContainer');

    fetch(`/agendamentos/barbearia/${barbeariaId}`)
        .then(response => response.json())
        .then(agendamentosData => {
            agendamentosContainer.innerHTML = '';

            agendamentosData.forEach(agendamento => {
                const card = document.createElement("div");
                card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
                card.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-nome">${agendamento.barbeiro.nome}</h5>
                            <p class="card-text">Cliente: ${agendamento.cliente.nome}</p>
                            <p class="card-text">Serviço: ${agendamento.servico}</p>
                            <p class="card-text">Data: ${formatarData(agendamento.data)}</p>
                            <p class="card-text">Hora: ${formatarHora(agendamento.hora)}</p>
                            <p class="card-text bold">Status: ${agendamento.status}</p>
                        </div>
                    </div>
                `;
                agendamentosContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao processar a resposta JSON:', error);
        });
}

function formatarData(data) {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString();
}

function formatarHora(hora) {
    if (!hora) return '';
    const [hour, minute] = hora.split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}
