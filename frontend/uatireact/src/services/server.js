import { get } from "../utils/api";

export const isServerUp = async () => {
  try {
    await get("/");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
