import { del, get, post } from "../api-manager.js";

class MedOfficerService {
  static async getAllMedOfficers() {
    return await get({
      path: "/medicalOfficer",
    });
  }

  static async newMedOfficer({ medOfficer }) {
    return await post({
      path: "/medicalOfficer/add",
      data: medOfficer,
    });
  }

  static async login({ userName, password }) {
    return await post({
      path: `/medicalOfficer/login`,
      data: { userName, password },
    });
  }

  static async logout({ labAssistantId }) {
    return await post({
      path: `/labAssistant/logout/${labAssistantId}`,
      data: {},
    });
  }

  static async updateLabAssistant(id, labAssistant) {
    return await post({
      path: "/labAssistant/update/" + id,
      data: labAssistant,
    });
  }

  static async deleteLabAssistant({ labAssistantId }) {
    return await del({
      path: "/labAssistant/" + labAssistantId,
    });
  }
}

export default LabAssistantService;
