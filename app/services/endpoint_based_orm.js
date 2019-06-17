    
const getFiles = require("./directoriesRecursion.js");
var fs = require("fs");

let configs = getFiles("./app/services/endPoints");
let endPoints = configs.map(config =>
  eval(`(${fs.readFileSync("./app/services/endPoints/" + "/" + config)})`)
);
let evalFunctions = [];

let find =() =>{
  
}

endPoints.forEach(element => {
  const host = require("./config.json").host;
  for (const key in element) {
    evalFunctions.push(`
      function ${key}(){
        const http = require("http");
        const https = require("https");
        http.${element[key].type}("${host}${element[key].url}", (resp) => {
            let data = "";
            resp.on('data', (chunk) => {
                data += chunk;
                console.log(data)
            });
        })
      }
      `);
  }
});
//testing it with all
evalFunctions.forEach(functions => {
  eval(functions);
  all()
});