import Api from "../utils/Api";

interface ResponseLogin {
  data: {
    id: number;
    firstname: string;
    lastname: string | null;
    email: string;
    mobileNumber: string | null;
  };
}

class AdminService {
  api: any;
  instance: any;

  constructor() {
    this.api = Api;
    this.instance = this.api.instance;
  }

  async login(data: { email: string; password: string }): Promise<ResponseLogin> {
    const response = await this.instance.post("/api/admin/connection", data, {
      withCredentials: true, // Active la gestion des cookies
    });
    return response;
  }
}

var adminService = new AdminService();
export default adminService;
