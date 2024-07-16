document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Fetch all agendamentos
        const response = await fetch('/agendamentos');
        const agendamentosData = await response.json();

        const agendamentosContainer = document.getElementById('agendamentosContainer');
        agendamentosData.forEach(agendamento => {
            const agendamentoCard = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Agendamento com ${agendamento.barbeiro.nome}</h5>
                        <p class="card-text">Data: ${new Date(agendamento.horario).toLocaleString()}</p>
                        <p class="card-text">Serviço: ${agendamento.servico.descricao}</p>
                        <p class="card-text">Status: ${agendamento.status ? 'Confirmado' : 'Pendente'}</p>
                    </div>
                </div>
            `;
            agendamentosContainer.innerHTML += agendamentoCard;
        });

        // Display logout link
        const authResponse = await fetch('/auth/status');
        const authStatus = await authResponse.json();
        if (authStatus.loggedIn) {
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
        }
    } catch (error) {
        console.error('Erro ao carregar os agendamentos:', error);
    }
});
