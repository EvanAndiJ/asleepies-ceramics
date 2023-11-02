
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      transactionId: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      total: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      items: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    });
    return Order;
}
