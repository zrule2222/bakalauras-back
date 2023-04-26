//import express
import express from "express";

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Per daug bandymų prisijungti. Pabandykite už kelių minučių",
});

// Apply the rate limiting middleware to all requests


//import functions from controller
import {
  returnAllUsers,
  registerNewUser,
  returnLoginUser,
  returnUserByName,
  returnUserInfo,
  returnAllContactInformation,
  blockUser,
  updateUserInfo,
  AuthentificateUser,
  updateOccupation,
  returnUserOccupation,
  returnAdminOccupation,
  returnDoorkeeperOccupation,
  checkIfUserExists,
  getResidentsInformation,
  sendMailToUser,
  updateUserPassword,
 // returnUserRoom
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
  updateUserLeisureRegistration,
} from "../controllers/LeisureRoomController.js"

import {
  returnRoomsForRegistration,
  UpdateRoomSpace,
  UpdateRoomStatus,
  returnUserRoom,
} from "../controllers/RoomsController.js"

import {
  getMachineData,
  registerNewWashing,
  updateMachineStatus,
  updateMachineWhenFinished,
  endWashingRegistration,
  registerNewWashingFailure,
  updateMachineFailFirstReg,
  updateMachineFailSecondtReg,
  updateMachineFailThirdtReg,
  getUsersByFailReg,
  fixWashingMachine,
  getMachineFailRegResident,
  getMachineFailRegAdmin,
} from "../controllers/WashingMachineController.js"


//init express router
const router = express.Router();

//get all product
router.get("/users", returnAllUsers);

router.post("/register", registerNewUser);

router.post("/login",limiter, returnLoginUser);

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

router.put("/occupation/:id", updateOccupation);

router.get("/userOccupation/:id", returnUserOccupation);

router.get("/adminOccupation", returnAdminOccupation);

router.get("/doorkeeperOccupation", returnDoorkeeperOccupation);

router.post("/roomsForRegistration", returnRoomsForRegistration);

router.put("/updateRoomSpace/:id", UpdateRoomSpace);

router.put("/updateRoomstatus", UpdateRoomStatus);

router.post("/checkUsername", checkIfUserExists);

router.get("/residents", getResidentsInformation);

router.post("/sendMail", sendMailToUser);

router.put("/userPass/:id", updateUserPassword);

router.get("/machineData", getMachineData);

router.post("/registerWashing", registerNewWashing);

router.put("/updatemachine/:id", updateMachineStatus);

router.put("/finishMachine/:id", updateMachineWhenFinished);

router.put("/finishWashing/:id", endWashingRegistration);

router.post("/registerFailure", registerNewWashingFailure);

router.put("/machineFailFirstReg/:id", updateMachineFailFirstReg);

router.put("/machineFailSecondtReg/:id", updateMachineFailSecondtReg);

router.put("/machineFailThirdtReg/:id", updateMachineFailThirdtReg);

router.get("/getFailRegUsers/:id", getUsersByFailReg);

router.put("/fixMachine/:id", fixWashingMachine);

router.get("/machineFailResident/:id", getMachineFailRegResident);

router.get("/machineFailAdmin", getMachineFailRegAdmin);

























export default router;