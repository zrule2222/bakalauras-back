import db from "../config/database.js";

export const registerBeingInRoom = (registrationData, result) => {
    db.query("insert into leisure_room_registrations set fk_user = ?, leisure_status = 'Laukiama patvirtinimo', waiting_confirmation_at = ?"
    , [registrationData, new Date()], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getLeisureRegistrations = (result) => {
    db.query("select firstname, lastname, leisure_id, leisure_status, leisure_room_registrations.waiting_confirmation_at from leisure_room_registrations join user ON user.user_id = leisure_room_registrations.fk_user where leisure_room_registrations.leisure_status = 'Laukiama patvirtinimo'"
    , (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateLeisureRegistrationStatusById = (updateData, id, result) => {
    db.query("update leisure_room_registrations set leisure_status = ?, confirmed_at = if(leisure_status = 'Patvirtinta',?,confirmed_at), rejected_at = if(leisure_status = 'Atmesta',?,rejected_at),  fk_action_user_rejected = if(leisure_status = 'Atmesta',?,fk_action_user_rejected), fk_action_user_confirmed = if(leisure_status = 'Patvirtinta',?,fk_action_user_confirmed)  where leisure_id = ?"
    , [updateData.status, new Date(),new Date(),updateData.doorKeeper_id,updateData.doorKeeper_id,id], (err, results) => {
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
    db.query("select * from leisure_room_registrations where fk_user= ? and (leisure_status = 'Laukiama patvirtinimo' or leisure_status = 'Patvirtinta') "
    ,[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateUserLeisureRegistrationStatus = (updateData, id, result) => {
    db.query("update leisure_room_registrations set leisure_status = ?, cancelled_at = if(leisure_status = 'Atšaukta',?,cancelled_at),finished_at = if(leisure_status = 'Užbaigta',?,finished_at) where leisure_id = ?"
    , [updateData.status, new Date(),new Date(),id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getLeisureRegForAdmin = (result) => {
    db.query("SELECT firstname,lastname, 'Laukiama patvirtinimo' as statusas, waiting_confirmation_at as happened_at, firstname as action_firstname, lastname as action_lastname  FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user WHERE waiting_confirmation_at IS NOT null union all SELECT firstname,lastname, 'Atšaukta', cancelled_at,firstname,lastname FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user WHERE cancelled_at IS NOT null UNION ALL SELECT user.firstname,user.lastname, 'Atmesta',rejected_at, usr.firstname, usr.lastname FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user join user usr on usr.user_id = leisure_room_registrations.fk_action_user_rejected  WHERE rejected_at IS NOT null UNION ALL SELECT user.firstname,user.lastname, 'Patvirtinta',confirmed_at, usr.firstname, usr.lastname FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user join user usr on usr.user_id = leisure_room_registrations.fk_action_user_confirmed  WHERE confirmed_at IS NOT null UNION ALL SELECT firstname,lastname, 'Užbaigta',finished_at,firstname, lastname FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user WHERE finished_at IS NOT null order by happened_at desc", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getLeisurRegForResident = (id,result) => {
    db.query("SELECT firstname,lastname, 'Laukiama patvirtinimo' as statusas, waiting_confirmation_at as happened_at, firstname as action_firstname, lastname as action_lastname  FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user WHERE waiting_confirmation_at IS NOT null and fk_user = ? union all SELECT firstname,lastname, 'Atšaukta', cancelled_at,firstname,lastname FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user WHERE cancelled_at IS NOT null and fk_user = ? UNION ALL SELECT user.firstname,user.lastname, 'Atmesta',rejected_at, usr.firstname, usr.lastname FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user join user usr on usr.user_id = leisure_room_registrations.fk_action_user_rejected  WHERE rejected_at IS NOT null and fk_user = ? UNION ALL SELECT user.firstname,user.lastname, 'Patvirtinta',confirmed_at, usr.firstname, usr.lastname FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user join user usr on usr.user_id = leisure_room_registrations.fk_action_user_confirmed  WHERE confirmed_at IS NOT null and fk_user = ? UNION ALL SELECT firstname,lastname, 'Užbaigta',finished_at,firstname, lastname FROM leisure_room_registrations join user on user.user_id = leisure_room_registrations.fk_user WHERE finished_at IS NOT null and fk_user = ? order by happened_at desc;",
    [id,id,id,id,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

