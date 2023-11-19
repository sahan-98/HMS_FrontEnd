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

  static async logout({ medOfficerId }) {
    return await post({
      path: `/labAssistant/logout/${medOfficerId}`,
      data: {},
    });
  }

  static async updateMedOfficer({id, medOfficer}) {
    return await post({
      path: "/medicalOfficer/update/" + id,
      data: medOfficer,
    });
  }

  static async deleteMedOfficer({ medOfficerId }) {
    return await del({
      path: "/medicalOfficer/" + medOfficerId,
    });
  }
}

export default MedOfficerService;
