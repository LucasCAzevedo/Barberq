document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('/dashboard/data');
        const dashboardData = await response.json();

        const dashboardContainer = document.getElementById('dashboardContainer');

        // Total de Barbearias
        const totalBarbearias = document.createElement('div');
        totalBarbearias.className = 'card mb-4';
        totalBarbearias.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Total de Barbearias</h5>
                <p class="card-text">${dashboardData.totalBarbearias}</p>
            </div>
        `;
        dashboardContainer.appendChild(totalBarbearias);

        // Barbeiros por Barbearia
        const barbeirosPerBarbearia = document.createElement('div');
        barbeirosPerBarbearia.className = 'card mb-4';
        barbeirosPerBarbearia.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Barbeiros por Barbearia</h5>
                <ul class="list-group list-group-flush" id="barbeirosList"></ul>
            </div>
        `;
        dashboardContainer.appendChild(barbeirosPerBarbearia);

        const barbeirosList = document.getElementById('barbeirosList');
        for (const [barbearia, count] of Object.entries(dashboardData.barbeirosPerBarbearia)) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `${barbearia}: ${count}`;
            barbeirosList.appendChild(listItem);
        }

        // Agendamentos Totais
        const totalAgendamentos = document.createElement('div');
        totalAgendamentos.className = 'card mb-4';
        totalAgendamentos.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Agendamentos Totais</h5>
                <p class="card-text">${dashboardData.totalAgendamentos}</p>
            </div>
        `;
        dashboardContainer.appendChild(totalAgendamentos);

        // Agendamentos por Barbeiro
        const agendamentosPerBarbeiro = document.createElement('div');
        agendamentosPerBarbeiro.className = 'card mb-4';
        agendamentosPerBarbeiro.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Agendamentos por Barbeiro</h5>
                <ul class="list-group list-group-flush" id="agendamentosList"></ul>
            </div>
        `;
        dashboardContainer.appendChild(agendamentosPerBarbeiro);

        const agendamentosList = document.getElementById('agendamentosList');
        for (const [barbeiro, count] of Object.entries(dashboardData.agendamentosPerBarbeiro)) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `${barbeiro}: ${count}`;
            agendamentosList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
    }
});
