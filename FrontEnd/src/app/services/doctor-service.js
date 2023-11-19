import { del, get, post, put } from "../api-manager";

class DoctorService {
  static async getDoctorById({ doctorId }) {
    return await get({ path: `/doctor/singleDoctors/${doctorId}` });
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

  static async login({ userName, password }) {
    return await post({ path: `/doctor/login`, data: { userName, password } });
  }

  static async logout({ doctorid }) {
    return await post({ path: `/doctor/logout`, data: { doctorid } });
  }

  static async autoAllocateDoctor({ bookingDate, patientid }) {
    return await post({
      path: `/doctor/autoAllocateDoc`,
      data: { bookingDate, patientid },
    });
  }

  static async autoAllocateDoctorForExistingAppointment({ bookingDate, patientid }) {
    return await post({
      path: `/doctor/autoAllocateDoc-extappointment`,
      data: { bookingDate, patientid },
    });
  }

  static async getAvailableDoctors() {
    return await get({
      path: `/doctor/availableDoctors`,
    });
  }

  static async getDoctorCount() {
    return await get({
      path: `/doctor/allDoctorsCount`,
    });
  }
}

export default DoctorService;
