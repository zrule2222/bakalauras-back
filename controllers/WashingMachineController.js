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
    fixWashingMachineById,
    getMachineFailRegForResident,
    getMachineFailRegForAdmin,
    getWashingtRegForAdmin,
    getWashingRegForResident,
} from "../models/WashingMachineModel.js";
//returns information about all washing machines
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
              res.json("Nepavyko gauti skalbimo mašinų informacijos")
            }
      }
    });
  };
//registers a new washing for a spesific washing machine
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
//update washing machine with the washing registration data
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
             res.json("Nepavyko atnaujinti skalbimo mašinos statuso")
           }
      }
    });
  };
//update washing machine status when the washing registration is finished
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
             res.json("Nepavyko atnaujinti skalbimo mašinos statuso")
           }
      }
    });
  };
//set the washing registrations status to 'Užbaigta'
  export const endWashingRegistration = (req, res) => {
    const id = req.params.id;
    endWashingRegistrationById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Skalbimo Registracija užbaigta sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko užbaigti skalbimo registracijos")
           }
      }
    });
  };
// register a washing machine failure
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
//sets the washing machine's first failure registration
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
//sets the washing machine's second failure registration
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
//sets the washing machine's third failure registration
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
//get users that currectly have an active washing machine failure registration
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
              res.json("Nepavyko gauti naudotojų, kurie šiuo metu yra pateikę gedimą")
            }
      }
    });
  };
//repair a broken washing mashine
  export const fixWashingMachine = (req, res) => {
    const id = req.params.id;
    fixWashingMachineById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.changedRows > 0){
            res.json("Skalbimo mašina sutvarkyta sėkmingai")
           }
           else{
             res.status(500)
             res.json("Skalbimo mašinos sutvarkyti nepavyko")
           }
      }
    });
  };
//return resident's washing machine failure registration history
  export const getMachineFailRegResident = (req, res) => {
    const id = req.params.id;
    getMachineFailRegForResident(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nepavyko gauti gyventojo skalbimo mašinų registracijų")
            }
      }
    });
  };
//return washing machine failure registration history for the admin
  export const getMachineFailRegAdmin = (req, res) => {
    getMachineFailRegForAdmin((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nepavyko gauti gyventojo skalbimo mašinų registracijų")
            }
      }
    });
  };
  //return washing registration history for the admin
  export const getWashingtRegAdmin = (req, res) => {
    getWashingtRegForAdmin((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nepavyko gauti gyventojo skalbimo registracijų")
            }
      }
    });
  };
//return resident's guest washing registration history
  export const getWashingRegResident = (req, res) => {
    const id = req.params.id;
    getWashingRegForResident(id,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nepavyko gauti gyventojo skalbimo registracijų")
            }
      }
    });
  };


  




 



