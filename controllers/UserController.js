//import functions from Product model
import {
  getAllUsers,
    registerUser,
    getLoginUser,
    getUserByName,
    getUserInfo,
    getAllContactInformation,
    //getUserRoom,
    blockUserById,
    updateUserInfoById,
    updateOccupationById,
    getUserOccupation,
    getAdminOccupation,
    getDoorkeeperOccupation,
    checkIfUserExistsByName,
    getAllResidentsInformation,
    updateUserPasswordById,
  } from "../models/UserModel.js";

  import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bakalaurasdorm@gmail.com',
    pass: 'bmeczxnjfxcuaeve'
  }
});


  
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

  export const sendMailToUser = (req, res) => {
    const MailData = req.body;
    var mailOptions = {
      from: 'bakalaurasdorm@gmail.com',
      to: MailData.userMail,
      subject: 'Naujai sukurta bendrabučio paskyrą',
      text: `Jūsų bendrabučio paskyros slaptažodis yra: ${MailData.password}\nPrašome pasikeisti šį slaptažodį prisijiungus prie bendrabučio sistemos`
    };
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
        
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.send("Laiško išsiūsti nepavyko");
      } else {
        res.json("Laiškas naudotojui nusiūstas sėkmingai");
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

  export const updateUserPassword = (req, res) => {
    const id = req.params.id
    const updateData = req.body;
    updateUserPasswordById(updateData,id, (err, results) => {
      if (err) {
        res.status(501)
        res.send("Slaptažodžio keitimas nepavyko");
      } else {
        if(results.changedRows  == 0){
          res.status(500)
          res.send("Bandoma keisti į tapatį slaptažodį");
        }
        else if(results.changedRows  == 1)
        res.json("Slaptažodis pakeistas sėkmingai");
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

  // export const returnUserRoom = (req, res) => {
  //   const id = req.params.id
  //   const fk_room = req.body;
  //   getUserRoom(id,fk_room.room,(err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       if(results.length > 0){
  //         res.json(results[0])
  //         }
  //         else{
  //           res.status(500)
  //           res.json("Naudotojo kambarys nerastas")
  //         }
  //     }
  //   });
  // };

  export const blockUser = (req, res) => {
    const id = req.params.id
    blockUserById(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
          res.json("Naudotojas užblokuotas sėkmingai")
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
           //res.json("Naudotojo duomenys atnaujinti sėkmingai")
           res.json(results)
          }
          else{
            res.status(501)
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
          res.json("Užimtumas atnaujintas sėkmingai")
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

  export const returnDoorkeeperOccupation = (req, res) => {
    getDoorkeeperOccupation((err, results) => {
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
          res.json("Naudotojas su tokiu prisijungimo vardu jau egzistuoja")
          }
          else{
            res.json("Naudotojo su tokiu prisijungimo vardu nėra")
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



