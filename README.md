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

# License

Copyright 2019 Luis Rodriguez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
