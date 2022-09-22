import axios from "axios";
import { IBlog } from "ui";

const API_URL = "http://localhost:3000/api";

export const fetchBlogs = async () => {
  return await axios.get(`${API_URL}/blogs`).then((res) => res.data);
};
export const createBlogs = async (newBlog: IBlog) => {
  return await axios.post(`${API_URL}/blogs`, newBlog).then((res) => res.data);
};
