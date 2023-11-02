module.exports = (sequelize, Sequelize) => {
    const OrderHold = sequelize.define("order_holds", {
      sku: { type: Sequelize.STRING },
      holdId: { type: Sequelize.STRING },

    });
    return OrderHold;
  };
