import{
    getRoomsForRegistration,
    UpdateRoomSpaceById,
    UpdateRoomStatusIfFull,
    getUserRoom,
} from "../models/RoomsModel.js";
//return rooms that are available to register a resident in
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
              res.json("Nėra laisvų kambarių")
            }
      }
    });
  };
//update the amout of free spaces left in the room
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
//update room status if the room has no more free space
  export const UpdateRoomStatus = (req, res) => {
    UpdateRoomStatusIfFull((err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.affectedRows > 0){
            res.json("Kambarių statusai pakeisti sėkmingai")
           }
           else{
             res.json("Nebuvo kambarių, kurių statusą reikėtų atnaujinti")
           }
      }
    });
  };
 //returns user's room number
  export const returnUserRoom = (req, res) => {
    const id = req.params.id
    const fk_room = req.body;
    getUserRoom(id,fk_room.room,(err, results) => {
      if (err) {
        res.send(err);
      } else {
        if(results.length > 0){
          res.json(results[0])
          }
          else{
            res.status(500)
            res.json("Naudotojo kambarys nerastas")
          }
      }
    });
  };



  