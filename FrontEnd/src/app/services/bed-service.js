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
}

export default BedService;
