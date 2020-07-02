# REST API for Phonebook

## @ GET /api/contacts

возвращает массив всех контактов в json-формате со статусом 200

## @ GET /api/contacts/:contactId

Получает параметр contactId
возвращает обьект контакта в json-формате со статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

## @ POST /api/contacts

Если в body нет каких-то обязательных полей, возарщает json с ключом {"message": "missing required name field"} и статусом 400
Если с body все хорошо, добавляет уникальный идентификатор в обьект контакта
возвращает обьект с добавленным id {id, name, email, phone} и статусом 201
