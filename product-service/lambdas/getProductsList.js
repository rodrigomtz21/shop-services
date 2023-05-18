const Responses = require('./APIResponses');
const products = require('./productsMockData');

const getProductsList = async() => {
  // For now it is just returning a list of mock data
  return products;
}

module.exports.handler = async(event) => {
  let response;
  try {
    const result = await getProductsList();
    response = Responses._200(result);
  } catch (error) {
    response = Responses._400({message: "Products not found!"});
  }
  return response;
};