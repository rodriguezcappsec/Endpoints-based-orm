const getFiles = require("./directoriesRecursion.js");
const socket = require("socket.io");
const host = require("./config.json").host;
var fs = require("fs");
const axios = require("axios");

let configs = getFiles("./app/services/endPoints");
let endPoints = configs.map(config =>
  JSON.parse(`${fs.readFileSync("./app/services/endPoints/" + "/" + config)}`)
);
let evalFunctions = [];
evalFunctions.push(
  `
  function getParams(paramsArr){
  let params = "";
  paramsArr.forEach(param => (params += "/"+param));
  return params;
};
`
);

evalFunctions.push(
  `async function optionsConditions(element, options, host){
  if (element.params.length > 0 && element.type == "get") {
    let params = getParams(options.params);
    let authType= element.authorization =="bearer" ? "Bearer " : "Token token=";
   let data = await axios.get(
      host + element.url + params,
      {
        headers: {
          Authorization:
             authType + options.token
       }
      }
    )
    return data.data
  }
}
`
);
let functionsNames = [];
endPoints.forEach(element => {
  for (const key in element) {
    functionsNames.push(key);
    evalFunctions.push(
      `
      function ${key}(options={}){
        return optionsConditions(` +
        JSON.stringify(element[key]) +
        ",options," +
        `'${host}'` +
        `)
      }`
    );
  }
});
//testing it with all
let evalFuncs;
evalFunctions.forEach(functions => {
  evalFuncs += functions;
});

let socketOrmEndPoint = server => {
  let io = socket(server);

  io.on("connection", socket => {
    socket.emit("orm.js", {
      apiOrm: evalFuncs,
      functionNames: functionsNames
    });
  });
};

module.exports = socketOrmEndPoint;
