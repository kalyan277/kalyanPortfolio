const jwt =require('express-jwt');
const jwksRsa = require("jwks-rsa");
const config =require('../config')
//MIDDLEWARE
const NAMESPACE = config.NAMESPACE;

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: "https://dev-mtadpx9d.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "38K2xttzqENxOqmCZFABnra77U7OJHPN",
  issuer: "https://dev-mtadpx9d.eu.auth0.com/",
  algorithms: ["RS256"],
});


exports.checkRole = function(role){
  return function(req,res, next){
    const user =req.user;
    //console.log(user);
    //console.log(role);
   // console.log(user[NAMESPACE + "role"]);
    if (user && user[NAMESPACE + "role"] && user[NAMESPACE + "role"] === role) {
      next();
    } else {
      return res
        .status(401)
        .send({
          title: "Not Authorized",
          description: "you are not authorized to access the data",
        });
    } 
  }
}

