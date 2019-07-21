import { post } from "../utils/api";

export const tryLogin = async payload => {
  const isBackendRunning = true; //change this to test the code visually without bacakend's endpoints
  if (isBackendRunning) {
    const credentials = {
      email: payload.credentials.email,
      password: payload.credentials.password
    };
    const response = post("/login", credentials);

    return response;
  } else {
    //while "yarn test"ing you should use isBackendRunning = true because we have mockups
    if (
      payload.credentials.email === "1" &&
      payload.credentials.password === "1"
    ) {
      return { token: "fakeToken" };
    } else {
      return { message: "fakeLogin failed, change services/login.js" };
    }
  }
};
