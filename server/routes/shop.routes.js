const { authJwt, prepCart } = require("../middleware");
const controller = require("../controllers/shop.controller");
module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/api/contact/',
    controller.contactMe
  )

  app.post('/api/images/:sku',
    controller.getImages
  )

  app.post(
    '/api/shop',
    controller.getShop
  )

  app.post(
    '/api/getItem',
    controller.getItem
  )
  app.post(
    '/api/getItems',
    controller.getItems
  )

  app.post(
    '/api/editItem',
    [authJwt.verifyToken],
    // authJwt.isAdmin],
    controller.editItem
  )
  app.post(
    '/api/addItem',
    [authJwt.verifyToken],
    // authJwt.isAdmin],
    controller.addItem
  )
  app.post(
    '/api/deleteItem',
    [authJwt.verifyToken],
    // authJwt.isAdmin],
    controller.deleteItem
  )
  
  app.post(
    '/api/orders/prep',
    controller.prepOrder
  )
  app.post(
    '/api/orders/make',
    controller.createOrder
  )
  app.get('/api/orders/:transactionId',
    controller.getOrder)

};