import { post } from "../utils/api";
class ServiceImport {
  static tryImport(obj) {
    return post("clients/upload", obj, true);
  }
}

export default ServiceImport;
