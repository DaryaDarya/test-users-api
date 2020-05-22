## Description

Сделать сервис управления пользователями.

Без аутентификации и авторизации, просто есть сущность User, у него может быть много Roles,  и одна Организация

User

——

id

name

login

password

roles

organisation


Role

_

id

name

users




Organisation

___

id

name

users



С использованием NestJS, TypeORM (любой поддерживаемой реляционной БД) написать API с swagger-документацией, которое реализует CRUD-операции над пользователями:

- Создание пользователя ( c присвоением существующей роли и привязкой к Организации (при отсутствии создать))

- Получение списка пользователей без Roles но с Organisation

- Получение одного пользователя со всеми связями

- Удаление пользователя



## Installation

```bash
$ npm install
```

## Documentation

http://localhost:3000/api


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations
```bash
# run migrations
$ typeorm migration:run

# rollback migrations
$ typeorm migration:revert
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
