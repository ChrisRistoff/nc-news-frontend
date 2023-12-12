import axios from "axios";

export const api = axios.create({
  baseURL: "https://nc-news-api-62ip.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});
