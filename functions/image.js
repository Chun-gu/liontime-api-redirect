import https from "https";
import fetch, { File, FormData } from "node-fetch";
import { parseMultipartForm } from "./parseMultipartForm";

export async function handler(event) {
  const { path, httpMethod } = event;

  if (httpMethod === "OPTIONS")
    return {
      statusCode: 200,
      ok: true,
      headers: {
        "Access-Control-Allow-Origin": process.env.HOST,
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    };

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const { image } = await parseMultipartForm(event);

  const formData = new FormData();
  for (const img of image) {
    const file = new File([img.content], img.filename, {
      type: img.type,
    });
    formData.append("image", file);
  }

  try {
    const response = await fetch(process.env.API_URL + path, {
      agent: httpsAgent,
      method: httpMethod,
      body: formData,
    });

    const { status, ok, headers } = response;
    const resJson = await response.json();
    const body = JSON.stringify(resJson);

    headers["Access-Control-Allow-Origin"] = "*";

    return {
      statusCode: status,
      ok,
      headers,
      body,
    };
  } catch (err) {
    return {
      statusCode: 404,
      statusText: err.message,
      ok: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
}
