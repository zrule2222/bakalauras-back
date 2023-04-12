//import connection
import db from "../config/database.js";

//get all products
export const getAllUsers = (result) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const registerUser = (registrationData, result) => {
  db.query("insert into user set username = ?, passsword = PASSWORD(?), role = ?, blocked = ?, email = ?, firstname = ?, lastname = ?, gender = ?, fk_room = ?, occupation = ? ;"
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
  db.query("SELECT * FROM user where username = ? and passsword = PASSWORD(?)",[loginData.username,loginData.password], (err, results) => {
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

export const getUserRoom = (id,fk_room,result) => {
  db.query("SELECT number from user,rooms where ? = rooms.room_id AND user.user_id = ?",[fk_room,id], (err, results) => {
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
  db.query("UPDATE user set email = ?, passsword = COALESCE(IF(PASSWORD(?) = '', NULL, PASSWORD(?)),passsword), blocked = ? where user_id = ?",[updateData.email,updateData.password,updateData.password,updateData.blocked,id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// //get single product
// export const getProductById = (id, result) => {
//   db.query(
//     "SELECT * FROM PRODUCT WHERE product_id = ?",
//     [id],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results[0]);
//       }
//     }
//   );
// };

// //insert product to databased
// export const insertProduct = (data, result) => {
//   db.query("INSERT INTO product SET ?", [data], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results);
//     }
//   });
// };

// // Update Product to Database
// export const updateProductById = (data, id, result) => {
//   db.query(
//     "UPDATE product SET product_name = ?, product_price = ? WHERE product_id = ?",
//     [data.product_name, data.product_price, id],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };

// // Delete Product to Database
// export const deleteProductById = (id, result) => {
//   db.query("DELETE FROM product WHERE product_id = ?", [id], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results);
//     }
//   });
// };

// //nuo cia mano testai
// export const deleteProductBySuma = (suma, result) => {
//   db.query("DELETE FROM product WHERE product_price > ?", [suma], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       console.log('viskas chill')
//       result(null, results);
//     }
//   });
// };

// export const testas = (id1, id2, result) => {
//   db.query("SELECT * FROM product inner JOIN testas on ? = ?;", [id1,id2], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       console.log(results.data)
//       result(null, results);
//     }
//   });
// };

// export const testas2 = (data, result) => {
//   db.query("insert into product set product_name = ?, product_price = ?;", [data.id,data.id2], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       console.log(results.data)
//       result(null, results);
//     }
//   });
// };