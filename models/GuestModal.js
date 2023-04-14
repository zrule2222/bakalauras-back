import db from "../config/database.js";

export const registerUserGuest = (registrationData, result) => {
    db.query("insert into guest_registrations set fk_user = ?, guest_firstname = ?, guest_lastname = ?, guest_arrival = ?, status = 'Laukiama patvirtinimo', created_at = ?"
    , [registrationData.user_id,registrationData.firstname,registrationData.lastname, registrationData.arrival, new Date()], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getUserRegistrations = (id, result) => {
    db.query("select  * FROM guest_registrations where fk_user = ? and status = 'Laukiama patvirtinimo' ", [id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const cancelGuestRegistrationById = (id, result) => {
    db.query("UPDATE guest_registrations SET status = 'Atšaukta', updated_at = ?  where guest_id = ?", [new Date(),id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getActiveRegistrations = (result) => {
    db.query("select  * FROM guest_registrations where status = 'Laukiama patvirtinimo' ", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateGuestRegistrationStatusById = (updateData, result) => {
    db.query("UPDATE guest_registrations SET status = ?,  updated_at = ?, fk_action_user = ? where guest_id = ?", [updateData.status, new Date(),updateData.doorKeeper_id,updateData.id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getConfirmedRegistrations = (result) => {
    db.query("select  * FROM guest_registrations where status = 'Patvirtinta' ", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
