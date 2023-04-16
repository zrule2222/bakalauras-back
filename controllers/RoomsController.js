import{
    getRoomsForRegistration,
    UpdateRoomSpaceById,
    UpdateRoomStatusIfFull,
} from "../models/RoomsModel.js";

export const returnRoomsForRegistration = (req, res) => {
    const data = req.body;
  let  room_gender = data.room_gender
   
    getRoomsForRegistration(room_gender,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
            res.json(results)
            }
            else{
              res.status(500)
              res.json("Nėra laisvų kambariu")
            }
      }
    });
  };

  export const UpdateRoomSpace = (req, res) => {
    const id = req.params.id;
    UpdateRoomSpaceById(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Kambario laisvos vietos skaičius pakeistas sėkmingai")
           }
           else{
             res.status(500)
             res.json("Nepavyko atnaujinti kambario laisvos vietos skaičiaus")
           }
      }
    });
  };

  export const UpdateRoomStatus = (req, res) => {
    UpdateRoomStatusIfFull((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Kambarių statusai pakeistas sėkmingai")
           }
           else{
             res.json("Nebuvo kambarių, kurių statusą reiktu atnaujinti")
           }
      }
    });
  };



  