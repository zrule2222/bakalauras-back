import db from "../config/database.js";

export const getAllServices = (result) => {
    db.query("SELECT * FROM service", (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };