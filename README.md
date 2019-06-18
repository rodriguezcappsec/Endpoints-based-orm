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
