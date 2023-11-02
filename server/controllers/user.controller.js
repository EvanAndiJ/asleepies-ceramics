
var db = require("../models");
var User = db.user;
var Order = db.order
var Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');


exports.updateInfo = async (req, res) => {
  const userId = req.body.userInfo.id
  const user = await User.findOne({
    where: {
      id: userId
    }
  })
  if (!user) { return res.status(400).send({message: 'User not found'})}

  const oldUsername = user.username;
  const newUser = req.body.username;
  
  const oldEmail = user.email;
  const newEmail = req.body.email;
      
  const updateInfo = async (newStuff) => {
    const [u,e] =  newStuff
    return await User.update({ username: u, email: e },
      { where: { id: userId } }
    )
  };
  let toUpdate = [];
  toUpdate.push(oldUsername != newUser ? newUser : oldUsername);
  toUpdate.push(oldEmail != newEmail ? newEmail : oldEmail);
  updateInfo(toUpdate)
  return res.status(200).send({message: 'success', ok: true});
}
exports.updatePassword = async (req, res) => {
  const userId = req.body.userInfo.id
  const user = await User.findOne({
    where: {
      id: userId
    }
  })
  if (!user) { return res.status(400).send({ message: 'User not found', ok: false})}
  const prevP = req.body.prevPass
  const newP = req.body.newPass
  const isValid = bcrypt.compareSync(
    prevP,
    user.password
  )
  if (!isValid) {
    return res.status(401).send({ message:'Previous Password Incorrect!', ok: false})
  } else {
    User.update({ password: bcrypt.hashSync(newP, 8) },
      { where: { id: userId } }
    )
    return res.status(200).send({message:'Pasword successfully updated!', ok: true})
  }
  
}
exports.orderHistory = async (req, res) => {
  const user = await User.findOne({ where: {email: req.body.email} })
  if (!user) { return res.status(400).send({message: 'User not found'})}
  
  const orders = await Order.findAll({ where: { userId: user.id }})
  return res.status(200).send({orders})
}
exports.deleteUser = async (req, res) => {
  const userInfo = req.body.userInfo
  const userId =  req.body.userInfo.id
  
  const user = await User.findOne({
    where: {
      id: userId
    }
  })
  if (!user) { return res.status(400).send({message: 'User not found'})}

  const password = req.body.password
  const isValid = bcrypt.compareSync(
    password,
    user.password
  )
  if (!isValid) { 
    return res.status(401).send({message:'Password Incorrect!'})
  }
  User.destroy({ where: { id: userId }, cascade:true })
  
  return res.status(200).send({message: 'Account deleted-_-'});
  
}

exports.getCart = async (req, res) => {
  // const cartId = req.body.cartId
  
  // CartItem.findAll({
  //   where: {
  //     cartId: cartId
  //   }
  // })
  // .then(async cartItems => { if (cartItems.length) {
  //   const ids = cartItems.map(i=>i.productId)
  //   const productItems = await Product.findAll({
  //     where: {
  //       id: {
  //         [Op.or]: ids
  //       }
  //     }
  //   })
  //   return res.status(200).send({cartItems: cartItems, productItems:productItems})
  // } else {
  //   return res.status(200).send({cartItems: [], productItems: []})
  // }

  // })
}
exports.addToCart = (req, res) => {
  // const userId = req.body.userId;
  // const cartId = req.body.cartId;
  // const productId = req.body.productId;
  // const price = req.body.price;

  // Cart.findOne({ where: {id: cartId}}).then(async cart => {
  //   if (!cart) {
  //     const newCart = await Cart.create({total: 0, count: 0, userId: userId});
  //     cartId = newCart.id;
  //   }
  //   CartItem.findAll({ where: {cartId: cartId} }).then( async items => {
  //     if (items.length) {
  //       const dupCheck = await items.filter(i => i.productId === productId)
  //       if (dupCheck.length) {
  //         return res.status(401).send({ message: 'Item already in cart.' })
  //       } 
  //     } 
  //     const cartItem = await CartItem.create({productId: productId, cartId: cartId})
  //     const cart = await Cart.findOne({ where: { id: cartId } })
  //     cart.increment('total', { by: price })
  //     cart.increment('count')
  //     return res.status(200).send({message:`Added to cart`, cartItem: cartItem})
  //   })
  // })
}
exports.removeFromCart = async (req, res) => {
  
  // const cartId = req.body.cartId
  // const productId = req.body.productId
  
  // await CartItem.destroy({ 
  //   where: {
  //     productId: productId, 
  //     cartId: cartId
  // }})
  // const item = await Product.findOne({ where: { id: productId }})
  // const cart = await Cart.findOne({ where: { id: cartId }})
  // cart.decrement('count')
  // cart.decrement('total', {by: item.price})
  // return res.status(200).send({
  //   message: `Item removed from cart`, newTotal: cart.total-item.price})
}
