// npx sequelize-cli model: generate --name users --attributes email: varchar, password: varchar, name: varchar, role: int, avatar: varchar, phone: int,  created_at: datetime, updated_at: datetime
// npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string,role:integer,avatar:string,phone:string
// npx sequelize-cli db:migrate
//npx sequelize-cli model:generate --name Order --attributes user_id:integer,status:integer,note:text,total:integer
// npx sequelize-cli model:generate --name OrderDetail --attributes order_id:integer,product_id:integer,price:integer,quantity:integer

// const express = require("express");
import express from "express";
const app = express();

import { AppRouter } from "./routes/AppRoute.js";
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());
express.urlencoded({ extended: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

AppRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
