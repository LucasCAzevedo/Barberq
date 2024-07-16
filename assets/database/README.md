# Artefatos relativos à modelagem de dados do projeto

Este diretório mantém os artefatos relativos à modelagem de dados do projeto. 

Os principais documentos a serem produzidos são:


* [`Modelo Relacional`](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti2-1381100-barberq/blob/c842507425a206c80a74e1f42161845c366753bf/docs/images/ModeloRelacionaFinal.png)
	* Apresentar o modelo relacional em arquivo editável no formato compatível com a ferramenta utilizada pela equipe.
---
* [`database_creation_script.sql`](assets/database/barberq.sql)
	* Script de criação do banco de dados.
```SQL
-- Cria o banco de dados 'tis2'
CREATE DATABASE BarberQ;

USE BarberQ;

-- Cria a tabela 'barbearia'
CREATE TABLE barbearia (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bairro VARCHAR(255),                  
    cep VARCHAR(255),                     
    cidade VARCHAR(255),                  
    email VARCHAR(255),                   
    estado VARCHAR(255),                  
    nome VARCHAR(255),                    
    numero VARCHAR(255),                  
    rua VARCHAR(255),                     
    senha VARCHAR(255),                   
    user_type VARCHAR(255)                
);

-- Cria a tabela 'barbeiro'
CREATE TABLE barbeiro (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),                   
    nome VARCHAR(255),                    
    senha VARCHAR(255),                   
    status VARCHAR(255),                  
    barbearia_id BIGINT,                  
    user_type VARCHAR(255),               
    FOREIGN KEY (barbearia_id) REFERENCES barbearia(id)
);

-- Cria a tabela 'cliente'
CREATE TABLE cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),                   
    nome VARCHAR(255),                    
    senha VARCHAR(255),                   
    user_type VARCHAR(255)                
);

-- Cria a tabela 'servico'
CREATE TABLE servico (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255),               
    preco DECIMAL(38,2),                  
    status VARCHAR(255),                  
    barbearia_id BIGINT,                  
    barbeiro_id BIGINT,                   
    FOREIGN KEY (barbearia_id) REFERENCES barbearia(id),
    FOREIGN KEY (barbeiro_id) REFERENCES barbeiro(id)
);

-- Cria a tabela 'horario'
CREATE TABLE horario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data DATE,                            
    disponivel BIT(1),                    
    horario VARCHAR(255),                 
    id_agendamento BIGINT,                
    id_barbearia BIGINT,                  
    id_barbeiro BIGINT,                   
    id_cliente BIGINT,                    
    id_servico BIGINT,                    
    FOREIGN KEY (id_agendamento) REFERENCES agendamento(id),
    FOREIGN KEY (id_barbearia) REFERENCES barbearia(id),
    FOREIGN KEY (id_barbeiro) REFERENCES barbeiro(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_servico) REFERENCES servico(id)
);

-- Cria a tabela 'agendamento'
CREATE TABLE agendamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data VARCHAR(255),                    
    horario ENUM('NOVE_HORAS','DEZ_HORAS','ONZE_HORAS','TREZE_HORAS','QUATORZE_HORAS','QUINZE_HORAS','DEZESSEIS_HORAS','DEZESSETE_HORAS'), 
    id_barbearia BIGINT,                  
    id_cliente BIGINT,                    
    id_horario BIGINT,                    
    id_servico BIGINT,                    
    id_barbeiro BIGINT,                   
    nome_cliente VARCHAR(255),            
    barbearia_id BIGINT,                  
    barbeiro_id BIGINT,                   
    cliente_id BIGINT,                    
    FOREIGN KEY (id_barbearia) REFERENCES barbearia(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_horario) REFERENCES horario(id),
    FOREIGN KEY (id_servico) REFERENCES servico(id),
    FOREIGN KEY (id_barbeiro) REFERENCES barbeiro(id),
    FOREIGN KEY (barbearia_id) REFERENCES barbearia(id),
    FOREIGN KEY (barbeiro_id) REFERENCES barbeiro(id),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);
```
---

* [`database_data_initialization_script.sql`](assets/database/barberq_init.sql)
	* Script de inicialização (povoamento) do banco de dados.
```SQL
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
```
---
