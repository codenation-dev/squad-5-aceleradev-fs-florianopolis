import { post } from "../utils/api";
import { isServerUp } from "./server";

class ServiceLogin {
  static tryLogin(payload) {
    console.log(payload);
    const isBackendRunning = true; //change this to test the code without bacakend's endpoints
    if (isBackendRunning) {
      return post("login", payload);
    } else {
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
