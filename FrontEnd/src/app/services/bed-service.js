import { post } from "../api-manager";

class BedService {
  static async autoAllocateBed({ patieentId, allocationDate }) {
    return await post({
      path: `/bed/autoAllocateBed`,
      data: { patieentId, allocatedDate: allocationDate },
    });
  }
}
