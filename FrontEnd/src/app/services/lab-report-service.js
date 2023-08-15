import { get, post } from "../api-manager";

class LabReportService {
  static async getPendingCount() {
    return await get({ path: `/report/pendingBillsCount` });
  }

  static async getAllReportCount() {
    return await get({ path: `/report/allBillsCount` });
  }

  static async newLabReport({ data }) {
    return await post({ path: `/report/add`, data });
  }

  static async updateLabReport({ reportId, data }) {
    return await post({ path: `/report/updateResult/${reportId}`, data });
  }

  static async getLabReport({ reportId }) {
    return await get({ path: `/report/${reportId}` });
  }

  static async getLabReportByLabAssistantId({ labAssistantId }) {
    return await get({
      path: `/report/get-by-lab-assistant/${labAssistantId}`,
    });
  }

  static async getAllLabReports() {
    return await get({ path: `/report` });
  }
}

export default LabReportService;
