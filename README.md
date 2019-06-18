# Endpoints-based-orm

## Client example:

```javascript
let socket = io.connect("server url");
socket.on("orm.js", data => {
  eval(data.apiOrm); // receving funcions as string and turning them into usable functions with eval
  console.log(data.functionNames) // logging the function names
  find({token:"some auth token here", params:["param value here"]}).then(data=>console.log(data)) // string 'find' function now usable due to eval
});
```
## Backend endpoint setup example:

```json
{
   
    "find": {
        "url": "/api/v1/users",
        "type": "get",
        "params": ["id"],
        "authorization": "bearer",
        "objectName":"Person"

    },
    "all": {
        "url": "/api/v1/users",
        "type": "get",
        "params": [],
        "authorization": ""
    },
    "create": {
        "url": "/api/v1/users",
        "type": "post",
        "params": [],
        "body": {
            "firstName": "",
            "lastName": "",
            "email": ""
        },
        "authorization": "bearer"
    },
    "update": {
        "url": "/api/v1/users/",
        "type": "patch",
        "params": ["id"],
        "authorization": "bearer"
    }
}

```
