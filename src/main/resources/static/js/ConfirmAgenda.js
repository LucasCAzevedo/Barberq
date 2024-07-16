document.addEventListener('DOMContentLoaded', function() {
    const agendaTableBody = document.querySelector('.dados_agenda');
    const barbeariaId = 1; // Substitua pelo ID da barbearia desejada

    function confirmarAgendamento(id) {
        fetch(`/agendamentos/confirmar/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            carregarAgendamentos();
            alert("Agendamento confirmado com sucesso!");
        })
        .catch(error => {
            console.error('Erro ao confirmar agendamento:', error);
            alert(error.message);
        });
    }

    function cancelarAgendamento(id) {
        fetch(`/agendamentos/cancelar/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            carregarAgendamentos();
            alert("Agendamento cancelado com sucesso!");
        })
        .catch(error => {
            console.error('Erro ao cancelar agendamento:', error);
            alert(error.message);
        });
    }

    function carregarAgendamentos() {
        fetch(`/agendamentos/barbearia/${barbeariaId}/pendentes`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar agendamentos pendentes');
            }
            return response.json();
        })
        .then(data => {
            gerarDadosNaTabela(data);
        })
        .catch(error => {
            console.error('Erro ao carregar agendamentos:', error);
            alert(error.message);
        });
    }

    function gerarDadosNaTabela(agendamentos) {
        agendaTableBody.innerHTML = '';

        agendamentos.forEach(function(agendamento) {
            const tr = document.createElement('tr');

            const tdCliente = document.createElement('td');
            tdCliente.textContent = agendamento.cliente.nome; // Supondo que o nome do cliente esteja disponível

            const tdBarbeiro = document.createElement('td');
            tdBarbeiro.textContent = agendamento.barbeiro.nome; // Supondo que o nome do barbeiro esteja disponível

            const tdData = document.createElement('td');
            tdData.textContent = agendamento.data;

            const tdHora = document.createElement('td');
            tdHora.textContent = agendamento.hora;

            const tdAcoes = document.createElement('td');
            const btnConfirmar = document.createElement('button');
            btnConfirmar.textContent = "Confirmar";
            btnConfirmar.onclick = function() {
                confirmarAgendamento(agendamento.id);
            };
            const btnCancelar = document.createElement('button');
            btnCancelar.textContent = "Cancelar";
            btnCancelar.onclick = function() {
                cancelarAgendamento(agendamento.id);
            };
            tdAcoes.appendChild(btnConfirmar);
            tdAcoes.appendChild(btnCancelar);

            tr.appendChild(tdCliente);
            tr.appendChild(tdBarbeiro);
            tr.appendChild(tdData);
            tr.appendChild(tdHora);
            tr.appendChild(tdAcoes);

            agendaTableBody.appendChild(tr);
        });
    }

    // Inicializa carregamento dos agendamentos pendentes ao carregar a página
    carregarAgendamentos();
});
