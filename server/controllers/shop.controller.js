var nodemailer = require('nodemailer');
var db = require("../models");
var User = db.user;
var Op = db.Sequelize.Op;
var Product = db.product
var Order = db.order
var OrderHold = db.orderHold

exports.getShop = async (req, res) => {
  const op = req.body.op

  const shop = async () => {
    const shop = await Product.findAll({
      order: ['sku'],
      where: {
        stock: {
          [Op.not]: 0
        }
      }
    })
    return res.status(200).json({rows: shop})
  }
  const inventory = async () => {
    const shop = await Product.findAll({
      order: ['sku']
    })
    return res.status(200).json({rows: shop})
  }
  const stock = () => {
    if (op === 'shop') {
      shop()
    } else {
      inventory()
    }
  }
  return stock()
}
exports.getImages = async (req, res) => {
  const sku = req.params.sku
  const item = await Product.findOne({ where: { sku: sku } })
  if (!item) { return res.status(404).send({err: 'Sku not found'})}
  
  return res.status(200).send({images: item.images})
}
exports.getItem = async (req, res) => {
  const prodId = req.body.prodId
  const product = isNaN(prodId) ? 
    await Product.findOne({ where: { sku: prodId } })
  : await Product.findOne({ where: { id: prodId } })
  return res.status(200).send({ prod: product})

}
exports.getItems = async (req,res) => {
  const items = await Product.findAll({ 
    where: {
      sku: { [Op.in]: req.body.items}
    }
  })
  return res.status(200).send({items: items})
}
exports.addItem = async (req, res) => {
  const { sku, title, desc, price, stock, weight, cat, images} = req.body
  const oldItem = await Product.findOne({ where: { sku: sku } })
  if (oldItem) { return res.status(403).send({added: false, err: 'Sku Already Exits.', message:'shit'}) }
  else {
    await Product.create({
      sku: sku, 
      title: title, 
      desc: desc, 
      price: price, 
      stock: stock,
      images: images
    })
    return res.status(200).send({added:true, message: 'Sku created'})
  }
}
exports.editItem = async (req, res) => {  
  const {id, sku, price, title, desc, stock} = req.body.newInfo
  const newImages = req.body.newImages
  const delImages = req.body.delImages

  const item = await Product.findOne({ where: { id: id } })
  if (!item) { return res.status(401).send({ edited: false, err:`Can't Find Item (weird)`, message:'shitd'})}
  
  if (sku !== item.sku ) {
    const oldSku = await Product.findOne({sku: sku})
    if (oldSku) {
      return res.status(403).send({ edited: false, message: 'Sku Already Exits'})
    } else {
      item.sku = sku;
    }
  }
  
  let imageList = item.images
  if(delImages.length){
    let q = [...delImages]
    while (q.length) {
      let n = q.shift()
      imageList = imageList.filter(img => img !== n)
    }
  }
  
  const images = imageList ? [...imageList, ...newImages] : [...item.images, ...newImages]
  const updated = await Product.update({
      sku: sku, 
      price: price,
      title: title,
      desc: desc,
      stock: stock,
      images: images
    },{ where: { id: id } })

  return res.status(200).send({ edited: true, message:`${sku} has been updated`})
}

exports.deleteItem = async (req,res) => {
  const sku = req.body.sku;
  await Product.destroy({ where: { sku: sku } })
  return res.status(200).send({removed: true})
}
exports.prepOrder = async (req, res) => {
  const itemList = req.body.items
  const userId = req.body.userId
  const holdId = req.body.holdId 

  const items = []
  for (let i=0, len=itemList.length; i < len; i++) {
    const item = await Product.findOne({ where: {sku: itemList[i]}})
    let hold = await OrderHold.findOne({ where: {sku: itemList[i]}})

    if (hold) {
      if ( hold.holdId != holdId ) { 
        if (Date.now() - hold.createdAt > 900000) { 
          OrderHold.destroy({sku: hold.sku})
          hold = await OrderHold.create({
              sku: itemList[i],
              holdId: holdId
            })
          items.push(item)
        } else {
          return res.status(400).send({message: `Oh no! Someone snagged an item first`});
        }

      } else {
        items.push(item)
      }
    } else {
      if (item.stock > 0) {

        hold = await OrderHold.create({
          sku: itemList[i],
          holdId: holdId
        })
        items.push(item)

      } else {

        return res.status(400).send({message: `Oops, something is sold out`});

      }
    }
  } 
  return res.status(200).send({items, holdId})
}
exports.createOrder = async (req, res) => {
  
  const transactionId = req.body.transactionId
  const total = req.body.total
  const userId = req.body.userId
  const name = req.body.name
  const items = req.body.items
  const holdId = req.body.holdId
  
  const beleted = await OrderHold.destroy({ where: { holdId: holdId }})

  const order = await Order.create({
    transactionId: transactionId,
    total: total,
    name: name,
    items: items,
    userId: userId
  })
  items.forEach(async sku => {
    await Product.decrement('stock', {where: { sku: sku }})
  })

  return res.status(200).send({ order })

}
exports.getOrder = async(req,res) => {
}
exports.contactMe = async (req,res) => {
  const transporter = nodemailer.createTransport({
    port: 587,
    host: 'smtp.gmail.com',
      auth: {
        user: 'asleepiesceramics', 
        pass: process.env.GMAIL_PASS
      }
  })

  const mailData = {
    from: req.body.fromEmail,
    to: 'contact@asleepiesceramics.com',
    subject: req.body.fromSubject,
    text: req.body.fromBody,
    html: `<p>From: ${req.body.fromName} ${req.body.fromEmail}</p>\n
      <p>Message: ${req.body.fromBody}</p>`
  }

  transporter.sendMail(mailData, function (err, info) {
    if(err) {
      console.log(err) 
    } else {
      return res.status(200).send({messageId: info.messageId})
    }
 })
}