# express-clean-arch

Este é um projeto básico usando a arquitetura limpa. Ele fornece uma estrutura inicial para criar uma aplicação web utilizando essas tecnologias, seguindo os princípios da arquitetura limpa.

## Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- Node.js (https://nodejs.org)
- Docker (https://www.docker.com/get-started)

## Configuração do MongoDB com Docker

Para executar o MongoDB com o Docker, siga estas etapas:

1. Abra um terminal ou prompt de comando.

2. Execute o seguinte comando para baixar a imagem oficial do MongoDB a partir do Docker Hub:

```
docker pull mongo
```

3. Após o download da imagem, inicie um contêiner do MongoDB executando o seguinte comando:

```
docker run --name meu-mongodb -p 27017:27017 -d mongo
```


Certifique-se de que o contêiner esteja em execução verificando com o comando `docker ps`.

4. Agora você tem o MongoDB em execução no Docker e pode se conectar a ele em sua aplicação.

## Instalação

Siga estas etapas para configurar e executar o projeto:

1. Clone este repositório para o seu computador:

```
git clone https://github.com/pedro3g/express-clean-arch
```


2. Navegue até o diretório do projeto:

3. Instale as dependências do projeto executando o seguinte comando:

```
npm install
```


## Configuração do ambiente

1. Crie um arquivo `.env` baseado no `.env.example`

## Executando a aplicação

Após a conclusão da instalação e configuração, você pode executar a aplicação usando o seguinte comando:

```
npm start
```
A aplicação será iniciada e estará disponível em `http://localhost:3333`
