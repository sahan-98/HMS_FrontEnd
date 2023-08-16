import { del, get, post, put } from "../api-manager";

class PatientService {
  static async gePatientById({ patientId }) {
    return await get({ path: `/patient/${patientId}` });
  }

  static async getAllPatients() {
    return await get({ path: `/patient` });
  }

  static async getPatientCount() {
    return await get({ path: `/patient/getAllCountPatient` });
  }

  static async newPatient({ patient }) {
    return await post({ path: `/patient/add`, data: patient });
  }

  static async updatePatient({ patientId, patient }) {
    return await post({
      path: `/patient/update/${patientId}`,
      data: patient,
    });
  }

  static async deletePatient({ patientId }) {
    return await del({ path: `/patient/deletepatients/${patientId}` });
  }

  static async login({ userName, password }) {
    return await post({ path: `/patient/login`, data: { userName, password } });
  }
  static async logout({ patientId }) {
    return await post({
      path: `/patient/logout`,
      data: { id: patientId },
    });
  }
}

export default PatientService;
