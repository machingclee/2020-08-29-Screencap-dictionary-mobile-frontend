import axios from "axios";

import config from "../../config.json";
import devConfig from "../../config.dev.json";
import prodConfig from "../../config.prod.json";

const { NODE_ENV } = config;

let currentConfig;

console.log("NODE_ENV", NODE_ENV);

if (NODE_ENV == "prod") currentConfig = prodConfig;
else currentConfig = devConfig;

const { API_BASE_URL } = currentConfig;

const screencap = axios.create({
  baseURL: API_BASE_URL
});

async function saveToken({ authToken, pushToken }) {
  try {
    await screencap.post(
      "/auth/saveToken",
      {
        token: pushToken
      },
      {
        headers: {
          Authorization: "Bearer " + authToken
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export const screencapAPI = { saveToken };

export default screencap;
