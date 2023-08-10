import { post } from "../api-manager";

class HeartDiseasePredictionService {
  static async predictHeartDisease(data) {
    return await post({ path: `/detection/add`, data });
  }
}

export default HeartDiseasePredictionService;
