const express = require("express");
const next = require("next");
const mongoose = require('mongoose');
const routes = require("../routes");
const authServices = require('./services/auth');
const compression =require('compression');
const config =require('./config');
const bodyParser = require("body-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const portfolioRoutes = require("./routes/portpolio");
const blogRoutes = require("./routes/blog");
const secretData=[
    {
        title:'ScreatData 1',
        description:'Plans How To Build Ship'
    },
       {
        title:'ScreatData 2',
        description:'My Sec Pass'
    }
]

mongoose
  .connect(process.env.DB_URI
   ,{
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DataBase Connected"))
  .catch((err) => console.error(err));

app.prepare().then(() => {
  const server = express();
  server.use(compression());
  server.use(bodyParser.json());

  server.use("/api/v1/portfolios", portfolioRoutes);
  server.use("/api/v1/blog", blogRoutes);
  server.get("/api/v1/secret", authServices.checkJWT, (req, res) => {
    return res.json(secretData);
  });
  server.get("/api/v1/onlysiteowner", authServices.checkJWT,authServices.checkRole('siteOwner'),(req, res) => {
      return res.json(secretData);
    });

  // we are handling all of the request comming to our server
  server.get("*", (req, res) => {
    // next.js is handling requests and providing pages where we are navigating to
    return handle(req, res);
  });

    server.use(function (err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res.status(401).send({ title: "Unauthorized", detail: "Unauthorized Access" });
      }
    });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("> Ready on port " + PORT);
  });
});
