import { mongooseConnect } from '@/lib/mongoose'
import { Order } from '@/models/Order'
import { Product } from '@/models/Product'

const mercadopago = require('mercadopago')
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
})

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request')
    return
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts
  } = req.body
  await mongooseConnect()
  const productsIds = cartProducts
  const uniqueIds = [...new Set(productsIds)]
  const productsInfos = await Product.find({ _id: uniqueIds })

  const lineItems = []
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId)
    const quantity = productsIds.filter(id => id === productId)?.length || 0
    if (quantity > 0 && productInfo) {
      lineItems.push({
        items: [{
          title: productInfo.title,
          currency_id: 'ARS',
          unit_price: quantity * productInfo.price,
          quantity
        }]
      })
    }
  }

  const orderDoc = await Order.create({
    lineItems,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false
  })

  const session = await mercadopago.preferences.create(lineItems, {
    payer: {
      first_name: name
    },
    address: {
      street_name: streetAddress,
      zip_code: postalCode
    },
    metadata: { orderId: orderDoc._id.toString(), test: 'ok' }
  })

  res.json(session.response)
}
