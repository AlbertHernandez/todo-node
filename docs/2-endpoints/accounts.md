<Block>

# Accounts

</Block>

<Block>

## Get Account

You can use this to get an account.

### Endpoint

```bash
GET /api/v1/account
```

### Parameters

|   Name   |  Type  | Description |      Required      |
| :------: | :----: | :---------: | :----------------: |
| email | string |  email of the account   | :heavy_check_mark: |

### Response

```json
Status: 200

{
  "data": {
    "id": "c04af4bd-1f6a-4fde-b594-9f059ab44042",
    "name": "Albert",
    "email": "albert@todos.com",
    "createdAt": "2021-05-01T15:16:11.736Z",
    "updatedAt": "2021-05-01T15:16:11.736Z"
  },
  "requestId": "de9c7646-4e79-4d06-b709-b8787c856840"
}
```

<Example>

<CURL>
```bash
curl --request GET \
  --url http://localhost:3000/api/v1/account \
  --header 'Content-Type: application/json' \
  --header 'api-key: 12345' \
  --data '{
	"email": "albert@todos.com"
}'
```

</CURL>

</Example>

</Block>

<Block>

## Get Accounts

You can use this to get all the existing accounts.

### Endpoint

```bash
GET /api/v1/accounts
```

### Response

```json
Status: 200

{
"data": [
    {
      "id": "ae0207b5-12d1-469c-a289-8744c67b4d0d",
      "name": "Juan",
      "email": "juan@todos.com",
      "createdAt": "2021-04-17T10:44:45.176Z",
      "updatedAt": "2021-04-17T10:44:45.176Z"
    },
    {
      "id": "a601bbc5-d7b8-4f94-a133-98709e264f2c",
      "name": "Fran",
      "email": "fran@todos.com",
      "createdAt": "2021-04-17T10:44:45.186Z",
      "updatedAt": "2021-04-17T10:44:45.186Z"
    },
    {
      "id": "80f64a22-6c31-433a-8f5e-f8d37bab02e4",
      "name": "Albert",
      "email": "albert@todos.com",
      "createdAt": "2021-04-17T10:44:45.188Z",
      "updatedAt": "2021-04-17T10:44:45.188Z"
    },
    {
      "id": "95aac184-f803-4000-b6c1-5c3c17c9fa68",
      "name": "Albert",
      "email": "albert5@todos.com",
      "createdAt": "2021-04-17T10:48:32.880Z",
      "updatedAt": "2021-04-17T10:48:32.880Z"
    }
  ],
  "requestId": "531bfc74-2859-4455-bcde-53b4dcb30df6"
}
```

<Example>

<CURL>
```bash
curl --request GET \
  --url http://localhost:3000/api/v1/accounts \
  --header 'api-key: 12345'
```

</CURL>

</Example>

</Block>

<Block>

## Create Account

You can use this to create an account.

### Endpoint

```bash
GET /api/v1/account
```

### Parameters

|   Name   |  Type  | Description |      Required      |
| :------: | :----: | :---------: | :----------------: |
| name | string |  name   | :heavy_check_mark: |
| email | string |  email   | :heavy_check_mark: |


### Response

```json
Status: 200

{
  "data": {
    "id": "4d2c6d02-d044-4b51-a8e4-4c85ac635435",
    "name": "Albert",
    "email": "albert6@todos.com",
    "createdAt": "2021-04-22T17:54:16.761Z",
    "updatedAt": "2021-04-22T17:54:16.761Z"
  },
  "requestId": "627eb358-2b7b-4f63-b5b6-db4eeb2161bb"
}
```

<Example>

<CURL>
```bash
curl --request PUT \
  --url http://localhost:3000/api/v1/account \
  --header 'Content-Type: application/json' \
  --header 'api-key: 12345' \
  --data '{
	"name": "Albert",
	"email": "albert6@todos.com"
}'
```

</CURL>

</Example>

</Block>

<Block>

## Delete Account

You can use this to create an account.

### Endpoint

```bash
DELETE /api/v1/account/:id
```

### Parameters

|   Name   |  Type  | Description |      Required      |
| :------: | :----: | :---------: | :----------------: |
| id | string |  id   | :heavy_check_mark: |

### Response

```json
Status: 200

{
  "data": {},
  "requestId": "8095f88f-4f41-48ce-912a-80b99e6d7e11"
}
```

<Example>

<CURL>
```bash
curl --request DELETE \
  --url http://localhost:3000/api/v1/account/4d2c6d02-d044-4b51-a8e4-4c85ac635435 \
  --header 'api-key: 12345'
```

</CURL>

</Example>

</Block>

<Block>

## Delete all Accounts

You can use this delete all existing accounts.

### Endpoint

```bash
DELETE /api/v1/accounts
```

### Response

```json
Status: 200

{
  "data": {},
  "requestId": "aeb58bd2-daf7-44ac-9141-483fed980805"
}
```

<Example>

<CURL>
```bash
curl --request DELETE \
  --url http://localhost:3000/api/v1/accounts \
  --header 'api-key: 12345'
```

</CURL>

</Example>

</Block>

<Block>

</Block>
