let ormEndPoints = (endPointFoldersPath, server, host) => {
  const socket = require("socket.io");
  const getFiles = require("./directoriesRecursion.js");
  var fs = require("fs");
  
  let configs = getFiles(endPointFoldersPath);
  let endPoints = configs.map(config =>
    JSON.parse(`${fs.readFileSync(endPointFoldersPath + "/" + config)}`)
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

  let io = socket(server);

  io.on("connection", socket => {
    socket.emit("orm.js", {
      apiOrm: evalFuncs,
      functionNames: functionsNames
    });
  });
};

module.exports = ormEndPoints;
