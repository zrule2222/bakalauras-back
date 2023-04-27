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





