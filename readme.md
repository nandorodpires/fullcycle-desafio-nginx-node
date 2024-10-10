
# Desafio Full Cycle: Nginx com Node.js e MySQL

Este projeto é parte de um desafio Full Cycle que visa demonstrar o uso do Nginx como proxy reverso para uma aplicação Node.js, com uma conexão a um banco de dados MySQL, todos rodando em containers Docker.

## Estrutura do Projeto

O projeto é composto por três serviços principais:

1. **app**: Aplicação Node.js que expõe uma API para inserir e listar nomes no banco de dados.
2. **db**: Serviço de banco de dados MySQL para armazenar as informações.
3. **nginx**: Serviço que atua como proxy reverso, redirecionando o tráfego HTTP para o serviço `app`.

## Requisitos

- **Docker**: Certifique-se de que o Docker está instalado na sua máquina.
- **Docker Compose**: Para facilitar o gerenciamento dos containers.

## Como baixar e rodar o projeto

### 1. Clonar o repositório

Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/nandorodpires/fullcycle-desafio-nginx-node
```

### 2. Entrar no diretório do projeto

Navegue até o diretório do projeto:

```bash
cd ullcycle-desafio-nginx-node
```

### 3. Construir e rodar os containers

Use o comando abaixo para construir e iniciar todos os containers (app, db, nginx):

```bash
docker-compose up --build
```

Este comando fará o download das imagens base, criará os containers e iniciará os serviços. O Nginx irá expor a aplicação na porta `8080`.

### 4. Acessar a aplicação

A aplicação estará disponível no navegador em:

```
http://localhost:8080
```

A página mostrará a mensagem **Full Cycle Rocks!** e uma lista de nomes que estão armazenados no banco de dados MySQL.

## Arquivos Principais

### Dockerfile

O `Dockerfile` da aplicação Node.js contém as seguintes etapas:

```Dockerfile
FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]
```

### docker-compose.yml

O arquivo `docker-compose.yml` define os três serviços mencionados:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    networks:
      - app-network
    depends_on:
      - db

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: fullcycle
    ports:
      - "3307:3306"
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### nginx.conf

O arquivo de configuração do Nginx (`nginx.conf`) redireciona o tráfego para o serviço `app`:

```nginx
events {}

http {
  server {
    listen 80;

    location / {
      proxy_pass http://app:3000;
    }
  }
}
```

## Funcionalidades

- Criação de uma tabela no banco de dados MySQL chamada `people`.
- Inserção de um nome na tabela na inicialização da aplicação.
- Listagem de todos os nomes armazenados no banco de dados através de uma rota exposta na API.

## Conclusão

Este desafio demonstra como utilizar Docker para orquestrar múltiplos serviços (Node.js, MySQL, Nginx) de forma simples e eficiente, além de aplicar um proxy reverso com Nginx para a aplicação Node.js.
