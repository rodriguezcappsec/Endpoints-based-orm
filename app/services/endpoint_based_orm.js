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
    function getParams(paramsArr) {
      let params = "";
      paramsArr.forEach(param => (params += "/" + param));
      return params;
    }
  `
  );

  evalFunctions.push(
    `
    async function optionsConditions(element, options, host) {
      let params = element.params ? getParams(options.params) : "";
      let authType = "";
      let body = element.body ? options.body : "";
      let headers = {
        auth2: {
          headers: {
            Authorization: "Token token=" + options.token
          }
        },
        bearer: {
          headers: {
            Authorization: "Bearer " + options.token
          }
        }
      };
      if (element.authorization) {
        if (options.token && options.token != "") {
          authType =
            element.authorization == "bearer" ? headers.bearer : headers.auth2;
        } else {
          authType = "";
        }
      } else {
        authType = "";
      }
      async function initAxios(options = {}, verb) {
        if (verb == "get") {
          return await axios.get(options.url, options.authentication);
        }
        if (verb == "post") {
          return await axios.post(
            options.url,
            options.body,
            options.authentication
          );
        }
      }
      let data = await initAxios(
        {
          url: host + element.url + params,
          authentication: authType,
          body: body
        },
        element.method
      );
      return data.data;
    }
    
    `
  );

  // evalFunctions.push(
  //   `async function optionsConditions(element, options, host) {
  //     if (element.params.length > 0 && element.type == "get") {
  //       let params = getParams(options.params);
  //       if(element.authorization){
  //         console.log(element.authorization)
  //       }
  //       let authType = element.authorization == "bearer" ? "Bearer " : "Token token=";
  //       let data = await axios.get(host + element.url + params, {
  //         headers: {
  //           Authorization: authType + options.token
  //         }
  //       });
  //       return data.data;
  //     }
  //   }
  // `
  // );

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
