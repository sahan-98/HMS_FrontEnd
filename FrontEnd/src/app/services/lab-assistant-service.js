import { get, post } from "../api-manager.js";

class LabAssistantService {
  static async getAllLabAssistants() {
    return await get({
      path: "/labAssistant",
    });
  }

  static async newLabAssistant({ labAssistant }) {
    return await post({
      path: "/labAssistant/add",
      data: labAssistant,
    });
  }

  static async login({ userName, password }) {
    return await post({
      path: `/labAssistant/login`,
      data: { userName, password },
    });
  }

  static async updateLabAssistant(id, labAssistant) {
    return await post({
      path: "/labAssistant/update/" + id,
      data: labAssistant,
    });
  }
}

export default LabAssistantService;
