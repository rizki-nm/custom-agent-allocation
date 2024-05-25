import express from "express";
import router from "./route.js";

export const web = express();
web.use(express.json());
web.use(router);