import Api from "../utils/Api";

export class ProduitsService {
  api: any;
  instance: any;

  constructor() {
    this.api = Api;
    this.instance = this.api.instance;
  }

  async getAll() {
    try {
      const response = await this.instance.get("/api/product", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // throw new Error(error);
    }
  }

  private async getOne(id: number) {
    try {
      const response = await this.instance.get(`/api/product/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // throw new Error(error);
    }
  }

  private async getSupplements(id: number) {
    try {
      const response = await this.instance.get(`/api/product-supplement/product/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // throw new Error(error);
    }
  }

  async getProduct(id: number) {
    try {
      const req = Promise.all([
        this.getOne(id),
        this.getSupplements(id),
        this.getProductChoices(id),
      ]).then((res) => {
        // console.log("res", res);
        return res;
      });

      return req;
    } catch (error) {
      // throw new Error(error);
    }
  }

  async deleteSupplement(id: number) {
    try {
      const response = await this.instance.delete(`/api/product-supplement/${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      // throw new Error(error);
    }
  }

  async addSupplement(data: any) {
    try {
      const response = await this.instance.post("/api/product-supplement", data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      // throw new Error(error);
    }
  }

  async deleteProduct(id: number) {
    try {
      const response = await this.instance.delete(`/api/product/${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      // throw new Error(error);
    }
  }

  async getProductChoices(id: number) {
    try {
      const response = await this.instance.get(`/api/product-choice/product/${id}`, {
        withCredentials: true,
      });
      return response.data.choiceTypeList[0] ? response.data.choiceTypeList[0] : [];
    } catch (error) {
      // throw new Error(error);
    }
  }

  async addProduct(data: any) {
    try {
      const response = await this.instance.post("/api/product", data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      // throw new Error(error);
    }
  }

  async updateProduct(data: any, id: number) {
    const newData = {
      name: data.name,
      price: parseInt(data.price),
      description: data.description,
    };
    try {
      const response = await this.instance.put(`/api/product/${id}`, newData, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      // throw new Error(error);
      console.log("error", error);
    }
  }
}
