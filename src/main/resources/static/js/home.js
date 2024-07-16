document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('/auth/status');
        const authStatus = await response.json();

        const loginDropdown = document.getElementById('loginDropdown');
        const cadastrarDropdown = document.getElementById('cadastrarDropdown');
        const perfilLink = document.getElementById('perfilLink');
        const logoutLink = document.getElementById('logoutLink');
        const dashboardIndicador = document.getElementById('dashboardIndicador');

        if (authStatus.loggedIn) {
            const isBarbeariaOrBarbeiro = authStatus.userType === 'barbearia' || authStatus.userType === 'barbeiro';
            const isCliente = authStatus.userType === 'cliente';
        
            if (isBarbeariaOrBarbeiro) {
                perfilLink.href = `perfilUsuario.html?id=${encodeURIComponent(authStatus.userId)}`;
            } else if (isCliente) {
                perfilLink.href = `perfilCliente.html?id=${encodeURIComponent(authStatus.userId)}`;
            }
            
            perfilLink.style.display = 'block';
        
            if (authStatus.userType !== 'barbearia') {
                dashboardIndicador.style.display = 'none';
            }
            
            logoutLink.style.display = 'block';
            loginDropdown.style.display = 'none';
            cadastrarDropdown.style.display = 'none';
        }
        if (!authStatus.loggedIn) {
            perfilLink.style.display = 'none';
            logoutLink.style.display = 'none';
            loginDropdown.style.display = 'block';
            cadastrarDropdown.style.display = 'block';
            dashboardIndicador.style.display = 'none';
        }
        
        logoutLink.addEventListener('click', async function () {
            await fetch('/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload();
        });

        // Other existing code
        const responseBarbearias = await fetch("/barbearias");
        const jsonData = await responseBarbearias.json();

        const searchButton = document.getElementById('searchButton');
        const pesquisar = document.getElementById('pesquisar');
        const pesquisaContainer = document.getElementById('pesquisaContainer');

        renderServicoProfissional(jsonData, '', pesquisaContainer, authStatus);

        const handleSearch = () => {
            const searchText = pesquisar.value.toLowerCase();
            renderServicoProfissional(jsonData, searchText, pesquisaContainer, authStatus);
        };

        searchButton.addEventListener('click', handleSearch);
        pesquisar.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    } catch (error) {
        console.error('Erro ao verificar status de autenticação:', error);
    }
});

function renderServicoProfissional(barbearias, searchText, container, authStatus) {
    container.innerHTML = '';
    let resultsFound = false;

    barbearias.forEach(barbearia => {
        const barbeariaMatchesSearch = barbearia.nome.toLowerCase().includes(searchText);

        if (barbeariaMatchesSearch) {
            resultsFound = true;

            const card = document.createElement("div");
            card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
            let perfilButton = '';

            if (!authStatus.loggedIn || authStatus.userType === 'cliente') {
                perfilButton = `<a href="PerfilUsuario.html?id=${encodeURIComponent(barbearia.id)}" class="btn btn-primary btn-card">Perfil</a>`;
            }

            card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-nome">${barbearia.nome}</h5>
                        ${perfilButton}
                    </div>
                </div>
            `;
            container.appendChild(card);
        }
    });

    if (!resultsFound) {
        const noResultsMessage = document.createElement("div");
        noResultsMessage.className = "alert alert-warning mt-3";
        noResultsMessage.role = "alert";
        noResultsMessage.innerHTML = `
            <strong>Ops!</strong> Nenhum resultado encontrado para a pesquisa realizada.
        `;
        container.appendChild(noResultsMessage);
    }
}
