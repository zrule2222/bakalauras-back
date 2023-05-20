import db from "../config/database.js";
//return rooms that are available to register a resident in
export const getRoomsForRegistration = (room_gender,result) => {
    db.query("SELECT number,room_id FROM rooms where room_status = 'Available' and  room_gender = ?",[room_gender], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//update the amout of free spaces left in the room
  export const UpdateRoomSpaceById = (id,result) => {
    db.query("update rooms set free_space = if(free_space-1 > 0, free_space-1,0) where room_id = ?",[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//update room status if the room has no more free space
  export const UpdateRoomStatusIfFull = (result) => {
    db.query("update rooms set room_status = 'Unavailable' where free_space = 0", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
 //returns user's room number
  export const getUserRoom = (id,fk_room,result) => {
    db.query("SELECT number from user,rooms where ? = rooms.room_id AND user.user_id = ?",[fk_room,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };