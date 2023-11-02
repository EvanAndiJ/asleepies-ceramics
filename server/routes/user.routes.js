const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/api/users/orderHistory',
    controller.orderHistory
  )
  app.post('/api/users/updateInfo',
    [authJwt.verifyToken],
    controller.updateInfo
  )
  app.post('/api/users/updatePassword',
    [authJwt.verifyToken],
    controller.updatePassword
  )
  app.post('/api/users/delete',
    [authJwt.verifyToken],
    controller.deleteUser
  )
  app.post('/api/carts', 
    [authJwt.verifyToken],
    controller.getCart
  );
  
  app.post('/api/carts/add', 
    [authJwt.verifyToken],
    controller.addToCart
  );

  app.post('/api/carts/remove', 
    [authJwt.verifyToken],
    controller.removeFromCart
  );
};