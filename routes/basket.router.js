module.exports = function(app) {
  const basket = require("../controllers/basket");

  // user Routes
  app.route("/basket").post(basket.create_a_basket);

  app
    .route("/baskets/:basketId")
    .get(basket.read_a_basket)
    .put(basket.update_a_basket)
    .delete(basket.delete_a_basket);

  app
    .route("/baskets/:basketId/:productId")
    .delete(basket.delete_a_product_in_basket);
};
