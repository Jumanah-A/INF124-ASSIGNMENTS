import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/products");
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post("/products", data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }

  findByTitle(title) {
    return http.get(`/products?title=${title}`);
  }

  findByFilter(title, fromPrice, toPrice, category) {
    var query = `/products?title=${title}`; 
    if (category) {
      query += `&category=${category}`;
    }
    if (fromPrice) {
      query += `&fromPrice=${fromPrice}`;
    }
    if (toPrice) {
      query += `&toPrice=${toPrice}`;
    }

    console.log(query)
    return http.get(query);
  }
}

export default new ProductDataService();