document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const barbeiroId = urlParams.get('barbeiroId');
    const barbeariaId = urlParams.get('barbeariaId');

    if (!barbeiroId || !barbeariaId) {
        alert('ID do barbeiro ou da barbearia não encontrado na URL.');
        return;
    }

    try {
        const barbeariaResponse = await fetch(`/barbearias/${barbeariaId}`);
        const barbeariaData = await barbeariaResponse.json();
        
        const barbeiroResponse = await fetch(`/barbearias/${barbeariaId}/barbeiros/${barbeiroId}`);
        const barbeiroData = await barbeiroResponse.json();

        document.getElementById('barbeariaNome').value = barbeariaData.nome;
        document.getElementById('barbeiroNome').value = barbeiroData.nome;

        // Preenche as opções do campo de seleção de serviço
        const servicoSelect = document.getElementById('servico');
        const servicos = [
            { nome: "Corte de Cabelo Masculino", status: 50 },
            { nome: "Barba Completa", status: 30 },
            { nome: "Coloração de Cabelo", status: 80 },
            { nome: "Corte de Cabelo Feminino", status: 50 }
        ];

        servicos.forEach(servico => {
            const option = document.createElement('option');
            option.value = servico.nome;
            option.text = `${servico.nome} - Status: ${servico.status}`;
            servicoSelect.add(option);
        });

        document.getElementById('agendarForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            const authResponse = await fetch('/auth/status');
            const authStatus = await authResponse.json();

            if (!authStatus.loggedIn || authStatus.userType !== 'cliente') {
                alert('Você precisa estar logado como cliente para agendar um horário.');
                window.location.href = 'login_cliente.html';
                return;
            }

            const clienteId = authStatus.userId;
            const data = document.getElementById('data').value;
            const hora = document.getElementById('hora').value;
            const servico = document.getElementById('servico').value;

            if (!data || !hora || !servico) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const agendamento = {
                cliente: { id: clienteId },
                barbearia: { id: barbeariaId },
                barbeiro: { id: barbeiroId },
                data: data,
                hora: hora,
                servico: servico
            };

            const response = await fetch('/agendamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agendamento)
            });

            if (response.ok) {
                alert('Agendamento realizado com sucesso!');
                window.location.href = 'perfilCliente.html';
            } else {
                alert('Erro ao realizar o agendamento.');
            }
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar dados da barbearia ou do barbeiro.');
    }
});
