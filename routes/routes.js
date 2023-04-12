//import express
import express from "express";

//import functions from controller
import {
  returnAllUsers,
  registerNewUser,
  returnLoginUser,
  returnUserByName,
  returnUserInfo,
  returnAllContactInformation,
  returnUserRoom,
  blockUser,
  updateUserInfo,
  AuthentificateUser,
  // showProductById,
  // createProduct,
  // updateProduct,
  // deleteProduct,
  // deleteProductbysum1,
  // testas11,
  // testas22,
} from "../controllers/UserController.js";

import {
  returnAllServices,
} from "../controllers/ServiceController.js"

//init express router
const router = express.Router();

//get all product
router.get("/users", returnAllUsers);

router.post("/register", registerNewUser);

router.post("/login", returnLoginUser);

router.post("/userByName", returnUserByName);

router.get("/user/:id", returnUserInfo);

router.get("/contacts", returnAllContactInformation);

router.post("/userRoom/:id", returnUserRoom);

router.put("/block/:id", blockUser);

router.put("/updateUser/:id", updateUserInfo);

router.get("/authenticate", AuthentificateUser);

router.get("/services", returnAllServices);

// //get single product
// router.get("/products/:id", showProductById);

// // Create New Product
// router.post("/products", createProduct);

// // Update Product
// router.put("/products/:id", updateProduct);

// // Delete Product
// router.delete("/products/:id", deleteProduct);

// router.delete("/products/del/:suma", deleteProductbysum1);

// router.get("/products/testas/:id/:id2", testas11);

// router.post("/products/testas2", testas22);

//export default router
export default router;