import { Router } from "express";
import { addCustomerData, getCustomerData, getCustomerDataById, listAllUniqueCityWithCustomerNumber } from "../controllers/CustomerController.mjs";

export const customerRoute = Router();

customerRoute.route('/addCustomer').post(addCustomerData);
customerRoute.route('/getCustomer').get(getCustomerData);
customerRoute.route('/getCustomerById').get(getCustomerDataById);
customerRoute.route('/getUniqueCity').get(listAllUniqueCityWithCustomerNumber);