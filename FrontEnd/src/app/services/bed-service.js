import { post } from "../api-manager";

class BedService {
  static async autoAllocateBed({ patientid, allocatedDate }) {
    return await post({
      path: `/bed/autoAllocateBed`,
      data: { patientid, allocatedDate: allocatedDate },
    });
  }
}

export default BedService;
