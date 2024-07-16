let btnTogglePassword = document.querySelector('.fa-eye');

btnTogglePassword.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');
    let type = inputSenha.getAttribute('type') === 'password' ? 'text' : 'password';
    inputSenha.setAttribute('type', type);
});


// Função para fazer login
function entrar(userType) {
    let email = document.querySelector('#email').value;
    let senha = document.querySelector('#senha').value;
    let msgError = document.querySelector('#msgError');

    if (email === '' || senha === '') {
        showErrorMessage('Por favor, preencha todos os campos.');
        return;
    }

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userType: userType,
            email: email,
            senha: senha
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Credenciais inválidas. Verifique o e-mail e a senha.');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.id) {
            // Armazenar o ID do usuário em um cookie de sessão
            document.cookie = `userType=${userType}; path=/`;
            document.cookie = `userId=${data.id}; path=/`;
            setTimeout(() => {
                window.location.href = './home.html';
            }, 10);
        } else {
            showErrorMessage('Login falhou. Usuário ou senha incorretos.');
        }
    })    
    .catch(error => {
        showErrorMessage(error.message || 'Erro ao efetuar login.');
    });
}

// Função para verificar se o usuário está autenticado (exemplo)
function verificarAutenticacao() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('userId='))) {
        // O usuário está autenticado
        fetch('/api/recurso-protegido')
            .then(response => {
                if (response.ok) {
                    // Requisição permitida, continuar
                } else {
                    // Tratar erro de autorização
                }
            })
            .catch(error => {
                console.error('Erro ao verificar autenticação:', error);
            });
    } else {
        // Não há cookie de sessão, redirecionar para página de login
        window.location.href = './login.html';
    }
}


function sair() {
    // Limpar o cookie de sessão
    document.cookie = 'userType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirecionar para página de login
    window.location.href = './home.html';
}

// Função para exibir mensagens de erro
function showErrorMessage(message) {
    let msgError = document.querySelector('#msgError');
    msgError.textContent = message;
    msgError.style.display = 'block';
}

