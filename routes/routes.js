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

//import functions from controller
import {
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
  getGuestRegAdmin,
  getGuestRegResident,
  updateGuestRegistrationTime,
} from "../controllers/GuestController.js"
import {
  registerNewBeingInRoom,
  returnLeisureRegistrations,
  updateRegistrationStatus,
  returnLeisureRoomData,
  returnUserLeisureRegistration,
  updateUserLeisureRegistration,
  getLeisureRegAdmin,
  getLeisurRegResident,
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
  getWashingtRegAdmin,
  getWashingRegResident,
} from "../controllers/WashingMachineController.js"


//init express router
const router = express.Router();
//create a new user's account
router.post("/register", registerNewUser);
// return a jwt token and the blocked status if the user logs in sucesfully
router.post("/login",limiter, returnLoginUser);
//retuens user's id ant role by the given name
router.post("/userByName", returnUserByName);
 //returns user's information
router.get("/user/:id", returnUserInfo);
//returns all workers contact information
router.get("/contacts", returnAllContactInformation);
 //returns user's room number
router.post("/userRoom/:id", returnUserRoom);
//block a residents account
router.put("/block/:id", blockUser);
//update user's email and blocked status
router.put("/updateUser/:id", updateUserInfo);
//check if user's jwt token is still valid
router.get("/authenticate", AuthentificateUser);
//return all the information about all the services
router.get("/services", returnAllServices);
  //registers a guest for a stay at the dormitary
router.post("/registerGuest", registerNewUserGuest);
//return all user guest registrations that are waiting confirmation
router.get("/guestRegistrations/:id", returnUserRegistrations);
//resident cancels his guest registration
router.put("/cancelGuest/:id", cancelGuestRegistration);
//get guest registrations that are waiting confirmation
router.get("/activeGuests", returnActiveRegistrations);
//update guest registrations status
router.put("/updateGuest/:id", updateGuestRegistrationStatus);
//get guest registrations that are already confirmed
router.get("/confirmedGuests", returnConfirmedRegistrations);
//save resident's leisure room registration
router.post("/registerLeisure/:id", registerNewBeingInRoom);
//return leiure room registrations that are waiting confirmation
router.get("/activeLeisure", returnLeisureRegistrations);
//update the status of a leisure room registration
router.put("/updateLeisure/:id", updateRegistrationStatus);
//return the name and surname of the resident's that currently have a confirmed registration
router.get("/confirmedLeisure", returnLeisureRoomData);
//return a user's leisure room registration that is waiting confirmation or is confirmed
router.get("/userLeisure/:id", returnUserLeisureRegistration);
//resident updates his leisure room registration status to canceled or finished
router.put("/updateUserLeisure/:id", updateUserLeisureRegistration);
//sets the occupation of the worker
router.put("/occupation/:id", updateOccupation);
//return the occupation of the user with the given id
router.get("/userOccupation/:id", returnUserOccupation);
//return the admin's occupation
router.get("/adminOccupation", returnAdminOccupation);
//return the doorkeeper's occupation
router.get("/doorkeeperOccupation", returnDoorkeeperOccupation);
//return rooms that are available to register a resident in
router.post("/roomsForRegistration", returnRoomsForRegistration);
//update the amout of free spaces left in the room
router.put("/updateRoomSpace/:id", UpdateRoomSpace);
//update room status if the room has no more free space
router.put("/updateRoomstatus", UpdateRoomStatus);
//check if an account with the given username exists
router.post("/checkUsername", checkIfUserExists);
//return the name and surname of all the residents in the system
router.get("/residents", getResidentsInformation);
//send an email to a user with the login credentials
router.post("/sendMail", sendMailToUser);
//update the password of a user with the given id
router.put("/userPass/:id", updateUserPassword);
//returns information about all washing machines
router.get("/machineData", getMachineData);
//registers a new washing for a spesific washing machine
router.post("/registerWashing", registerNewWashing);
//update washing machine with the washing registration data
router.put("/updatemachine/:id", updateMachineStatus);
//update washing machine status when the washing registration is finished
router.put("/finishMachine/:id", updateMachineWhenFinished);
//set the washing registrations status to 'Užbaigta'
router.put("/finishWashing/:id", endWashingRegistration);
//register a washing machine failure
router.post("/registerFailure", registerNewWashingFailure);
//sets the washing machine's first failure registration
router.put("/machineFailFirstReg/:id", updateMachineFailFirstReg);
//sets the washing machine's second failure registration
router.put("/machineFailSecondtReg/:id", updateMachineFailSecondtReg);
//sets the washing machine's third failure registration
router.put("/machineFailThirdtReg/:id", updateMachineFailThirdtReg);
//get users that currectly have an active washing machine failure registration
router.get("/getFailRegUsers/:id", getUsersByFailReg);
//repair a broken washing mashine
router.put("/fixMachine/:id", fixWashingMachine);
//return resident's washing machine failure registration history
router.get("/machineFailResident/:id", getMachineFailRegResident);
//return washing machine failure registration history for the admin
router.get("/machineFailAdmin", getMachineFailRegAdmin);
//return guest registration history for the admin
router.get("/guestRegAdmin", getGuestRegAdmin);
//return resident's guest registration history
router.get("/guestRegResident/:id", getGuestRegResident);
//return leisure room registration history for the admin
router.get("/leisureRegAdmin", getLeisureRegAdmin);
//return resident's guest leisure room registration history
router.get("/leisureRegResident/:id", getLeisurRegResident)
//return washing registration history for the admin
router.get("/washingRegAdmin", getWashingtRegAdmin);
//return resident's guest washing registration history
router.get("/washingRegResident/:id", getWashingRegResident)
  //update guest registration arrival time
router.put("/updateGuestArrival/:id", updateGuestRegistrationTime)































export default router;