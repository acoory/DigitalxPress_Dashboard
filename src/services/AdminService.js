import Api from "../utils/Api";

class AdminService {
  constructor() {
    this.api = Api;
    this.instance = this.api.instance;
  }

  async login(data) {
    try {
      const response = await this.instance.post("/api/admin/connection", data);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

var adminService = new AdminService();
export default adminService;
