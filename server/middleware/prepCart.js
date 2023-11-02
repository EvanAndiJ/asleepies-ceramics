const db = require("../models");
const Product = db.product
const OrderHold = db.orderHold

checkItems = (req, res, next) => {
  const items = req.body.items
  const userId = req.body.userId
  let total = 0;

  items.forEach(item => {

    Product.findOne({
      where: {
        id: item.productId
      }
    }).then(sku => {
      if (!sku.stock) {
        res.status(400).send({ message: `Oops, I'm out of something` })
        return;
      }

      OrderHold.findOne({
        where: {
          productId: sku.id
        }
      }).then(hold => {
        if (hold) {
          if (hold.userId === userId) {
            OrderHold.destroy({
              where:{
                id: hold.id
              }
            })
          } else {
            res.status(400).send({ message: `Oh no! Someone snagged an item first` });
            return;
          }
        }

        OrderHold.create({
          productId: item.productId,
          userId: userId
        })
        total += item.price
      })
    })
  })

  next()
}


const prepCart = {
  checkItems: checkItems
};
module.exports = prepCart;