import db from "../config/database.js";

export const getAllMachineData = (result) => {
    db.query("SELECT * FROM washing_machine", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const registerWashing = (registrationData,result) => {
    db.query("insert into washing_machine_registrations set fk_user = ?, machine_reg_status = ?, created_at = ?, fk_machine = ?, washing_time = ?",[registrationData.user,
        registrationData.status,registrationData.created_at,registrationData.machine,registrationData.time ], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateMachineStatusById = (updatenData,id,result) => {
    db.query("update washing_machine set machine_status = ?, time = ?, fk_user = ? where machine_id = ?",[updatenData.status,updatenData.time,updatenData.user,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };




