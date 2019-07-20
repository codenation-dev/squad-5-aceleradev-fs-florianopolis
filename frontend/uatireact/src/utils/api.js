import axios from "axios";

const BASE_URL = "https://www.mocky.io/v2/5185415ba171ea3a00704eed";

export const get = (uri = "") => {
  return axios.get(`${BASE_URL}${uri}`);
};
export const post = async payload => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    body: JSON.stringify({
      email: payload.credentials.username,
      password: payload.credentials.password
    })
  });
  return await response.json();
};
