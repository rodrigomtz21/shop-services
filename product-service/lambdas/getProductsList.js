const Responses = require("./APIResponses");
const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const getProductsList = async () => {
  const products = await dynamo
    .scan({
      TableName: process.env.PRODUCTS_TABLE,
    })
    .promise();

  return products.Items;
};

const getStocksList = async () => {
  const stocks = await dynamo
    .scan({
      TableName: process.env.STOCKS_TABLE,
    })
    .promise();

  return stocks.Items;
};

const getProductsWithStock = async () => {
  const products = await getProductsList();
  const stocks = await getStocksList();
  return products.map((product) => {
    let stock = stocks.find((stock) => product.id === stock.product_id);
    let stockValue = stock ? stock.count : 0;
    return { ...product, count: stockValue };
  });
};

module.exports.handler = async (event) => {
  console.log("Request: ", event);
  let response;
  try {
    const result = await getProductsWithStock();
    if (result) {
      response = Responses._200(result);
    } else {
      response = Responses._400({ message: "Products not found!" });
    }
  } catch (error) {
    console.log("error:", error);
    return Responses._500({ message: "Something was wrong!", error });
  }
  return response;
};
