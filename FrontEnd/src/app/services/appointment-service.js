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
      path: `/appoinment/${patientId}`,
    });
  }
}

export default AppointmentService;
