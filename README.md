# Endpoints-based-orm

## Client exam:
let socket = io.connect("http://localhost:4741");
socket.on("orm.js", data => {
  eval(data.apiOrm);
  console.log(data.functionNames)
  find({token:"some auth token here", params:["param value here"]}).then(data=>console.log(data))
});
