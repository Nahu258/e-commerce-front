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

  const items = []
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId)
    const quantity = productsIds.filter(id => id === productId)?.length || 0
    if (quantity > 0 && productInfo) {
      items.push(
        {
          title: productInfo.title,
          currency_id: 'ARS',
          unit_price: quantity * productInfo.price,
          quantity
        }
      )
    }
  }

  const orderDoc = await Order.create({
    items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false
  })

  const session = await mercadopago.preferences.create({
    items,
    payer: {
      first_name: name,
      email
    },
    address: {
      street_name: streetAddress,
      zip_code: postalCode
    },
    metadata: { orderId: orderDoc._id.toString(), test: 'ok' },
    back_urls: {
      success: process.env.PUBLIC_URL + '/cart?success=1',
      failure: process.env.PUBLIC_URL + '/cart?failure=1'
    },
    auto_return: 'all'
  })

  res.json(session.body)
}
