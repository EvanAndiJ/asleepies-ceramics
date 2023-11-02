module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      sku: {
        type: Sequelize.STRING,
        unique: true
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      title: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      cat: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      }
    });
    return Product;
  };
