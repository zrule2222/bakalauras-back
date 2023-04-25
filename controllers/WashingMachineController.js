import{
    getAllMachineData,
    registerWashing,
    updateMachineStatusById,
    updateMachineWhenWashingFinished,
    endWashingRegistrationById,
    registerWashingFailure,
    updateMachineFailFirst,
    updateMachineFailSecond,
    updateMachineFailThird,
    getUsersByCurrentFailReg,
} from "../models/WashingMachineModel.js";

export const getMachineData = (req, res) => {
    getAllMachineData((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("nepavyko gauti skalbimo mašinų informacijos")
            }
      }
    });
  };

  export const registerNewWashing = (req, res) => {
    const registrationData = req.body;
    registerWashing(registrationData, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        
        res.json(results);
      }
    });
  };

  export const updateMachineStatus = (req, res) => {
    const updateData = req.body;
    const id = req.params.id;
    updateMachineStatusById(updateData,id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Skalbimo mašinos statusas atnaujintas sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko atnaujinti Skalbimo mašinos statuso")
           }
      }
    });
  };

  export const updateMachineWhenFinished = (req, res) => {
    const id = req.params.id;
    updateMachineWhenWashingFinished(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Skalbimo mašinos statusas atnaujintas sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko atnaujinti Skalbimo mašinos statuso")
           }
      }
    });
  };

  export const endWashingRegistration = (req, res) => {
    const id = req.params.id;
    endWashingRegistrationById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Skalbimo Registracija užbaikta sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko užbaikti skalbimo registracijos")
           }
      }
    });
  };

  export const registerNewWashingFailure = (req, res) => {
    const registrationData = req.body;
    registerWashingFailure(registrationData, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        
        res.json(results);
      }
    });
  };

  export const updateMachineFailFirstReg = (req, res) => {
    const id = req.params.id;
    const registrationId = req.body.regId;
    updateMachineFailFirst(registrationId,id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.changedRows > 0){
            res.json(results)
           }
           else{
             res.status(500)
             res.json("Skalbimo mašinos gedimo užregistruoti nepavyko")
           }
      }
    });
  };

  export const updateMachineFailSecondtReg = (req, res) => {
    const id = req.params.id;
    const registrationId = req.body.regId;
    updateMachineFailSecond(registrationId,id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.changedRows > 0){
            res.json(results)
           }
           else{
             res.status(500)
             res.json("Skalbimo mašinos gedimo užregistruoti nepavyko")
           }
      }
    });
  };

  export const updateMachineFailThirdtReg = (req, res) => {
    const id = req.params.id;
    const registrationId = req.body.regId;
    updateMachineFailThird(registrationId,id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.changedRows > 0){
            res.json(results)
           }
           else{
             res.status(500)
             res.json("Skalbimo mašinos gedimo užregistruoti nepavyko")
           }
      }
    });
  };

  export const getUsersByFailReg = (req, res) => {
    const id = req.params.id;
    getUsersByCurrentFailReg(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("nepavyko gauti naudotojų šiuo metu pateikusių gedimą")
            }
      }
    });
  };

 



