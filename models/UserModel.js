//import connection
import db from "../config/database.js";


export const registerUser = (registrationData, result) => {
  db.query("insert into user set username = ?, passsword = ?, role = ?, blocked = ?, email = ?, firstname = ?, lastname = ?, gender = ?, fk_room = ?, occupation = ? ;"
  , [registrationData.username,registrationData.password,registrationData.role, registrationData.blocked,
     registrationData.email,registrationData.firstname, registrationData.lastname, registrationData.gender, registrationData.room, registrationData.occupation], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getLoginUser = (loginData,result) => {
  db.query("SELECT * FROM user where username = ?",[loginData.username], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getUserByName = (userName,result) => {
  db.query("SELECT user_id, role FROM user where username = ? and role = 'Gyventojas'", [userName.name], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getUserInfo = (id,result) => {
  db.query("SELECT username,role,blocked,email,firstname,lastname,gender,fk_room,occupation FROM user where user_id = ?", [id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getAllContactInformation = (result) => {
  db.query("SELECT username,role,blocked,email,firstname,lastname,gender,fk_room,occupation FROM user where role = 'Administratorius' or role = 'Budėtojas' ", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const blockUserById = (id,result) => {
  db.query("UPDATE user set blocked = 1 where user_id = ?",[id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateUserInfoById = (updateData,id,result) => {
  db.query("UPDATE user set email = ?, blocked = ? where user_id = ?",[updateData.email,updateData.blocked,id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateOccupationById = (updateData,id,result) => {
  db.query("UPDATE user set occupation = ? where user_id = ?",[updateData.occupation,id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateUserPasswordById = (updateData,id,result) => {
  db.query("UPDATE user set passsword = ? where user_id = ?",[updateData.password,id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};



export const getUserOccupation = (id,result) => {
  db.query("SELECT occupation from user where user_id = ?",[id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getAdminOccupation = (result) => {
  db.query("SELECT occupation from user where role = 'Administratorius' and (occupation = 'Laisvas' or occupation = 'Užimtas')", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getDoorkeeperOccupation = (result) => {
  db.query("SELECT occupation, user_id from user where role = 'Budėtojas' and (occupation = 'Laisvas' or occupation = 'Užimtas')", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const checkIfUserExistsByName = (username,result) => {
  db.query("SELECT user_id from user where username = ?",[username], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getAllResidentsInformation = (result) => {
  db.query("SELECT user_id,firstname,lastname,username FROM user where role = 'Gyventojas'", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });

};

export const getUserPasswordById = (id,result) => {
  db.query("SELECT passsword FROM user where user_id = ?",[id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};




