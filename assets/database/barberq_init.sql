USE BarberQ;

-- Inserir dados na tabela 'barbearia'
INSERT INTO barbearia (bairro, cep, cidade, email, estado, nome, numero, rua, senha, user_type)
VALUES
    ('Centro', '12345-678', 'São Paulo', 'contato@barbearia1.com', 'SP', 'Barbearia Teste 1', '100', 'Rua A', '123456', 'barbearia'),
    ('Bairro X', '54321-987', 'Rio de Janeiro', 'contato@barbearia2.com', 'RJ', 'Barbearia Teste 2', '200', 'Rua B', '654321', 'barbearia');

-- Inserir dados na tabela 'barbeiro'
INSERT INTO barbeiro (email, nome, senha, status, barbearia_id, user_type)
VALUES
    ('barbeiro1@barbearia1.com', 'Fulano Barbeiro', 'senha123', 'ativo', 1, 'barbeiro'),
    ('barbeiro2@barbearia2.com', 'Ciclano Barbeiro', 'senha456', 'ativo', 2, 'barbeiro');

-- Inserir dados na tabela 'cliente'
INSERT INTO cliente (email, nome, senha, user_type)
VALUES
    ('cliente1@gmail.com', 'Cliente Teste 1', 'cliente123', 'cliente'),
    ('cliente2@gmail.com', 'Cliente Teste 2', 'cliente456', 'cliente');

-- Inserir dados na tabela 'servico'
INSERT INTO servico (descricao, preco, status, barbearia_id, barbeiro_id)
VALUES
    ('Corte Masculino', 50.00, 'ativo', 1, 1),
    ('Barba', 30.00, 'ativo', 1, 1),
    ('Corte Feminino', 80.00, 'ativo', 2, 2);

-- Inserir dados na tabela 'horario'
INSERT INTO horario (data, disponivel, horario, id_barbearia, id_barbeiro, id_cliente, id_servico)
VALUES
    ('2024-06-25', 1, 'DEZ_HORAS', 1, 1, NULL, 1),
    ('2024-06-25', 1, 'ONZE_HORAS', 1, 1, NULL, 2),
    ('2024-06-25', 1, 'QUINZE_HORAS', 2, 2, NULL, 3);

-- Inserir dados na tabela 'agendamento'
INSERT INTO agendamento (data, horario, id_barbearia, id_cliente, id_horario, id_servico, id_barbeiro, nome_cliente, barbearia_id, barbeiro_id, cliente_id)
VALUES
    ('2024-06-25', 'DEZ_HORAS', 1, 1, NULL, 1, 1, 'Cliente Teste 1', 1, 1, 1),
    ('2024-06-25', 'ONZE_HORAS', 1, 1, NULL, 2, 1, 'Cliente Teste 1', 1, 1, 1);

-- Verificar os dados inseridos
SELECT * FROM barbearia;
SELECT * FROM barbeiro;
SELECT * FROM cliente;
SELECT * FROM servico;
SELECT * FROM horario;
SELECT * FROM agendamento;
