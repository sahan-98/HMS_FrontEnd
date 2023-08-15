import { post } from "../api-manager";

class UserService {
  static async login({ userName, password }) {
    return await post({ path: `/user/login`, data: { userName, password } });
  }
}

export default UserService;
