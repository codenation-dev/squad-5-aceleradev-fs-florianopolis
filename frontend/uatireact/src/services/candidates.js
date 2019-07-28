import { get } from "../utils/api";

class ServiceCandidates {
  static async loadCandidates(query = "", pageNumber = 1) {
    return get("specials/top", true);
  }
}

export default ServiceCandidates;
