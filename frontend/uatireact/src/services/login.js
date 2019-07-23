import { post } from "../utils/api";

class ServiceLogin {
  static async tryLogin(payload) {
    const isBackendRunning = false; //change this to test the code visually without bacakend's endpoints
    if (isBackendRunning) {
      const response = post(payload);
      return response;
    } else {
      //while "yarn test"ing you should use isBackendRunning = true because we have mockups
      if (
        payload.credentials.username === "1" &&
        payload.credentials.password === "1"
      ) {
        return { token: "fakeToken" };
      } else {
        return { message: "fakeLogin failed" };
      }
    }
  }
}

export default ServiceLogin;
