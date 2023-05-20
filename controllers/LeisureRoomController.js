import{
    registerBeingInRoom,
    getLeisureRegistrations,
    updateLeisureRegistrationStatusById,
    getLeisureRoomData,
    getUserLeisureRegistration,
    updateUserLeisureRegistrationStatus,
    getLeisureRegForAdmin,
    getLeisurRegForResident,
} from "../models/LeisureRoomModel.js";
//save resident's leisure room registration
export const registerNewBeingInRoom = (req, res) => {
    const registrationData = req.params.id;
    registerBeingInRoom(registrationData, (err, results) => {
      if (err) {
        res.send("Registration nepavyko");
      } else {
        
        res.json("Laisvalaikio kambario registracija sėkminga");
      }
    });
  };
//return leiure room registrations that are waiting confirmation
  export const returnLeisureRegistrations = (req, res) => {
    getLeisureRegistrations((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nėra laisvalaikio kambario registracijų laukiančių patvirtinimo")
            }
      }
    });
  };
//update the status of a leisure room registration
  export const updateRegistrationStatus = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    let updateData = {
        status: data.status,
        doorKeeper_id: data.doorKeeper_id
    }
    updateLeisureRegistrationStatusById(updateData,id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Registracijos statusas atnaujintas sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko atnaujinti laisvalaikio kambario registracijos statuso")
           }
      }
    });
  };
//return the name and surname of the resident's that currently have a confirmed registration
  export const returnLeisureRoomData = (req, res) => {
    getLeisureRoomData((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nėra patvirtintų laisvalaikio kambario registracijų ")
            }
      }
    });
  };
//return a user's leisure room registration that is waiting confirmation or is confirmed
  export const returnUserLeisureRegistration = (req, res) => {
    const id = req.params.id;
    getUserLeisureRegistration(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Naudotojas neturi laukiančios patvirtinimo laisvalaikio kambario registracijos")
            }
      }
    });
  };
//resident updates his leisure room registration status to canceled or finished
  export const updateUserLeisureRegistration = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    let updateData = {
        status: data.status,
    }
    updateUserLeisureRegistrationStatus(updateData,id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Regisracijos statusas atnaujintas sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko atnaujinti naudotojo laisvalaikio kambario registracijos statuso")
           }
      }
    });
  };
//return leisure room registration history for the admin
  export const getLeisureRegAdmin = (req, res) => {
    getLeisureRegForAdmin((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("nepavyko gauti gyventojų laisvalaikio kambario registracijų")
            }
      }
    });
  };
//return resident's guest leisure room registration history
  export const getLeisurRegResident = (req, res) => {
    const id = req.params.id;
    getLeisurRegForResident(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("nepavyko gauti gyventojų laisvalaikio kambario registracijų")
            }
      }
    });
  };





