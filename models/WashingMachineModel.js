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
        registrationData.status,new Date(),registrationData.machine,registrationData.time ], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateMachineStatusById = (updatenData,id,result) => {
    db.query("update washing_machine set machine_status = ?, time = ?, fk_user = ?,fk_wasking_registration = ? where machine_id = ?",[updatenData.status,new Date(updatenData.time),updatenData.user,updatenData.registration,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateMachineWhenWashingFinished = (id,result) => {
    db.query("update washing_machine set machine_status = 'Working', time = null, fk_user = null,fk_wasking_registration = null where machine_id = ?",[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const endWashingRegistrationById = (id,result) => {
    db.query("update washing_machine_registrations set machine_reg_status = 'Užbaikta', updated_at = ADDTIME(`created_at`,`washing_time`) where machine_reg_id = ?",[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };




