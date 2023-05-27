//import functions from Product model
import {
    registerUser,
    getLoginUser,
    getUserByName,
    getUserInfo,
    getAllContactInformation,
    blockUserById,
    updateUserInfoById,
    updateOccupationById,
    getUserOccupation,
    getAdminOccupation,
    getDoorkeeperOccupation,
    checkIfUserExistsByName,
    getAllResidentsInformation,
    updateUserPasswordById,
    getUserPasswordById,
    getUserBlockedStatusById,
  } from "../models/UserModel.js";

  import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var jwt = require('jsonwebtoken'); //import jwt

var nodemailer = require('nodemailer'); //import nodemailer
const bcrypt = require('bcrypt'); //import bcrypt
const dotenv = require('dotenv'); //import dotenv
dotenv.config(); // get config variables
//create mail transporter
var transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASS
  }
});

//send an email to a user with the login credentials
  export const sendMailToUser = (req, res) => {
    const MailData = req.body;
    var mailOptions = {
      from: process.env.EMAIL_NAME,
      to: MailData.userMail,
      subject: 'Naujai sukurta bendrabučio paskyra',
      text: `Jums buvo sukurta nauja paskyra bendrabučio sistemoje\nPaskyros prisijungimo vardas: ${MailData.username}\nSlaptažodis: ${MailData.password}\nPrašome pasikeisti slaptažodį prisijiungus prie bendrabučio sistemos`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.send("Laiško išsiųsti nepavyko");
      } else {
        res.json("Laiškas naudotojui nusiųstas sėkmingai");
      }
    });
  };
//create a new user's account and hash the user's password
    export const registerNewUser = (req, res) => {
    const registrationData = req.body;
    bcrypt.hash(registrationData.password,  Number(process.env.SALT_ROUNDS), function(err, hash) {
      registrationData.password = hash
      registerUser(registrationData, (err, results) => {
        if (err) {
          res.send("Registracija nepavyko");
        } else {
          res.json("Registracija buvo sėkminga");
        }
      });
});

  };
//update the password of a user with the given id
  export const updateUserPassword = (req, res) => {
    const id = req.params.id
    const updateData = req.body;

   getUserPasswordById(id, (err, results) => {
    if (err) {
     
    } else {
      bcrypt.compare(updateData.password, results[0].passsword, function(err, result) {
        if(result == true){
          res.status(500)
          res.send("Bandoma keisti į tą patį slaptažodį");
          
        }
        else{
          bcrypt.hash(updateData.password, Number(process.env.SALT_ROUNDS), function(err, hash) {
            updateData.password = hash
            updateUserPasswordById(updateData,id, (err, results) => {
              if (err) {
                res.status(501)
                res.send("Slaptažodžio keitimas nepavyko");
              } else {
                res.json("Slaptažodis pakeistas sėkmingai");
              }
            });
          });
        }

      
    });
  }
  });

  };

// return a jwt token and the blocked status if the user logs in sucesfully
  export const returnLoginUser = (req, res) => {
    const loginData = req.body;
    getLoginUser(loginData, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          bcrypt.compare(loginData.password, results[0].passsword, function(err, result) {
            if(result == true){
              let rez = {
              "username": results[0].username,
              "role":results[0].role,
               "id": results[0].user_id,
               "blocked": results[0].blocked
            }
    
            let jwtToken = jwt.sign(rez, process.env.TOKEN_SECRET, { expiresIn: '1h' })
            res.json({token: jwtToken, blocked:  results[0].blocked });
            }
            else{
              res.status(500)
              res.json("Naudotojas su įvestais prisijungimo duomenimis neegzistuoja");
            }

        });
       
      }
      else{
        res.status(500)
        res.json("Naudotojas su įvestais prisijungimo duomenimis neegzistuoja");
      }
      }
    });
  };
  //check if user's jwt token is still valid
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
//retuens user's id ant role by the given name
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

   //returns user's information
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
          res.json("Naudotojo informacija nerasta")
        }
      }
    });
  };
//returns all workers contact information
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
//block a residents account
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
//update user's email and blocked status
  export const updateUserInfo = (req, res) => {
    const id = req.params.id
    const updateData = req.body;
    updateUserInfoById(updateData,id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        
        if(results.affectedRows > 0){
           res.json(results)
          }
          else{
            res.status(501)
            res.json("Nepavyko atnaujinti naudotojo duomenų")
          }
      }
    });
  };
//sets the occupation of the worker
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
//return the occupation of the user with the given id
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
//return the admin's occupation
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
//return the doorkeeper's occupation
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
//check if an account with the given username exists
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
//return the name and surname of all the residents in the system
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


  //returns user's blocked status
  export const getUserBlockedStatus = (req, res) => {
    const id = req.params.id
    getUserBlockedStatusById(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.json(results)
          }
          else{
            res.status(500)
            res.json("Nepavyko gauti gyventojo užblokavimo statuso")
          }
      }
    });
  };

