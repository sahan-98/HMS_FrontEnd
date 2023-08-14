import { get } from "../api-manager";

class LabReportService {
  static async getPendingCount() {
    return await get({ path: `/report/pendingBillsCount` });
  }

  static async getAllReportCount() {
    return await get({ path: `/report/allBillsCount` });
  }
}

export default LabReportService;
