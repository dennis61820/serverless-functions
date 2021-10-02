const Airtable = require("airtable-node");
require("dotenv").config();

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appGgniNS5PmPXDiI")
  .table("products");

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          statusCode: 404,
          body: `id: ${id} not found`,
        };
      }
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 500,
        body: `server error`,
      };
    }
  }
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 400,
    body: "please provide product id",
  };
};
