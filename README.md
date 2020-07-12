# REST API for Phonebook

## @ GET /api/contacts

- возвращает массив всех контактов в json-формате со статусом 200

## @ GET /api/contacts/:contactId

- Получает параметр contactId
- возвращает обьект контакта в json-формате со статусом 200
- если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

## @ POST /api/contacts

- Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
- Поля name, email должны быть уникальными, иначе возвращает json с обьектом ошибки от БД и статусом 400
- Если с body все хорошо, добавляет уникальный идентификатор в обьект контакта
- возвращает обьект с добавленным id {id, name, email, phone} и статусом 201

## @ DELETE /api/contacts/:contactId

- Получает параметр contactId
- если такой id есть, возвращает json формата {"message": "Contact succesful deleted!"} и статусом 200
- если такого id нет, возвращает json с ключом {"message": "Contact not found!"} и статусом 404

## @ PATCH /api/contacts/:contactId

- Получает body в json-формате c обновлением любых полей name, email и phone
- Если body нет, возарщает json с ключом {"message": "missing fields"} и статусом 400
- Поля name, email должны быть уникальными, иначе возвращает json с обьектом ошибки от БД и статусом 400
- По результату работы функции возвращает обновленный обьект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
