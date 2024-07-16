document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#registrationForm');
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email');
    const senha = document.querySelector('#senha');
    const confirmSenha = document.querySelector('#confirmSenha');
    const msgError = document.querySelector('#msgError');
    const msgSuccess = document.querySelector('#msgSuccess');
    const btnVerSenha = document.querySelector('#verSenha');
    const btnVerConfirmSenha = document.querySelector('#verConfirmSenha');

    function toggleVisibility(input, icon) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        icon.classList.toggle('fa-eye-slash');
    }

    btnVerSenha.addEventListener('click', () => toggleVisibility(senha, btnVerSenha));
    btnVerConfirmSenha.addEventListener('click', () => toggleVisibility(confirmSenha, btnVerConfirmSenha));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validarFormulario()) {
            verificarDuplicidadeCliente();
        } else {
            exibirMensagemErro('Preencha todos os campos corretamente antes de cadastrar');
        }
    });

    function validarFormulario() {
        let valid = true;

        if (nome.value.trim() === "") valid = false;
        if (email.value.trim() === "") valid = false;
        if (senha.value.trim() === "" || senha.value !== confirmSenha.value) valid = false;

        return valid;
    }

    function verificarDuplicidadeCliente() {
        const clienteData = {
            nome: nome.value,
            email: email.value,
        };

        fetch('/clientes/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                exibirMensagemErro('Cliente já cadastrado com esses dados');
            } else {
                enviarFormulario(clienteData);
            }
        })
        .catch(error => {
            exibirMensagemErro('Erro ao verificar duplicidade');
        });
    }

    function enviarFormulario(clienteData) {
        clienteData.nome = nome.value;
        clienteData.email = email.value;
        clienteData.senha = senha.value;
        fetch('/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar cliente');
            }
            return response.json();
        })
        .then(data => {
            exibirMensagemSucesso('Cliente cadastrado com sucesso!');
            setTimeout(() => {
                window.location.href = './login_cliente.html';
            }, 3000);
        })
        .catch(error => {
            exibirMensagemErro(error.message || 'Erro ao cadastrar cliente');
        });
    }

    function exibirMensagemErro(mensagem) {
        msgError.style.display = 'block';
        msgError.innerHTML = `<strong>${mensagem}</strong>`;
        msgSuccess.style.display = 'none';
    }

    function exibirMensagemSucesso(mensagem) {
        msgSuccess.style.display = 'block';
        msgSuccess.innerHTML = `<strong>${mensagem}</strong>`;
        msgError.style.display = 'none';
    }
});
