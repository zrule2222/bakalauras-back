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
    db.query("insert into washing_machine_registrations set fk_user = ?, machine_reg_status = ?, started_at = ?, fk_machine = ?, washing_time = ?",[registrationData.user,
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
    db.query("update washing_machine_registrations set machine_reg_status = 'Užbaikta', ended_at = ADDTIME(`started_at`,`washing_time`) where machine_reg_id = ?",[id], (err, results) => {
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

  export const fixWashingMachineById = (id,result) => {
    db.query("update washing_machine set machine_status = 'Working', failure_count = 0, failure_registration_1 = null, failure_registration_2 = null, failure_registration_3 = null where machine_id = ?",[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getMachineFailRegForResident = (id,result) => {
    db.query("SELECT created_at,machine_number FROM washing_machine_failure_registrations join washing_machine on machine_id = fk_machine where washing_machine_failure_registrations.fk_user = ? order by created_at desc",[id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getMachineFailRegForAdmin = (result) => {
    db.query("SELECT firstname,lastname,created_at,machine_number FROM washing_machine_failure_registrations join user on user_id = fk_user join washing_machine on machine_id = fk_machine order by created_at desc", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getWashingtRegForAdmin = (result) => {
    db.query("SELECT firstname,lastname, 'Aktyvus' as statusas,machine_number, started_at,washing_time,null as ended_at FROM washing_machine_registrations join user on user.user_id = washing_machine_registrations.fk_user JOIN washing_machine on washing_machine.machine_id =washing_machine_registrations.fk_machine WHERE started_at IS NOT null UNION ALL SELECT firstname,lastname, 'Užbaikta' as statusas,machine_number, started_at,washing_time,ended_at FROM washing_machine_registrations join user on user.user_id = washing_machine_registrations.fk_user JOIN washing_machine on washing_machine.machine_id =washing_machine_registrations.fk_machine WHERE ended_at IS NOT null ORDER BY started_at desc", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };

  export const getWashingRegForResident = (id,result) => {
    db.query("SELECT firstname,lastname, 'Aktyvus' as statusas,machine_number, started_at,washing_time,null as ended_at FROM washing_machine_registrations join user on user.user_id = washing_machine_registrations.fk_user JOIN washing_machine on washing_machine.machine_id =washing_machine_registrations.fk_machine WHERE started_at IS NOT null and washing_machine_registrations.fk_user = ? UNION ALL SELECT firstname,lastname, 'Užbaikta' as statusas,machine_number, started_at,washing_time,ended_at FROM washing_machine_registrations join user on user.user_id = washing_machine_registrations.fk_user JOIN washing_machine on washing_machine.machine_id =washing_machine_registrations.fk_machine WHERE ended_at IS NOT null and washing_machine_registrations.fk_user = ? ORDER BY started_at desc;",
    [id,id], (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };






