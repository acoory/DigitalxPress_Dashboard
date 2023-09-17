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

  async getUserInfo(id: number) {
    try {
      const response = await this.instance.get(`/api/admin/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // throw new Error(error);
    }
  }

  async UpdateAdmin(id: number, data: any) {
    const formatMobileNumber = (mobileNumber: string) => {
      if (mobileNumber.length > 1) {
        if (mobileNumber[0] === "0") {
          console.log(mobileNumber.substring(1));
          return parseInt(mobileNumber.substring(1));
        } else {
          return parseInt(mobileNumber);
        }
      } else {
        return mobileNumber ? parseInt(mobileNumber) : null;
      }
    };

    formatMobileNumber(data.mobileNumber);
    const formatData = {
      firstname: data.firstname,
      lastname: data.lastname,
      mobileNumber:
        typeof formatMobileNumber(data.mobileNumber) === "number"
          ? formatMobileNumber(data.mobileNumber)
          : 1,
      email: data.email,
    };

    try {
      const response = await this.instance.put(`/api/admin/${id}`, formatData, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      // throw new Error(error);
      console.log(error);
    }
  }

  async updatePassword(id: number, data: any) {
    console.log(data);
    try {
      const response = await this.instance.put(`/api/admin/password/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      // throw new Error(error);
      console.log(error);
    }
  }
}

var adminService = new AdminService();
export default adminService;
