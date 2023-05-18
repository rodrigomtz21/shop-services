const Responses = require("./APIResponses");
const AWS = require("aws-sdk");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const dynamo = new AWS.DynamoDB.DocumentClient();
const productId = uuid();

const createProduct = async (product) => {
  const putResults = await dynamo
    .transactWrite({
      TransactItems: [
        {
          Put: {
            Item: {
              id: productId,
              title: product.title,
              description: product.description,
              price: product.price,
            },
            TableName: process.env.PRODUCTS_TABLE,
          },
        },
        {
          Put: {
            Item: {
              product_id: productId,
              count: product.count,
            },
            TableName: process.env.STOCKS_TABLE,
          },
        },
      ],
    })
    .promise();

  return putResults;
};

module.exports.handler = async (event) => {
  console.log("Request", event);

  let response;

  try {
    const body = JSON.parse(event.body);

    if (_.isEmpty(body.product)) {
      return Responses._400({
        message: "Missing product data from the request",
      });
    }

    await createProduct(body.product);
    response = Responses._200({ message: "Successfully completed!" });
  } catch (error) {
    console.log("error:", error);
    return Responses._500({ message: "Something was wrong!", error: error });
  }

  return response;
};
