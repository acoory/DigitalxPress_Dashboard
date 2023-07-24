import axios from "axios";
// import fs from "fs";
// import * as http from "http";
// const https = require("https");

class Api {
  instance: any;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      // withCredentials: true,
      timeout: 1000,
      //   httpsAgent: new https.Agent({
      //     rejectUnauthorized: false, // (NOTE: this will disable client verification)
      //     // cert: fs.readFileSync("../https-server/cert.pem"),
      //     // key: fs.readFileSync("../https-server/key.pem"),
      //     passphrase: "",
      //   }),
    });

    this.instance.interceptors.response.use(
      (response: any) => response,
      async (error: { response: { status: number } }) => {
        if (error.response.status === 401) {
          console.log("Unauthorized");
          try {
            await this.refreshToken();
          } catch (error) {
            console.log("Refresh token failed");
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  refreshToken() {
    return this.instance.post("/refresh-token");
  }
}

var api = new Api();
export default api;
