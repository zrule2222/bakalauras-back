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

import {
  registerNewUserGuest,
  returnUserRegistrations,
  cancelGuestRegistration,
  returnActiveRegistrations,
  updateGuestRegistrationStatus,
  returnConfirmedRegistrations,
} from "../controllers/GuestController.js"
import {
  registerNewBeingInRoom,
  returnLeisureRegistrations,
  updateRegistrationStatus,
  returnLeisureRoomData,
  returnUserLeisureRegistration,
  updateUserLeisureRegistration
} from "../controllers/LeisureRoomController.js"


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

router.post("/registerGuest", registerNewUserGuest);

router.get("/guestRegistrations/:id", returnUserRegistrations);

router.put("/cancelGuest/:id", cancelGuestRegistration);

router.get("/activeGuests", returnActiveRegistrations);

router.put("/updateGuest/:id", updateGuestRegistrationStatus);

router.get("/confirmedGuests", returnConfirmedRegistrations);

router.post("/registerLeisure/:id", registerNewBeingInRoom);

router.get("/activeLeisure", returnLeisureRegistrations);

router.put("/updateLeisure/:id", updateRegistrationStatus);

router.get("/confirmedLeisure", returnLeisureRoomData);

router.get("/userLeisure/:id", returnUserLeisureRegistration);

router.put("/updateUserLeisure/:id", updateUserLeisureRegistration);

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