import db from "../config/database.js";

export const getRoomsForRegistration = (room_gender,result) => {
    db.query("SELECT number,room_id FROM rooms where room_status = 'Available' and  room_gender = ?",[room_gender], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const UpdateRoomSpaceById = (id,result) => {
    db.query("update rooms set free_space = if(free_space-1 > 0, free_space-1,0) where room_id = ?",[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const UpdateRoomStatusIfFull = (result) => {
    db.query("update rooms set room_status = 'Unavailable' where free_space = 0", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };