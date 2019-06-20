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
          let autho = options.authorization!= undefined ? options.authorization : "";
          return await axios.get(options.url, autho);
        }
        if (verb == "post") {
          return await axios.post(
            options.url,
            options.body,
            options.authorization
          );
        }
        if (verb == "patch" || verb == "put") {
          return await axios({
            method: verb,
            url: options.url,
            data: options.body,
            headers: options.authorization.headers
          });
        }
        if (verb == "delete") {
          return await axios.delete(options.url);
        }
      }
      let data = await initAxios(
        {
          url: host + element.url + params,
          authorization: authType,
          body: body
        },
        element.method
      );
      return data.data;
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
