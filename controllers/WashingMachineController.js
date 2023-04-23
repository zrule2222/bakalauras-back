import{
    getAllMachineData,
    registerWashing,
    updateMachineStatusById,
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
        
        res.json("Laisvalaikio kambario registracija sėkminga");
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