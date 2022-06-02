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

  // findByTitle(title) {
  //   return http.get(`/products?title=${title}`);
  // }
  findByCategory(category) {
    return http.get(`/products?category=${category}`);
  }

<<<<<<< HEAD
=======
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
>>>>>>> 00281b4bb2e1b2ee1c673ddc3591437fc25bd4a4
}

export default new ProductDataService();
