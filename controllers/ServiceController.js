
import{
    getAllServices
} from "../models/ServiceModel.js";

export const returnAllServices = (req, res) => {
    getAllServices((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };