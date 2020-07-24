# REST API for Phonebook

# CONTACTS :telephone_receiver:

## @ GET /api/contacts

- возвращает массив всех контактов в json-формате со статусом 200
- так же поддерживает пагинацию и фильтр по полю контакта subscribe
- example :
  ```
  /api/contacts?sub=free&page=1&limit=10
  ```

## @ GET /api/contacts/:contactId

- Получает параметр contactId
- возвращает обьект контакта в json-формате со статусом 200
- если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

## @ POST /api/contacts

- Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing
  required name field"} и статусом 400
- Поля name, email должны быть уникальными, иначе возвращает json с обьектом ошибки от БД и статусом
  400
- Если с body все хорошо, добавляет уникальный идентификатор в обьект контакта
- возвращает обьект с добавленным id {id, name, email, phone} и статусом 201

## @ DELETE /api/contacts/:contactId

- Получает параметр contactId
- если такой id есть, возвращает json формата {"message": "Contact succesful deleted!"} и статусом
  200
- если такого id нет, возвращает json с ключом {"message": "Contact not found!"} и статусом 404

## @ PATCH /api/contacts/:contactId

- Получает body в json-формате c обновлением любых полей name, email и phone
- Если body нет, возарщает json с ключом {"message": "missing fields"} и статусом 400
- Поля name, email должны быть уникальными, иначе возвращает json с обьектом ошибки от БД и статусом
  400
- По результату работы функции возвращает обновленный обьект контакта и статусом 200. В противном
  случае, возвращает json с ключом "message": "Not found" и статусом 404

# USERS :couple:

## @ GET /users/current

- принимает токен в заголовке Authorization
- Если токен валидный - возвращает объект текущего пользователя в json-формате со статусом 200
- если токен не валидний возвращает ошибку со статусом 401

## @ GET /users/

- принимает токен в заголовке Authorization
- Если токен валидный - возвращает масив всех пользователей
- если токен не валидний возвращает ошибку со статусом 401

## @ GET /users/:id

- принимает токен в заголовке Authorization
- принимает id пользователя
- Если токен и id валидный - возвращает объект пользователя с указаным id
- если токен не валидний возвращает ошибку со статусом 401
- если id не валидний возвращает ошибку со статусом 400

## @ DELETE /users/:id

- принимает токен в заголовке Authorization
- принимает id пользователя
- Если токен и id валидный - удаляет пользователя из БД и возвращает статус 200 и сообщение об
  удалении
- если токен не валидний возвращает ошибку со статусом 401
- если id не валидний возвращает ошибку со статусом 400

## @ PATCH /users/:id

- принимает токен в заголовке Authorization
- принимает id пользователя
- принимает тело запроса с полями для обновления пользователя
- Если токен и id валидный, а также присутствует тело запроса - обновляет пользователя БД и
  возвращает статус 200 и сообщение об обновлении, обновленный объект пользователя
- если токен не валидний возвращает ошибку со статусом 401
- если id не валидний возвращает ошибку со статусом 400
- если тело запроса отсутствует или невалидные поля возвращает ошибку со статусом 400

# USERS :white_check_mark:

## @ POST /auth/signup

- принимает тело запроса с обязательными полями ( email , password) для создания пользователя. email
  должен быть уникальным
- если поля из тела запроса прошли проверку на валидность, возвращает статус 201 и обьект созданного
  пользователя
- если поля из тела запроса НЕ прошли проверку на валидность, возвращает ошибку со стаусом 400

## @ AUTHORIZATION /auth/login

- принимает тело запроса с обязательными полями ( email , password)
- если поля из тела запроса прошли проверку на валидность и пользователь с указаным email есть в БД,
  а также совпадает пароль, возвращает статус 200 и обьект пользователя с токеном
- иначе возвращает ошибку со стаусом 400

## @ POST /auth/logout

- принимает токен в заголовке Authorization
- если токен валидный разлогинит пользователя
- если токен НЕ валидный возвращает ошибку со стаусом 401
