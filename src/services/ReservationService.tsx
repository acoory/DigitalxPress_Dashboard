import Api from "../utils/Api";

export class ReservationService {
  api: any;
  instance: any;

  constructor() {
    this.api = Api;
    this.instance = this.api.instance;
  }

  async getAll() {
    try {
      const response = await this.instance.get("/api/reservation", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // throw new Error(error);
    }
  }
}
