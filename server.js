const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const socketOrmEndPoint = require("./app/services/endpoint_based_orm.js");

//require routes
const userRoutes = require("./app/routes/userRoutes.js");
//here
//------------------------

//Database conection "MongoDB"
mongoose
  .connect("mongodb://localhost:27017/end-point-orm-test", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("Could not connect to mongodb"));
//------------------------------------------------------------

//Middlewares
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://127.0.0.1:5500" })); // client server
app.use(express.json());
//-------------------------------------------------------------------------------
//Routes use
app.use(userRoutes);
//here
//----------------------

//----------------------
//Server start
const port = process.env.PORT || 4741;
const server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
//-------------------------------------------------------------

socketOrmEndPoint(server);
