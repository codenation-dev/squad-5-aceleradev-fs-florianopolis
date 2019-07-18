import axios from "axios";

const BASE_URL = "https://www.mocky.io/v2/5185415ba171ea3a00704eed";

class Api {
  static get(uri = "") {
    // console.log(`${BASE_URL}${uri}`);
    return axios.get(`${BASE_URL}${uri}`);
  }
  static post(uri, payload) {
    return axios.post(`${BASE_URL}${uri}`, payload);
  }
}

export default Api;
