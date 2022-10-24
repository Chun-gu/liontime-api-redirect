import https from "https";
import fetch from "node-fetch";

export async function handler(event) {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const headers = {
    "Access-Control-Allow-Origin": process.env.HOST,
    "Content-Type": "application/json",
  };

  const {
    httpMethod,
    headers: { referer },
    body,
  } = event;

  const path = new URL(referer).pathname;

  let response;
  try {
    response = await fetch(process.env.API_URL + path, {
      headers,
      method: httpMethod,
      agent: httpsAgent,
      body,
    }).then((res) => res.json());
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response),
  };
}
