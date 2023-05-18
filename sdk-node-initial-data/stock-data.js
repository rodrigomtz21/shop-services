// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-2" });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2023-05-05" });

var params = {
  RequestItems: {
    stocks: [
      {
        PutRequest: {
          Item: {
            product_id: { S: "0a236bd7-3e0c-4419" },
            count: { N: "8" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "4f8533e1-36f2-4453" },
            count: { N: "20" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "efd961fd-ec93-4c8e" },
            count: { N: "2" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "efd978fd-ec23-4d8e" },
            count: { N: "28" },
          },
        },
      },
    ],
  },
};

ddb.batchWriteItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
