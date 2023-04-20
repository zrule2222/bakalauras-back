
import{
    registerUserGuest,
    getUserRegistrations,
    cancelGuestRegistrationById,
    getActiveRegistrations,
    updateGuestRegistrationStatusById,
    getConfirmedRegistrations,
} from "../models/GuestModal.js";

export const registerNewUserGuest = (req, res) => {
    const registrationData = req.body;
    registerUserGuest(registrationData, (err, results) => {
      if (err) {
        res.send("Registration failed");
      } else {
        //res.json(results)
        res.json("Gues registration was sucessfull");
      }
    });
  };

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
 