# BarberQ

O objetivo deste trabalho é criar uma solução para empreendedores no ramo da barbearia. Esses empreendedores buscam não apenas oferecer cortes de cabelo ou barba, mas também proporcionar uma experiência completa aos clientes. No entanto, muitos clientes enfrentam dificuldades para encontrar locais confiáveis, com preços acessíveis e próximos a seus bairros de residência. Essa dificuldade surge porque a experiência é frequentemente discutida antes de ser vivenciada. Portanto, o foco deste trabalho é desenvolver uma plataforma que permita o agendamento de serviços e forneça informações detalhadas, integrando clientes e empreendedores em uma única solução.

## Integrantes

* [Arthur Miranda](https://github.com/art1544)
* [Gabrielly de Fátima](https://github.com/gabrieellyf)
* [Gabriel Silveira](https://github.com/gs10111)
* [Gustavo Rodrigo](https://github.com/GUS74V0)
* [Lucas Cerqueira Azevedo](https://github.com/LucasCAzevedo)
* [João Pedro Campos de Barcelos](https://github.com/Campos001)


## Professoras

* Aline Norberta de Brito
* Cleia Marcia Gomes Amaral

## Instruções de utilização

Este projeto é uma aplicação Java Spring Boot que utiliza o Maven para gerenciamento de dependências.
 
## Pré-requisitos
Antes de começar, certifique-se de atender aos seguintes requisitos:
- Java Development Kit (JDK) 11 ou superior
- Maven 3.6 ou superior
- Git
 
## Instalação
 
### Clonar o Repositório
Primeiro, clone o repositório para sua máquina local usando o seguinte comando:
```bash
git clone https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti2-1381100-barberq.git
```

### Navegar para o Diretório do Projeto
```bash
cd localização-repositorio
```
 
### Instalar Dependências
Instale as dependências do Maven executando:
```bash
mvn clean install
```
 
## Executando a Aplicação
 
### Usando Maven
Para executar a aplicação com Maven, use o seguinte comando:
```bash
mvn spring-boot:run
```
 
### Usando o Jar Executável
Alternativamente, você pode construir um arquivo jar executável e executá-lo:
1. Construa o arquivo jar:
   ```bash
   mvn clean package
   ```
2. Execute o arquivo jar:
   ```bash
   java -jar target/sua-aplicacao.jar
   ```
 
## Configuração
Os arquivos de configuração estão localizados no diretório `src/main/resources`. As principais configurações incluem:
 
- `application.properties` para configurações gerais do Spring Boot
- `application-dev.properties` para configurações específicas do ambiente de desenvolvimento
- `application-prod.properties` para configurações específicas do ambiente de produção
 
## Construindo o Projeto
Para construir o projeto, use:
```bash
mvn clean package
```
 
## Implantação
Para implantar a aplicação, siga estas etapas:
 
1. Certifique-se de ter construído o projeto:
   ```bash
   mvn clean package
   ```
2. Transfira o arquivo `jar` gerado do diretório `target` para o seu servidor.
3. Execute a aplicação no servidor:
   ```bash
   java -jar sua-aplicacao.jar
   ```
 
## Configuração do Ambiente de Desenvolvimento
Para uma experiência de desenvolvimento otimizada, é recomendável instalar as seguintes extensões no Visual Studio Code (VS Code):
 
### Spring Boot Extension Pack
O Spring Boot Extension Pack oferece suporte completo para desenvolvimento Spring Boot no VS Code. Para instalar:
 
1. Abra o VS Code.
2. Vá para a aba de Extensões (`Ctrl+Shift+X`).
3. Pesquise por "Spring Boot Extension Pack".
4. Clique em "Instalar".
 
### Java Extension Pack
O Java Extension Pack fornece todas as ferramentas necessárias para desenvolvimento Java no VS Code. Para instalar:
 
1. Abra o VS Code.
2. Vá para a aba de Extensões (`Ctrl+Shift+X`).
3. Pesquise por "Java Extension Pack".
4. Clique em "Instalar".
 
---
## Histórico de versões

* 0.1.1
    * CHANGE: Atualização das documentações. Código permaneceu inalterado.
* 0.1.0
    * Implementação da funcionalidade X pertencente ao processo P.
* 0.0.1
    * Trabalhando na modelagem do processo de negócio.

