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
    // getProductById,
    // insertProduct,
    // updateProductById,
    // deleteProductBySuma,
    // testas,
    // testas2,
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

  // export const returnLoginUser = (req, res) => {
  //   const loginData = req.body;
  //   getLoginUser(loginData, (err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       if(results.length > 0){
  //       let rez = {
  //         "username": results[0].username,
  //         "role":results[0].role,
  //          "id": results[0].user_id
  //       }
  //       res.json(rez);
  //     }
  //     else{
  //       res.status(500)
  //       res.json("Naudotojas su įvestais prisijiungimo duomenimis neegzistuoja");
  //     }
  //     }
  //   });
  // };

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
        res.json(jwtToken);
      }
      else{
        res.status(500)
        res.json("Naudotojas su įvestais prisijiungimo duomenimis neegzistuoja");
      }
      }
    });
  };

  export const AuthentificateUser = (req, res) => {
    console.log(req)
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
        console.log(decoded)
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
        res.json(results[0]);
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
  
  // //get single product
  // export const showProductById = (req, res) => {
  //   getProductById(req.params.id, (err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // };
  
  // //create new product
  // export const createProduct = (req, res) => {
  //   const data = req.body;
  //   insertProduct(data, (err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // };
  
  // // Update Product
  // export const updateProduct = (req, res) => {
  //   const data = req.body;
  //   const id = req.params.id;
  //   updateProductById(data, id, (err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // };
  
  // // Delete Product
  // export const deleteProduct = (req, res) => {
  //   const id = req.params.id;
  //   deleteProductById(id, (err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // };

  // export const deleteProductbysum1 = (req, res) => {
  //   const suma = req.params.suma;
  //   deleteProductBySuma(suma, (err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // };

  // export const testas11 = (req, res) => {
  //   const id1 = req.params.id;
  //   const id2 = req.params.id2;
  //   testas(id1, id2, (err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // };

  // export const testas22 = (req, res) => {
  //   const data = req.body;
  //   testas2(data, (err, results) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // };