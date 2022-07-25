import axios from "axios";

const api = axios.create({
  baseURL: "https://blogapi-restful.herokuapp.com/",
});
export default api;
