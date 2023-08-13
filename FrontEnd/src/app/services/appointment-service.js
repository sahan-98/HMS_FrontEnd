import { get, post } from "../api-manager";

class AppointmentService {
  static async placeNewAppointment({ data }) {
    return await post({
      path: `/appoinment/add`,
      data,
    });
  }

  static async getAppointmentsByPatientId({ patientId }) {
    return await get({
      path: `/appoinment/patient/${patientId}`,
    });
  }

  static async getAppointmentsByDoctorId({ doctorId }) {
    return await get({
      path: `/appoinment/doctor/${doctorId}`,
    });
  }
}

export default AppointmentService;
