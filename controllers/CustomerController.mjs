import { customerCollection } from "../models/customer.mjs";
import { ApiResponse } from "../service/ApiResponse.mjs";
import { Apierror } from "../service/Apierror.mjs";
import { asyncHandler } from "../service/AsyncHandler.mjs";

/**
 * code for adding the customer data
 */
export const addCustomerData = asyncHandler(async function(request, response) {
    const {id, first_name, last_name, city, company} = request.body;

    if (!id || !first_name || !last_name || !city || !company) {
        throw new Apierror(404, `Required field 'first_name', 'last_name', 'city', 'company' is missing!`)
    }

    await customerCollection.create({
        _id : id,
        first_name,
        last_name,
        city,
        company
    })

    response.json(new ApiResponse([], 'User created successfully!'))
});

/**
 * code for getting the whole customer data
 */
export const getCustomerData = asyncHandler(async function(request, response) {
    let {limit, page} = request.query;
    let paramData = request.query;
    let skip = (page - 1) * limit;
    let filterParameters = ['first_name', 'last_name', 'city'];
    let query = {};

    filterParameters.forEach(param => {
        if (paramData[param]) {
          query[param] = paramData[param];
        }
      }
    );
    let data = await customerCollection.find(query).skip(skip).limit(limit);
    response.json(new ApiResponse(data, 'Data fetched successfully!'));
})

/**
 * code for getting the customer data by id
 */
export const getCustomerDataById = asyncHandler(async function(request, response) {
    let { id } = request.query;
    if (!id) {
        throw new Apierror(404, `Required field 'id' is missing!`)
    }
    let data = await customerCollection.findOne({_id : id});
    response.json(new ApiResponse(data, 'Data fetched successfully'))
})

/**
 * code to listAllUniqueCityWithCustomerNumber
 */
export const listAllUniqueCityWithCustomerNumber = asyncHandler(async function(_, response){
    const cityCounts = await customerCollection.aggregate([
        { $group: { _id: '$city', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ]);
    response.json(new ApiResponse(cityCounts, 'Data fetched successfully'))
})