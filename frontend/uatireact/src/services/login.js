import Api from "../utils/api";

class ServiceLogin {
  static tryLogin(payload) {
    const { username, password } = payload;
    console.log("Try login api, change to post when api is up");
    // console.log(payload);
    return Api.get();
  }
}

export default ServiceLogin;
