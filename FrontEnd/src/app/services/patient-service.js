import { del, get, post, put } from "../api-manager";

class PatientService {
  static async gePatientsById({ patientId }) {
    return await get({ path: `/patient/${patientId}` });
  }

  static async getAllPatients() {
    return await get({ path: `/paitent` });
  }

  static async newPatient({ patient }) {
    return await post({ path: `/paitent/add`, data: patient });
  }

  static async updatePatient({ patientId, patient }) {
    return await put({
      path: `paitent/update/${patientId}`,
      data: patient,
    });
  }

  static async deletePatient({ patientId }) {
    return await del({ path: `/patient/deletepatients/${patientId}` });
  }
}

export default PatientService;
