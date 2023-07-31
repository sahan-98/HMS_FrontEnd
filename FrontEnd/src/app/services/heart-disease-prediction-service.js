import { post } from "../api-manager";

class HeartDiseasePredictionService {
  static async predictHeartDisease(data) {
    return await post({ path: `/heart-disease-prediction/predict`, data });
  }
}

export default HeartDiseasePredictionService;
