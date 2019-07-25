import { post } from "../utils/api";
class ServiceImport {
  static tryImport() {
    return post("clients/upload");
  }
}

export default ServiceImport;
