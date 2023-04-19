//import express
import express from "express";

//import cors
import cors from "cors";

//import routes
import Router from "./routes/routes.js";

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// var jwt = require('jsonwebtoken');





const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var



// var decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNjgxMjI4MzA0LCJleHAiOjE2ODEyMjgzMzR9.LlG2oSvUWPMZIkL3ubpD5MaWbd4YSaIPKvyOft0TXac', 'secret')

// console.log(decoded) // bar)

//init express
const app = express();

//use express json
app.use(express.json());

// console.log(require('crypto').randomBytes(64).toString('hex'))
// console.log(process.env.TOKEN_SECRET)

// console.log(jwt.sign({
//   data: 'foobar'
// }, process.env.TOKEN_SECRET, { expiresIn: '1h' }))
//use cors
app.use(cors());

//use router
app.use(Router);




//PORT
app.listen(5000, () => {
  console.log("Server running successfully");
});