
import{
    getAllServices
} from "../models/ServiceModel.js";
//return all the information about all the services
export const returnAllServices = (req, res) => {
    getAllServices((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };