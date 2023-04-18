//import functions from Product model
import {
  getAllUsers,
    registerUser,
    getLoginUser,
    getUserByName,
    getUserInfo,
    getAllContactInformation,
    getUserRoom,
    blockUserById,
    updateUserInfoById,
    updateOccupationById,
    getUserOccupation,
    getAdminOccupation,
    getDoorkeepernOccupation,
    checkIfUserExistsByName,
    getAllResidentsInformation
  } from "../models/UserModel.js";

  import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var jwt = require('jsonwebtoken');
  
  //get all products
  export const returnAllUsers = (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };

    export const registerNewUser = (req, res) => {
    const registrationData = req.body;
    registerUser(registrationData, (err, results) => {
      if (err) {
        res.send("Registration failed");
      } else {
        res.json("Registration was sucessfull");
      }
    });
  };

  export const returnLoginUser = (req, res) => {
    const loginData = req.body;
    getLoginUser(loginData, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
        let rez = {
          "username": results[0].username,
          "role":results[0].role,
           "id": results[0].user_id
        }

        let jwtToken = jwt.sign(rez, process.env.TOKEN_SECRET, { expiresIn: '1h' })
        res.json({token: jwtToken, blocked:  results[0].blocked });
      }
      else{
        res.status(500)
        res.json("Naudotojas su įvestais prisijiungimo duomenimis neegzistuoja");
      }
      }
    });
  };

  export const AuthentificateUser = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
     return res.sendStatus(401)
    }
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) {
        res.sendStatus(401)
      }
      else{
        res.json(decoded);
      }
    })

    };

  export const returnUserByName = (req, res) => {
    const userName = req.body;
    getUserByName(userName,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.json(results[0])
          }
          else{
            res.status(500)
            res.json("Gyventojas neegzistuoja")
          }
      }
    });
  };

  
  export const returnUserInfo = (req, res) => {
    const id = req.params.id
    getUserInfo(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
        res.json(results[0])
        }
        else{
          res.status(500)
          res.json("no user data found")
        }
      }
    });
  };

  export const returnAllContactInformation = (req, res) => {
    getAllContactInformation((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
        res.json(results)
        }
        else{
          res.status(500)
          res.json("Nerasta nei vieno darbuotojo kontaktinė informacija")
        }
      }
    });
  };

  export const returnUserRoom = (req, res) => {
    const id = req.params.id
    const fk_room = req.body;
    getUserRoom(id,fk_room.room,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.json(results[0])
          }
          else{
            res.status(500)
            res.json("Naudotojo kambarys nerastas")
          }
      }
    });
  };

  export const blockUser = (req, res) => {
    const id = req.params.id
    blockUserById(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
          res.json("naudotojas užblokuotas sėkmingai")
          }
          else{
            res.status(500)
            res.json("Nepavyko užblokuoti naudotojo")
          }
      }
    });
  };

  export const updateUserInfo = (req, res) => {
    const id = req.params.id
    const updateData = req.body;
    updateUserInfoById(updateData,id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        
        if(results.affectedRows > 0){
           res.json("naudotojo duomenys atnaujinti sėkmingi")
          }
          else{
            res.status(500)
            res.json("Nepavyko atnaujinti naudotojo duomenų")
          }
      }
    });
  };

  export const updateOccupation = (req, res) => {
    const id = req.params.id
    const updateData = req.body;
    updateOccupationById(updateData,id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
          res.json("užimtumas atnaujintas sėkmingai")
          }
          else{
            res.status(500)
            res.json("Nepavyko atnaujinti užimtumo")
          }
      }
    });
  };

  export const returnUserOccupation = (req, res) => {
    const id = req.params.id
    getUserOccupation(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.json(results[0])
          }
          else{
            res.status(500)
            res.json("Naudotojas neturi užimtumo")
          }
      }
    });
  };

  export const returnAdminOccupation = (req, res) => {
    getAdminOccupation((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.json(results[0])
          }
          else{
            res.status(500)
            res.json("Administratorius nepriima gyventojų")
          }
      }
    });
  };

  export const returnDoorkeepernOccupation = (req, res) => {
    getDoorkeepernOccupation((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.json(results[0])
          }
          else{
            res.status(500)
            res.json("Budėtojas nepriima gyventojų")
          }
      }
    });
  };

  export const checkIfUserExists = (req, res) => {
    const data = req.body;
    let username = data.username
    checkIfUserExistsByName(username,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.status(500)
          res.json("Naudotojas su tokiu prisijiungimo vardu jau egzistuoja")
          }
          else{
            res.json("Naudotojo su tokiu prisijiungimo vardu nėra")
          }
      }
    });
  };

  export const getResidentsInformation = (req, res) => {
    getAllResidentsInformation((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.json(results)
          }
          else{
            res.status(500)
            res.json("Bendrabutyje nėra užregistruotų gyventojų")
          }
      }
    });
  };



