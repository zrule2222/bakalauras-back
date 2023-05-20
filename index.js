//import express
import express from "express";

//import cors
import cors from "cors";

//import routes
import Router from "./routes/routes.js";

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const dotenv = require('dotenv');

// get config variables
dotenv.config();

//init express
const app = express();

//use express json
app.use(express.json());

//use cors
app.use(cors());

//use router
app.use(Router);




//PORT
app.listen(5000, () => {
  console.log("Server running successfully");
});