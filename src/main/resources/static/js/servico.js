document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#registrationForm');
    const descricao = document.querySelector('#descricao');
    const preco = document.querySelector('#preco');
    const msgError = document.querySelector('#msgError');
    const msgSuccess = document.querySelector('#msgSuccess');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validarFormulario()) {
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
            msgSuccess.style.display = 'none';
        } else {
            enviarFormulario();
        }
    });

    function validarFormulario() {
        return descricao.value.trim() !== '' && preco.value.trim() !== '';
    }

    function getCookie(name) {
        let cookieArr = document.cookie.split(";");
        for(let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if(name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    function enviarFormulario() {
        const barbeiroId = getCookie('userId'); // Pegando o ID do barbeiro do cookie
        if (!barbeiroId) {
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>ID do barbeiro não encontrado nos cookies</strong>';
            msgSuccess.style.display = 'none';
            return;
        }

        const servicoData = {
            descricao: descricao.value,
            preco: preco.value,
            status: 'PENDENTE',
            barbeiro: { id: barbeiroId },
        };

        fetch('/servicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicoData)
        })
            .then(response => {
                if (response.status === 409) {
                    throw new Error('Serviço já existe');
                }
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.message || 'Erro ao cadastrar serviço');
                    });
                }
                return response.json();
            })
            .then(data => {
                msgSuccess.style.display = 'block';
                msgSuccess.innerHTML = '<strong>Serviço cadastrado com sucesso!</strong>';
                msgError.style.display = 'none';
                setTimeout(() => {
                    window.location.href = './perfilUsuario.html';
                }, 2000);
            })
            .catch(error => {
                msgError.style.display = 'block';
                msgError.innerHTML = `<strong>${error.message}</strong>`;
                msgSuccess.style.display = 'none';
            });
    }
});
