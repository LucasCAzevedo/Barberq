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
