const expect = require("chai").expect;
const proxyquire = require("proxyquire");
const lambdaTester = require("lambda-tester");

const products = require('./mock-data');
const Responses = require('../product-service/lambdas/APIResponses');

describe('getProductsById lambda test', () => {
  let lambda;
  beforeEach(function () {
    // Exporting the lambda with mock dependencies
    lambda = proxyquire.noCallThru().load("../product-service/lambdas/getProductsById.js", {
      './APIResponses': Responses,
      './productsMockData': products,
    });
  });

  it("with data array", function (done) {
    lambdaTester(lambda.handler)
      .event({pathParameters: {id: "0a236bd7-3e0c-4419"}}) // Passing input data
      .expectResult((result) => {
        // Check if code exist
        expect(result.statusCode).to.exist;

        // Check if code =200
        expect(result.statusCode).to.equal(200);

        // Check if data exist
        expect(result.body).to.exist;

        // Check if data is an array
        expect(result.body).to.be.a("string");

        done();
      })
      .catch(done); // Catch assertion errors
  });
});

describe('getProductsList lambda test', () => {
  let lambda;
  beforeEach(function () {
    // Exporting the lambda with mock dependencies
    lambda = proxyquire.noCallThru().load("../product-service/lambdas/getProductsList.js", {
      './APIResponses': Responses,
      './productsMockData': products,
    });
  });

  it("with data array", function (done) {
    lambdaTester(lambda.handler)
      .event({}) // Passing input data
      .expectResult((result) => {
        // Check if code exist
        expect(result.statusCode).to.exist;

        // Check if code =200
        expect(result.statusCode).to.equal(200);

        // Check if data exist
        expect(result.body).to.exist;

        // Check if data is an array
        expect(result.body).to.be.a("string");

        done();
      })
      .catch(done); // Catch assertion errors
  });
});
