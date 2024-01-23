import axios from "axios";

// http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com/api
export const api = axios.create({
  baseURL: "https://krasen.site/api",
  headers: {
    "Content-Type": "application/json"
  }
});
