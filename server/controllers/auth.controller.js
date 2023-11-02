const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  .then(user => {
    return res.status(200).send({ message: "User was registered successfully!" })
  })
  //     if (req.body.roles) {
  //       Role.findAll({
  //         where: {
  //           name: {
  //             [Op.or]: req.body.roles
  //           }
  //         }
  //       })
  //       .then(roles => {
  //         user.setRoles(roles).then(() => {
  //           res.send({ message: "User was registered successfully!" });
  //         });
  //       });
  //     } 
  //     else {
  //       // user role = 1
  //       user.setRoles([1]).then(() => {
  //         res.send({ message: "User was registered successfully!" });
  //       });
  //     }

  //   })
  //   .catch(err => {
  //     res.status(500).send({ message: err.message });
  //   });
};

exports.signin = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: {
        [Op.iLike] : req.body.email
    }
  }})
  if (!user) {
    return res.status(404).send({ok: false, message: "User Not found." });
  }

  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  
  if (!passwordIsValid) {
    return res.status(401).send({
      ok: false,
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 86400 // 24 hours
  });

  return res.status(200).send({
    ok: true,
    id: user.id,
    username: user.username,
    email: user.email,
    accessToken: token,
    loggedIn: Date.now()
  });
};

exports.adminSignIn = (req, res) => {
  const input = req.body.pass
  const pass = process.env.ADMIN_PASS 
  if (input !== pass) {
    return res.status(401).send({
      ok: false,
      accessToken: null,
      message: "Invalid Password!"
    })
  }
  const token = jwt.sign({ id: 'admin' }, process.env.SECRET, {
    expiresIn: 86400 // 24 hours
  });
  return res.status(200).send({
    ok: true,
    accessToken: token,
    loggedIn: Date.now()
  });
}