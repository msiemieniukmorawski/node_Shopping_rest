module.exports = function(app) {
  const product = require("../controllers/product");

  // user Routes
  app
    .route("/product")
    .get(product.list_all_products)
    .post(product.create_a_product);

  app
    .route("/products/:productId")
    .get(product.read_a_product)
    .put(product.update_a_product)
    .delete(product.delete_a_product);
};
