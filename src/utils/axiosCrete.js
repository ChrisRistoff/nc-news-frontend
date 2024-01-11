import axios from "axios";

export const api = axios.create({
  baseURL: "http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});
