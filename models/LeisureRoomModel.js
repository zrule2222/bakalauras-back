import db from "../config/database.js";

export const registerBeingInRoom = (registrationData, result) => {
    db.query("insert into leisure_room_registrations set fk_user = ?, leisure_status = 'Laukiama patvirtinimo', created_at = ?"
    , [registrationData, new Date()], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getLeisureRegistrations = (result) => {
    db.query("select firstname, lastname, leisure_id, leisure_status, leisure_room_registrations.created_at from leisure_room_registrations join user ON user.user_id = leisure_room_registrations.fk_user where leisure_room_registrations.leisure_status = 'Laukiama patvirtinimo'"
    , (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateLeisureRegistrationStatusById = (updateData, id, result) => {
    db.query("update leisure_room_registrations set leisure_status = ?, updated_at = ?, fk_action_user = ? where leisure_id = ?"
    , [updateData.status, new Date(),updateData.doorKeeper_id,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getLeisureRoomData = (result) => {
    db.query("select firstname, lastname from leisure_room_registrations join user ON user.user_id = leisure_room_registrations.fk_user where leisure_status = 'Patvirtinta'"
    , (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getUserLeisureRegistration = (id,result) => {
    db.query("select* from leisure_room_registrations where fk_user= ? and leisure_status = 'Laukiama patvirtinimo'"
    ,[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateUserLeisureRegistrationStatus = (updateData, id, result) => {
    db.query("update leisure_room_registrations set leisure_status = ?, updated_at = ? where leisure_id = ?"
    , [updateData.status, new Date(),id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

