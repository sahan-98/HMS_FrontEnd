import { post } from "../api-manager";

class BedService {
  static async autoAllocateBed({ patieentId, allocatedDate }) {
    return await post({
      path: `/bed/autoAllocateBed`,
      data: { patieentId, allocatedDate: allocatedDate },
    });
  }
}

export default BedService;
