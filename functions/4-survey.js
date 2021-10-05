const Airtable = require("airtable-node");
require("dotenv").config();

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appGgniNS5PmPXDiI")
  .table("survey");

exports.handler = async (event, context, cb) => {
  console.log(event);
  const method = event.httpMethod;
  if (method === "GET") {
    try {
      const { records } = await airtable.list();
      const survey = records.map((item) => {
        const { id } = item;
        const { room, votes } = item.fields;
        return { id, room, votes };
      });
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(survey),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "server error",
      };
    }
  }
  if (method === "PUT") {
    try {
      const { id, votes } = JSON.parse(event.body);
      if (!id || !votes) {
        return {
          statusCode: 400,
          body: "Please provide id and votes value",
        };
      }
      const fields = { votes: Number(votes) + 1 };
      const item = await airtable.update(id, { fields });
      console.log(item);
      if (item.error) {
        return {
          statusCode: 400,
          body: JSON.stringify(item),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: "Please provide id and votes value",
      };
    }
  }
  // default response
  return {
    statusCode: 405,
    body: "only POST or GET requests allowed",
  };
};
