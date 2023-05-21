//import connection
import db from "../config/database.js";

//create a new user's account
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
//check if a user with the given username exists
export const getLoginUser = (loginData,result) => {
  db.query("SELECT * FROM user where username = BINARY ?",[loginData.username], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//retuens user's id ant role by the given name
export const getUserByName = (userName,result) => {
  db.query("SELECT user_id, role FROM user where username = ? and role = 'Gyventojas'", [userName.name], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
 //returns user's information
export const getUserInfo = (id,result) => {
  db.query("SELECT username,role,blocked,email,firstname,lastname,gender,fk_room,occupation FROM user where user_id = ?", [id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//returns all workers contact information
export const getAllContactInformation = (result) => {
  db.query("SELECT username,role,blocked,email,firstname,lastname,gender,fk_room,occupation FROM user where role = 'Administratorius' union all SELECT username,role,blocked,email,firstname,lastname,gender,fk_room,occupation FROM user where role = 'Budėtojas'", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//block a residents account
export const blockUserById = (id,result) => {
  db.query("UPDATE user set blocked = 1 where user_id = ?",[id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//update user's email and blocked status
export const updateUserInfoById = (updateData,id,result) => {
  db.query("UPDATE user set email = ?, blocked = ? where user_id = ?",[updateData.email,updateData.blocked,id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//sets the occupation of the worker
export const updateOccupationById = (updateData,id,result) => {
  db.query("UPDATE user set occupation = ? where user_id = ?",[updateData.occupation,id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//update the password of a user with the given id
export const updateUserPasswordById = (updateData,id,result) => {
  db.query("UPDATE user set passsword = ? where user_id = ?",[updateData.password,id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};


//return the occupation of the user with the given id
export const getUserOccupation = (id,result) => {
  db.query("SELECT occupation from user where user_id = ?",[id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//return the admin's occupation
export const getAdminOccupation = (result) => {
  db.query("SELECT occupation from user where role = 'Administratorius' and (occupation = 'Laisvas' or occupation = 'Užimtas')", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//return the doorkeeper's occupation
export const getDoorkeeperOccupation = (result) => {
  db.query("SELECT occupation, user_id from user where role = 'Budėtojas' and (occupation = 'Laisvas' or occupation = 'Užimtas')", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//check if an account with the given username exists
export const checkIfUserExistsByName = (username,result) => {
  db.query("SELECT user_id from user where username = ?",[username], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
//return the name and surname of all the residents in the system
export const getAllResidentsInformation = (result) => {
  db.query("SELECT user_id,firstname,lastname,username FROM user where role = 'Gyventojas' ORDER BY firstname, lastname", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });

};
//return user's password
export const getUserPasswordById = (id,result) => {
  db.query("SELECT passsword FROM user where user_id = ?",[id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};




