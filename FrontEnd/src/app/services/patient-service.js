import { del, get, post, put } from "../api-manager";

class PatientService {
  static async gePatientById({ patientId }) {
    return await get({ path: `/patient/${patientId}` });
  }

  static async getAllPatients() {
    return await get({ path: `/patient` });
  }

  static async newPatient({ patient }) {
    return await post({ path: `/patient/add`, data: patient });
  }

  static async updatePatient({ patientId, patient }) {
    return await put({
      path: `patient/update/${patientId}`,
      data: patient,
    });
  }

  static async deletePatient({ patientId }) {
    return await del({ path: `/patient/deletepatients/${patientId}` });
  }

  static async login({ userName, password }) {
    return await post({ path: `/patient/login`, data: { userName, password } });
  }
}

export default PatientService;
