// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-2" });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2023-05-05" });

var params = {
  RequestItems: {
    products: [
      {
        PutRequest: {
          Item: {
            id: { S: "0a236bd7-3e0c-4419" },
            title: { S: "Pellentesque viverra pede ac diam." },
            description: {
              S: "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
            },
            price: { N: "64.09" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "4f8533e1-36f2-4453" },
            title: { S: "Nullam varius." },
            description: { S: "Duis ac nibh." },
            price: { N: "99.34" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "efd961fd-ec93-4c8e" },
            title: { S: "Etiam faucibus cursus urna." },
            description: {
              S: "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
            },
            price: { N: "98.66" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "efd978fd-ec23-4d8e" },
            title: { S: "New product 1" },
            description: { S: "Product 1 description" },
            price: { N: "28.66" },
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
