import { get, post } from "../api-manager";

class AppointmentService {
  static async placeNewAppointment({ data }) {
    return await post({
      path: `/appoinment/add`,
      data,
    });
  }

  static async updateVisitStatus({ appointmentId }) {
    return await post({
      path: `/appoinment/updateVisitStatus/${appointmentId}`,
      data: {},
    });
  }

  static async getAppointmentsByPatientId({ patientId }) {
    return await get({
      path: `/appoinment/patient/${patientId}`,
    });
  }

  static async getAllAppointments() {
    return await get({
      path: `/appoinment`,
    });
  }

  static async getAppointmentsByDoctorId({ doctorId }) {
    return await get({
      path: `/appoinment/doctor/${doctorId}`,
    });
  }

  static async getAppointmentBillsByPatientId({ patientId }) {
    return await get({
      path: `/appoinment/bill-by-patient/${patientId}`,
    });
  }
}

export default AppointmentService;
