import { del, get, post, put } from "../api-manager";

class DoctorService {
  static async getDoctorById({ doctorId }) {
    return await get({ path: `/doctor/${doctorId}` });
  }

  static async getAllDoctors() {
    return await get({ path: `/doctor/allDoctors` });
  }

  static async newDoctor({ doctor }) {
    return await post({ path: `/doctor/addDoctor`, data: doctor });
  }

  static async updateDoctor({ doctorId, doctor }) {
    return await put({
      path: `/doctor/updateDoctors/${doctorId}`,
      data: doctor,
    });
  }

  static async deleteDoctor({ doctorId }) {
    return await del({ path: `/doctor/deleteDoctors/${doctorId}` });
  }
}

export default DoctorService;
