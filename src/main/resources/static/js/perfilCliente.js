document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Verifica o status de autenticação e o tipo de usuário
        const authResponse = await fetch('/auth/status');
        const authStatus = await authResponse.json();

        if (authStatus.loggedIn && authStatus.userType === 'cliente') {
            const clientId = authStatus.userId;
            const response = await fetch(`/clientes/${clientId}`);
            const clientData = await response.json();

            const profileContainer = document.getElementById('profileContainer');
            const profileContent = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Nome</h5>
                        <p class="card-text">${clientData.nome}</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Email</h5>
                        <p class="card-text">${clientData.email}</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Tipo de Usuário</h5>
                        <p class="card-text">${clientData.userType}</p>
                    </div>
                </div>
            `;
            profileContainer.innerHTML = profileContent;

            // Display logout link
            const logoutLink = document.getElementById('logoutLink');
            logoutLink.style.display = 'block';
            logoutLink.addEventListener('click', async function () {
                await fetch('/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                window.location.href = 'home.html';
            });

            // Fetch and display agendamentos
            const agendamentosResponse = await fetch(`/agendamentos/cliente/${clientId}`);
            const agendamentosData = await agendamentosResponse.json();

            const agendamentosContainer = document.getElementById('agendamentosContainer');
            agendamentosContainer.innerHTML = ''; // Limpa o conteúdo anterior

            agendamentosData.forEach(agendamento => {
                let statusColor;
                switch (agendamento.status) {
                    case 'confirmado':
                        statusColor = 'rgba(0, 128, 0, 0.2)'; // Verde com transparência
                        break;
                    case 'pendente':
                        statusColor = 'rgba(0, 0, 255, 0.2)'; // Azul com transparência
                        break;
                    case 'cancelado':
                        statusColor = 'rgba(255, 0, 0, 0.2)'; // Vermelho com transparência
                        break;
                    default:
                        statusColor = 'white';
                }

                const agendamentoCard = `
                    <div class="card mb-4 col-sm-6">
                        <div class="card-body">
                            <h5 class="card-title">${agendamento.barbearia.nome}</h5>
                            <p class="card-text">Barbeiro: ${agendamento.barbeiro.nome}</p>
                            <p class="card-text">Serviço: ${agendamento.servico}</p>
                            <p class="card-text">Data: ${formatarData(agendamento.data)}</p>
                            <p class="card-text">Hora: ${formatarHora(agendamento.hora)}</p>
                            <p class="card-text status" style="background-color: ${statusColor}; padding: 5px; display: inline-block; border-radius: 5px;">Status: ${agendamento.status}</p>
                            ${agendamento.status !== 'cancelado' ? `<button class="btn btn-danger btn-card" onclick="desagendar(${agendamento.id})">Desagendar</button>` : ''}
                        </div>
                    </div>
                `;
                agendamentosContainer.innerHTML += agendamentoCard;
            });

        } else {
            window.location.href = 'login_cliente.html';
        }
    } catch (error) {
        console.error('Erro ao carregar dados do perfil do cliente:', error);
    }
});

async function desagendar(agendamentoId) {
    try {
        await fetch(`/agendamentos/${agendamentoId}`, {
            method: 'PATCH', // Usando PATCH para atualização parcial
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'cancelado' }) // Atualizando o status para 'cancelado'
        });
        window.location.reload();
    } catch (error) {
        console.error('Erro ao desagendar:', error);
    }
}

// Função auxiliar para formatar data
function formatarData(data) {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString();
}

// Função auxiliar para formatar hora como string
function formatarHora(hora) {
    if (!hora) return ''; // Lidar com valores nulos ou vazios, se necessário
    const [hour, minute] = hora.split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}
