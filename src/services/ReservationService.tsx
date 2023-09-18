import Api from "../utils/Api";

export class ReservationService {
  api: any;
  instance: any;

  constructor() {
    this.api = Api;
    this.instance = this.api.instance;
  }
}
