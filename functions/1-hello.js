// domain/.netlify/functions/1-hello
exports.handler = async (event, context) => {
  console.log(event);
  console.log(context);
  return {
    statusCode: 200,
    body: "Our First Netlify Function Example",
  };
};
