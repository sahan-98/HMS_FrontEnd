import { get, post } from "../api-manager";

class BedService {
  static async autoAllocateBed({ patientid, allocatedDate }) {
    return await post({
      path: `/bed/autoAllocateBed`,
      data: { patientid, allocatedDate: allocatedDate },
    });
  }

  static async getAvailableBedCount() {
    return await get({
      path: `/bed/availableBedCount`,
    });
  }

  static async getBedBillsByPatientId({ patientId }) {
    return await get({
      path: `/bedBill/by-patient/${patientId}`,
    });
  }

  static async payLabReportBill({ bedBillId }) {
    return await post({
      path: `/bedBill/pay/${bedBillId}`,
      data: {},
    });
  }
}

export default BedService;
