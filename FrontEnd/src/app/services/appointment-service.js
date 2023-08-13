import { post } from "../api-manager";

class AppointmentService {
  static async placeNewAppointment({ data }) {
    return await post({
      path: `/appoinment/add`,
      data,
    });
  }
}

export default AppointmentService;
