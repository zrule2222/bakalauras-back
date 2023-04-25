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
    db.query("update washing_machine set failure_count = 0, failure_registration_1 = null, failure_registration_2 = null, failure_registration_3 = null,  machine_status = ?, time = ?, fk_user = ?,fk_wasking_registration = ? where machine_id = ?",[updatenData.status,new Date(updatenData.time),updatenData.user,updatenData.registration,id], (err, results) => {
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

  export const registerWashingFailure = (registrationData,result) => {
    db.query("insert into washing_machine_failure_registrations set fk_user = ?, created_at = ?, fk_machine = ?",[registrationData.user,new Date(),registrationData.machineId], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateMachineFailFirst = (registrationId,id,result) => {
    db.query("update washing_machine set failure_count=  if(isnull(failure_registration_1) = 1,failure_count + 1,failure_count), failure_registration_1 = if(isnull(failure_registration_1) = 1,?,failure_registration_1) where machine_id = ?",[registrationId,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateMachineFailSecond = (registrationId,id,result) => {
    db.query("update washing_machine set failure_count= if(isnull(failure_registration_1) = 0 and isnull(failure_registration_2) = 1,failure_count + 1,failure_count), failure_registration_2  = if(isnull(failure_registration_1) = 0 and isnull(failure_registration_2) = 1,?,failure_registration_2) where machine_id = ?",[registrationId,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const updateMachineFailThird = (registrationId,id,result) => {
    db.query("update washing_machine set failure_count= if(isnull(failure_registration_1) = 0 and isnull(failure_registration_2) = 0, failure_count + 1,failure_count), machine_status = if(isnull(failure_registration_1) = 0 and isnull(failure_registration_2) = 0, 'Broken',machine_status), failure_registration_3   = if(isnull(failure_registration_1) = 0 and isnull(failure_registration_2) = 0, ?,failure_registration_3)  where machine_id = ?",[registrationId,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getUsersByCurrentFailReg = (id,result) => {
    db.query("SELECT washing_machine_failure_registrations.fk_user FROM washing_machine JOIN washing_machine_failure_registrations ON washing_machine.failure_registration_1 = washing_machine_failure_registrations.machine_failure_id or washing_machine.failure_registration_2 = washing_machine_failure_registrations.machine_failure_id where washing_machine.machine_id = ?;",[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };






