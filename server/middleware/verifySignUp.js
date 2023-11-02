const db = require('../models')
// const ROLES = db.ROLES
const User = db.user;
const Op = db.Sequelize.Op
checkDuplicateUserEmail = (req, res, next) => {
    
    User.findOne({
        where: {
            email:{
                [Op.iLike]: req.body.email
            } 
        }
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: "Email already registered"});
        }
        next();
    })
    // })
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUserEmail: checkDuplicateUserEmail,
    checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;