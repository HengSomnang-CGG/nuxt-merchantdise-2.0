import { defineEventHandler } from "h3";
import axios from "axios";
import https from "https";

export default defineEventHandler(async () => {
  const url = process.env.API_URL;
  try {
    const response = await axios.get(`${url}/web-manager/resources`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-token": process.env.X_API_TOKEN,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    console.log("API Response:", response.data);

    return {
      websources: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error fetching data",
      details: error,
    };
  }
});
