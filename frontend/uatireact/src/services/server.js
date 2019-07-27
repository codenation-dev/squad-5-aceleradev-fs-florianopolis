import { get } from "../utils/api";

export const isServerUp = async () => {
  try {
    const response = await get("");
    return response.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
};
