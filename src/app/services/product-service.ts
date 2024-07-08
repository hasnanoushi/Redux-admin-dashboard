export interface Product {
  id: string;
  name: string;
  price: {
    formatted_with_symbol:string;
  };
  image: {
    url: string;
  };
  description: string;
}

import { ServiceBase } from "./service-base";
export class ProductService extends ServiceBase {
  static getProducts = async () => {
    try {
      var productResp = await fetch(this.getUrl("/products"), {
        method: "GET",
        headers: {
          "X-Authorization":
            "sk_57060632d68bbedd4a19f2c776d8082832e5c0e623b7a",
        },
      });
      var products = await productResp.json();
      return products.data;
    } catch (error) {
      console.log("error occured", error);
    }
  };

  static async deleteProduct(productId: string) {
    try {
      const response = await fetch(this.getUrl(`/products/${productId}`), {
        method: "DELETE",
        headers: {
          "X-Authorization":
            "sk_57060632d68bbedd4a19f2c776d8082832e5c0e623b7a",
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  static async fetchProductById(id: string) {
    const response = await fetch(this.getUrl(`/products/${id}`), {
      headers: {
        "X-Authorization":
          "sk_57060632d68bbedd4a19f2c776d8082832e5c0e623b7a",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  }

  static addNewProduct = async (
    name: string,
    price: number,
    description: string
  ) => {
    const productData={
      product:{
        name:name,
        price:price,
        description:description,
      }
    };
    try{
      const response = await fetch(this.getUrl('/products'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-Authorization":
          "sk_57060632d68bbedd4a19f2c776d8082832e5c0e623b7a",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      return data;
    }catch(error){
      console.log("error adding new product:",error);
    }
  }

  static editProduct = async (
    productId:string,
    name: string,
    price: number,
    description: string
  ) => {
    const productData={
      product:{
        name:name,
        price:price,
        description:description,
      }
    };
    try{
      const response = await fetch(this.getUrl(`/products/${productId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "X-Authorization":
          "sk_57060632d68bbedd4a19f2c776d8082832e5c0e623b7a",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      return data.data;
    }catch(error){
      console.log("error adding new product:",error);
    }
  }
}
