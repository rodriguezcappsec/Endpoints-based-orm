// const host = "http://localhost:4741"
// const fullRoute = `${host}${config.get_user}`
// const https = require('https');
// const http = require('http')
var fs = require('fs')

let getFiles = function (dir, filelist, prefix) {
    var fs = fs || require("fs"),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    prefix = prefix || "";
    files.forEach(function (file) {
        if (fs.statSync(dir + "/" + file).isDirectory()) {
            filelist = getFiles(dir + "/" + file, filelist, prefix + file + "/");
        } else {
            filelist.push(prefix + file);
        }
    });
    return filelist;
};


let configs = getFiles("./app/services/endPoints");

var config = configs.forEach((config) => {
    var entity = config.split("/")[0];
    // var config = eval("(" + fs.readFileSync("./app/services/endPoints/" + "/" + config) + ")");
    var config = eval(`(${fs.readFileSync("./app/services/endPoints/" + "/" + config)})`);
    console.log(config)
})

// console.log(configs);



// let getParams = fullRoute.split("/:")
// getParams.shift()
// getParams = getParams.map((param) => param.replace('/', ''))

// http.get(fullRoute, (resp) => {
//     let data = "";
//     resp.on('data', (chunk) => {
//         data += chunk;
//         console.log(data)
//     });
// })