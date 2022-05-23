# Segurança em API REST 
![nodeJs-version](https://img.shields.io/badge/nodejs-v18.0.0-blue)
![sqlite3-version](https://img.shields.io/badge/sqlite3-%5E5.0.8-red)
![redis-version](https://img.shields.io/badge/redis-7.0.0--alpine-red)

API simulando o acesso de login de um blog, com a criação de usuário, realização do login e logout, criação de post somente com o usuário com login valido.

## Tecnologias Utilizadas
- [**bcrypt**](https://www.npmjs.com/package/bcrypt)
- [**bluebird**](https://www.npmjs.com/package/bluebird)
- [**body-parser**](https://github.com/expressjs/body-parser#readme)
- [**dotenv**](https://dotenv.org/vault?r=1)
- [**eslint**](https://eslint.org/)
- [**express**](http://expressjs.com/en/resources/middleware/body-parser.html)
- [**jest**](https://jestjs.io/pt-BR/)
- [**jsonwebtoken**](https://datatracker.ietf.org/doc/html/rfc7519)
- [**passport**](https://www.passportjs.org/)
- [**redis**](https://redis.io/)
- [**sqlite3**](https://www.sqlite.org/index.html)

## Organização e estruturação do projeto

A API esta organizada e estruturada da seguinte forma:

```
    ├── .env
    ├── .eslintrc.json
    ├── API Security.postman_collection.json
    ├── docker-compose.yml
    ├── dockerfile
    ├── package.json
    ├── README.md 
    ├── api
    |   ├── app.js
    |   ├── database.js
    |   ├── server.js
    |   ├── redis
    |   |  ├── blacklist.js
    |   |  ├── manipulateBlacklist.js
    |   ├── src
    |   |  ├── controllers
    |   |  |  ├── index.js
    |   |  |  ├── postsControllers.js
    |   |  |  ├── userControllers.js
    |   |  ├── dao
    |   |  |  ├── __mocks__
    |   |  |  |  ├── userDao.js
    |   |  |  ├── postsDao.js
    |   |  |  ├── userDao.js
    |   |  ├── err
    |   |  |  ├── index.js
    |   |  |  ├── InternalServerError.js
    |   |  |  ├── InvalidArgumentError.js
    |   |  ├── imiddlewares
    |   |  |  ├── middlewaresAuthentication.js
    |   |  ├── models
    |   |  |  ├── index.js
    |   |  |  ├── PostsModels.js
    |   |  |  ├── UserModels.js
    |   |  ├── routes
    |   |  |  ├── index.js
    |   |  |  ├── postsRoutes.js
    |   |  |  ├── userRoutes.js
    |   |  ├── token
    |   |  |  ├── index.js
    |   |  ├── validation
    |   |  |  ├── index.js
    |   |  |  ├── authenticationStrategyBarer.js
    |   |  |  ├── authenticationStrategyLocal.js
    |   |  |  ├── commonValidations.js
    ├── test
    |   ├── src
    |   |  ├── modules
    |   |  |  ├── UserModels.test.js
```
## Executando a aplicação em ambiente de desenvolvimento

### Será necesario ter instalado na sua maquina:
```
Git
Docker
```

A aplicação poderá ser executada dentro do docker ou utilizando os scripts pelo o terminal
Sera necessário a criação de um arquivo .env na raiz do projeto com a informação do SECRET_KEY.
Sendo a chave do servido, para a validação do token.

## Utilizando o Docker
na pasta raiz da aplicação execute o arquivo docker-compose.yml, que irá orquestrar a nossa aplicação, no terminal, entre na pasta e execute o comando docker-compose up

```sh
cd ./
docker-compose up
```
criando as imagens e subindo os contêineres:

- api;
        - rest-api-security:1.0
- redis;
        - redis:7.0.0-alpine

Para os processo de criação de post, logout ou deletar usuário, é necessário colocar um token valido no header da requisição. 

a aplicação ira rodar na porta 3000.