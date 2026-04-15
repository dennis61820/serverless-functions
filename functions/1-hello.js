// domain/.netlify/functions/1-hello
export async function handler(event, context) {
  console.log(event)
  console.log(context)
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: 'Our First Netlify Function Example',
  }
}
