const config = require('../config/db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.db,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
        },
        logging: false
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = require("./product.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.orderHold = require("./orderHold.model.js")(sequelize, Sequelize);

db.user = require("./user.model.js")(sequelize, Sequelize)

db.user.hasMany(db.order)
db.order.belongsTo(db.user)

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;