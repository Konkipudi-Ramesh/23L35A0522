import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const createShortUrl = async (url, validity) => {
  const res = await API.post("/shorturls", { url, validity });
  return res.data;
};

export const getStats = async (shortcode) => {
  const res = await API.get(`/shorturls/${shortcode}`);
  return res.data;
};
