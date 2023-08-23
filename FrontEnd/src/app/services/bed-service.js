import generateAgeGroup from "../../utils/generate-age-group";
import { get, post } from "../api-manager";

class BedService {
  static async autoAllocateBed({ patientid, allocatedDate }) {
    return await post({
      path: `/bed/autoAllocateBed`,
      data: { patientid, allocatedDate: allocatedDate },
    });
  }

  static async allocateBed({ bedNo, wardNo, patientid }) {
    const today = new Date();
    return await post({
      path: `/bed/allocateBed`,
      data: {
        bedNo: bedNo,
        wardNo: wardNo,
        patientid: patientid,
        allocatedDate: today.toISOString().split("T")[0],
      },
    });
  }

  static async releaseBed({ bedId }) {
    return await post({
      path: `/bed/releaseBed/${bedId}`,
      data: {},
    });
  }

  static async predictTime({
    extraRooms,
    staffAvailable,
    visitors,
    wardNo,
    age,
    gender,
    admissionType,
    illnessSeverity,
    insurance,
  }) {
    return await post({
      path: `/bed/predict`,
      data: {
        Available_Extra_Rooms_in_Hospital: [extraRooms],
        staff_available: [staffAvailable],
        Visitors_with_Patient: [visitors],
        Admission_Deposit: [4000],
        Ward_Facility_Code_B: [0],
        Ward_Facility_Code_C: [0],
        Ward_Facility_Code_D: [0],
        Ward_Facility_Code_E: [0],
        Ward_Facility_Code_F: [0],
        [`Ward_Facility_Code_${wardNo}`]: [1],
        Age_20_Nov: [0],
        Age_21_30: [0],
        Age_31_40: [0],
        Age_41_50: [0],
        Age_51_60: [0],
        Age_61_70: [0],
        Age_71_80: [0],
        Age_81_90: [0],
        Age_91100: [0],
        ...generateAgeGroup(age),
        gender_Male: [gender === "MALE" ? 1 : 0],
        gender_Other: [gender !== "MALE" ? 1 : 0],
        Type_of_Admission_Trauma: [admissionType === "TRAUMA" ? 1 : 0],
        Type_of_Admission_Urgent: [admissionType === "URGENT" ? 1 : 0],
        Severity_of_Illness_Minor: [illnessSeverity === "MINOR" ? 1 : 0],
        Severity_of_Illness_Moderate: [illnessSeverity === "MODERATE" ? 1 : 0],
        Insurance_Yes: [insurance === "YES" ? 1 : 0],
      },
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

  static async payBedBill({ bedBillId }) {
    return await post({
      path: `/bedBill/pay/${bedBillId}`,
      data: {},
    });
  }
}

export default BedService;
