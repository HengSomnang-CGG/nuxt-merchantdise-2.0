import { defineEventHandler, getQuery, getRouterParam } from "h3";
import axios from "axios";
import https from "https";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const url = process.env.API_URL;
  try {
    const response = await axios.get(`${url}/cgg/blog/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-token": process.env.X_API_TOKEN,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      status: 500,
      message: "Error fetching data",
      details: error,
    };
  }
});
