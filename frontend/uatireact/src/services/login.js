import { post } from "../utils/api";

class CharacterService {
  static tryLogin(payload) {
    return post(payload);
  }
}

export default CharacterService;
