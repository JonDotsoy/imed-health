var https = require("https");

const config = {
  auth: {
    username: 'admin@admin.cl',
    password: 'admin',
  }
}

/** @return {Promise<{status:number,token:string}>} */
function login() {
  return new Promise((resolve, reject) => {
    var options = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      }
    };
    var req = https.request('https://api-semaforo.i-med.cl/v1/user/login', options, function (res) {
      var chunks = [];
      res.on('error', function (error) {
        reject(error);
      });
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve(JSON.parse(body.toString()));
      });
    });
    req.write(JSON.stringify(config.auth));
    req.end();
  });
}

/**
 * @param {string} token
 * @returns {Promise<{status:number,response:{financiadores:{id_asegurador:number,name:string,status:'activo'|'inactivo'}[]}}>}
 */
function status(token) {
  return new Promise((resolve, reject) => {
    var options = {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token,
        "cache-control": "no-cache",
      }
    };
    var req = https.request('https://api-semaforo.i-med.cl/v1/status/', options, function (res) {
      var chunks = [];
      res.on('error', function (error) {
        reject(error);
      });
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve(JSON.parse(body.toString()));
      });
    });
    req.write(JSON.stringify(config.auth));
    req.end();
  });
}

module.exports.login = login;
module.exports.status = status;
