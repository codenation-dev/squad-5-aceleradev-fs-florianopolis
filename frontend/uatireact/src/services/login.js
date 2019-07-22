import { post } from "../utils/api";
import { isServerUp } from "./server";

export const tryLogin = async payload => {
  if (await isServerUp()) {
    const credentials = {
      email: payload.credentials.email,
      password: payload.credentials.password
    };
    const response = post("/login", credentials);

    return response;
  } else {
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
