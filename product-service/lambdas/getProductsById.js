const Responses = require('./APIResponses');
const products = require('./productsMockData');


const getProductsById = async(id) => {
  return products.find((product) => product.id === id);
}

module.exports.handler = async(event) => {
  if(event.pathParameters.id) {
    try {
      const result = await getProductsById(event.pathParameters.id);
      return Responses._200(result);
    } catch (error) {
      return Responses._400({message: "Products not found!"});
    }
  }
  
  return Responses._400({message: 'Missing the id from the path'});
};