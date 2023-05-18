const Responses = require("./APIResponses");
const AWS = require("aws-sdk");
const _ = require("lodash");

const dynamo = new AWS.DynamoDB.DocumentClient();

const getProductsById = async (id) => {
  const product = await dynamo
    .query({
      TableName: process.env.PRODUCTS_TABLE,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": id },
    })
    .promise();
  return product.Items;
};

const getProductStockById = async (productId) => {
  const stock = await dynamo
    .query({
      TableName: process.env.STOCKS_TABLE,
      KeyConditionExpression: "product_id = :productId",
      ExpressionAttributeValues: { ":productId": productId },
    })
    .promise();

  return stock.Items;
};

const getProductWithStock = async (id) => {
  let productWithStock = {};
  let products = await getProductsById(id);

  if (!_.isEmpty(products)) {
    let product = products[0];
    let productStocks = await getProductStockById(product.id);
    if (_.isEmpty(productStocks)) {
      productWithStock = { ...product, count: 0 };
    } else {
      productWithStock = { ...product, count: productStocks[0].count };
    }
  }

  return productWithStock;
};

module.exports.handler = async (event) => {
  console.log("Request", event);
  let response;
  if (_.isEmpty(event.pathParameters.id)) {
    return Responses._400({
      message: "Missing the id from the path",
      id: event.pathParameters.id,
    });
  }

  try {
    const result = await getProductWithStock(event.pathParameters.id);

    if (_.isEmpty(result)) {
      response = Responses._400({
        message: "Products not found!",
        result: result,
      });
    } else {
      response = Responses._200(result);
    }
  } catch (error) {
    console.log("error:", error);
    response = Responses._500({
      message: "Something was wrong!",
      error: error,
    });
  }

  return response;
};