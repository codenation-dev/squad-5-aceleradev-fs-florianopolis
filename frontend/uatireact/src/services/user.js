import { get, post, put } from "../utils/api";
class ServiceUser {
  static getUsers() {
    return get("users", true);
  }

  static signUser(credentials) {
    credentials = JSON.stringify(credentials);
    return post("signup", credentials, true);
  }

  static updateUser(credentials) {
    const id = credentials.id;
    credentials = JSON.stringify(credentials);
    
    return put("users/"+id, credentials, true);
  }
}

export default ServiceUser;
