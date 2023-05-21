
import{
    registerUserGuest,
    getUserRegistrations,
    cancelGuestRegistrationById,
    getActiveRegistrations,
    updateGuestRegistrationStatusById,
    getConfirmedRegistrations,
    getGuestRegForAdmin,
    getGuestRegForResident,
} from "../models/GuestModal.js";
  //registers a guest for a stay at the dormitary
export const registerNewUserGuest = (req, res) => {
    const registrationData = req.body;
    registerUserGuest(registrationData, (err, results) => {
      if (err) {
        res.send("Svečio registracija nebuvo sėkminga");
      } else {
        //res.json(results)
        res.json("Svečio registracija buvo sėkminga");
      }
    });
  };
//return all user guest registrations that are waiting confirmation
  export const returnUserRegistrations = (req, res) => {
    const id = req.params.id;
    getUserRegistrations(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Naudotojas neturi svečių registracijų")
            }
      }
    });
  };
//resident cancels his guest registration
  export const cancelGuestRegistration = (req, res) => {
    const id = req.params.id;
    cancelGuestRegistrationById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Svečio registracija atšaukta sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko atšaukti svečio registracijos")
           }
      }
    });
  };
//get guest registrations that are waiting confirmation
  export const returnActiveRegistrations = (req, res) => {
    getActiveRegistrations((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nėra aktyvių svečių registracijų")
            }
      }
    });
  };
//update guest registrations status
  export const updateGuestRegistrationStatus = (req, res) => {
    const id = req.params.id;
    const status = req.body;
    let updateData = {
        id: id,
        status: status.status,
        doorKeeper_id: status.doorKeeper_id
    }
    updateGuestRegistrationStatusById(updateData, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Registracijos statusas atnaujintas sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko atnaujinti svečio registracijos statuso")
           }
      }
    });
  };
//get guest registrations that are already confirmed
  export const returnConfirmedRegistrations = (req, res) => {
    getConfirmedRegistrations((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nėra aktyvių svečių registracijų")
            }
      }
    });
  };
//return guest registration history for the admin
  export const getGuestRegAdmin = (req, res) => {
    getGuestRegForAdmin((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nepavyko gauti gyventojo svečių registracijų")
            }
      }
    });
  };
//return resident's guest registration history
  export const getGuestRegResident = (req, res) => {
    const id = req.params.id;
    getGuestRegForResident(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nepavyko gauti gyventojo svečių registracijų")
            }
      }
    });
  };


 