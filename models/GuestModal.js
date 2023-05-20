import db from "../config/database.js";
  //registers a guest for a stay at the dormitary
export const registerUserGuest = (registrationData, result) => {
    db.query("insert into guest_registrations set fk_user = ?, guest_firstname = ?, guest_lastname = ?, guest_arrival = ?, status = 'Laukiama patvirtinimo', waiting_confiration_at = ?"
    , [registrationData.user_id,registrationData.firstname,registrationData.lastname, registrationData.arrival, new Date()], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//return all user guest registrations that are waiting confirmation
  export const getUserRegistrations = (id, result) => {
    db.query("select  * FROM guest_registrations where fk_user = ? and status = 'Laukiama patvirtinimo' ", [id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//resident cancels his guest registration
  export const cancelGuestRegistrationById = (id, result) => {
    db.query("UPDATE guest_registrations SET status = 'Atšaukta', cancelled_at = ?  where guest_id = ?", [new Date(),id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//get guest registrations that are waiting confirmation
  export const getActiveRegistrations = (result) => {
    db.query("select  * FROM guest_registrations where status = 'Laukiama patvirtinimo' ", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//update guest registrations status
  export const updateGuestRegistrationStatusById = (updateData, result) => {
    db.query("UPDATE guest_registrations SET status = ?,  confirmed_at = if(status = 'Patvirtinta',?,confirmed_at), rejected_at = if(status = 'Atmesta',?,rejected_at), finished_at = if(status = 'Užbaigta',?,finished_at), fk_action_user_confirmed = if(status = 'Patvirtinta',?,fk_action_user_confirmed),fk_action_user_rejected = if(status = 'Atmesta',?,fk_action_user_rejected), fk_action_user_finished = if(status = 'Užbaigta',?,fk_action_user_finished) where guest_id = ?", [updateData.status, new Date(),new Date(),new Date(),
      updateData.doorKeeper_id,updateData.doorKeeper_id, updateData.doorKeeper_id,updateData.id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//get guest registrations that are already confirmed
  export const getConfirmedRegistrations = (result) => {
    db.query("select  * FROM guest_registrations where status = 'Patvirtinta' ", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//return guest registration history for the admin
  export const getGuestRegForAdmin = (result) => {
    db.query("SELECT firstname,lastname,guest_firstname,guest_lastname, guest_arrival, 'Laukiama patvirtinimo' as statusas, waiting_confiration_at as happened_at, firstname as action_firstname, lastname as action_lastname  FROM guest_registrations join user on user.user_id = guest_registrations.fk_user WHERE waiting_confiration_at IS NOT null union all SELECT firstname,lastname,guest_firstname,guest_lastname, guest_arrival, 'Atšaukta', cancelled_at,firstname,lastname FROM guest_registrations join user on user.user_id = guest_registrations.fk_user WHERE cancelled_at IS NOT null UNION ALL SELECT user.firstname,user.lastname,guest_firstname,guest_lastname, guest_arrival, 'Atmesta',rejected_at, usr.firstname, usr.lastname FROM guest_registrations join user on user.user_id = guest_registrations.fk_user join user usr on usr.user_id = guest_registrations.fk_action_user_rejected  WHERE rejected_at IS NOT null UNION ALL SELECT user.firstname,user.lastname,guest_firstname,guest_lastname, guest_arrival, 'Patvirtinta',confirmed_at, usr.firstname, usr.lastname FROM guest_registrations join user on user.user_id = guest_registrations.fk_user join user usr on usr.user_id = guest_registrations.fk_action_user_confirmed  WHERE confirmed_at IS NOT null UNION ALL SELECT user.firstname,user.lastname,guest_firstname,guest_lastname, guest_arrival, 'Užbaigta',finished_at, usr.firstname, usr.lastname FROM guest_registrations join user on user.user_id = guest_registrations.fk_user join user usr on usr.user_id = guest_registrations.fk_action_user_finished  WHERE finished_at IS NOT null order by happened_at desc", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
//return resident's guest registration history
  export const getGuestRegForResident = (id,result) => {
    db.query("SELECT firstname,lastname,guest_firstname,guest_lastname, guest_arrival, 'Laukiama patvirtinimo' as statusas, waiting_confiration_at as happened_at, firstname as action_firstname, lastname as action_lastname  FROM guest_registrations join user on user.user_id = guest_registrations.fk_user WHERE waiting_confiration_at IS NOT null and fk_user = ? union all SELECT firstname,lastname,guest_firstname,guest_lastname, guest_arrival, 'Atšaukta', cancelled_at,firstname,lastname FROM guest_registrations join user on user.user_id = guest_registrations.fk_user WHERE cancelled_at IS NOT null and fk_user = ? UNION ALL SELECT user.firstname,user.lastname,guest_firstname,guest_lastname, guest_arrival, 'Atmesta',rejected_at, usr.firstname, usr.lastname FROM guest_registrations join user on user.user_id = guest_registrations.fk_user join user usr on usr.user_id = guest_registrations.fk_action_user_rejected  WHERE rejected_at IS NOT null and fk_user = ? UNION ALL SELECT user.firstname,user.lastname,guest_firstname,guest_lastname, guest_arrival, 'Patvirtinta',confirmed_at, usr.firstname, usr.lastname FROM guest_registrations join user on user.user_id = guest_registrations.fk_user join user usr on usr.user_id = guest_registrations.fk_action_user_confirmed  WHERE confirmed_at IS NOT null and fk_user = ? UNION ALL SELECT user.firstname,user.lastname,guest_firstname,guest_lastname, guest_arrival, 'Užbaigta',finished_at, usr.firstname, usr.lastname FROM guest_registrations join user on user.user_id = guest_registrations.fk_user join user usr on usr.user_id = guest_registrations.fk_action_user_finished  WHERE finished_at IS NOT null and fk_user = ? order by happened_at desc",
    [id,id,id,id,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
