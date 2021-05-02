<Block>

# Todos

</Block>

<Block>

## Create Todo

You can use this to create new todos.

### Endpoint

```bash
PUT /api/v1/todo
```

### Parameters

|   Name   |  Type  | Description |      Required      |
| :------: | :----: | :---------: | :----------------: |
| author | string |  email of the author   | :heavy_check_mark: |
|  title   | string |    title    | :heavy_check_mark: |
|  content   | string |    content    | :heavy_check_mark: |
|  isCompleted   | boolean |    completed    | :heavy_check_mark: |

### Response

```json
Status: 200

{
    "data": {
        "id": "5a08ce98-f987-449f-934c-8053176d31b2",
        "author": "albert@todos.com",
        "title": "Test 1",
        "content": "This is a test",
        "isCompleted": "false"
    },
    "requestId": "b0aabc1b-95e8-4aac-8ad7-5122342a3daf"
}
```

<Example>

<CURL>
```bash
curl --request PUT \
  --url http://localhost:3000/api/v1/todo \
  --header 'Content-Type: application/json' \
  --header 'api-key: 12345' \
  --data '{
    "author": "albert@todos.com",
    "title": "Test 1",
    "content": "This is a test",
    "isCompleted": false
  }'
```

</CURL>

</Example>

</Block>

<Block>


## Get Todos

You can use this to get existing todos.

### Endpoint

```bash
GET /api/v1/todos
```

### Parameters

|   Name   |  Type  | Description |      Required      |
| :------: | :----: | :---------: | :----------------: |
| author | string |  email of the author   | :heavy_minus_sign: |
|  isCompleted   | boolean |    completed    | :heavy_minus_sign: |

### Response

```json
Status: 200

{
  "data": [
    {
      "id": "f91edc31-2e1f-46c2-ae2a-435826d10342",
      "author": "albert@todos.com",
      "title": "Test 2",
      "content": "Hello 2",
      "isCompleted": "true"
    }
  ],
  "requestId": "7ae2bfc3-7707-48b1-8fc0-bc8f6ab2aa68"
}
```

<Example>

<CURL>
```bash
curl --request GET \
  --url http://localhost:3000/api/v1/todos \
  --header 'Content-Type: application/json' \
  --header 'api-key: 12345' \
  --data '{
	"author": "albert@todos.com",
	"isCompleted": true
}'
```

</CURL>

</Example>

</Block>

<Block>

## Delete Todo

You can use this to delete a existing todo.

### Endpoint

```bash
DELETE /api/v1/todo/:id
```

### Parameters

|   Name   |  Type  | Description |      Required      |
| :------: | :----: | :---------: | :----------------: |
| id | string |  id of the todo to delete   | :heavy_check_mark: |

### Response

```json
Status: 200

{
  "data": {},
  "requestId": "7ae2bfc3-7707-48b1-8fc0-bc8f6ab2aa68"
}
```

<Example>

<CURL>
```bash
curl --request DELETE \
  --url http://localhost:3000/api/v1/todo/ac811138-1c8d-46c3-8065-07f1b475e98b \
  --header 'api-key: 12345'
```

</CURL>

</Example>

</Block>

<Block>

## Delete All Todos

You can use this to delete all existing todos.

### Endpoint

```bash
DELETE /api/v1/todos
```

### Response

```json
Status: 200

{
  "data": {},
  "requestId": "e357794b-2130-4b99-a377-8cac437d2d80"
}
```

<Example>

<CURL>
```bash
curl --request DELETE \
  --url http://localhost:3000/api/v1/todos \
  --header 'api-key: 12345'
```

</CURL>

</Example>

</Block>

<Block>


</Block>
