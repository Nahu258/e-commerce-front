import { mongooseConnect } from '@/lib/mongoose'
import { Order } from '@/models/Order'
import mercadopago from 'mercadopago'

export default async function handler (req, res) {
  await mongooseConnect()
  const payment = req.query

  try {
    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment['data.id'])

      // Update database to confirm the payment
      const orderId = data.body.metadata.order_id
      const paid = data.body.status === 'approved'
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true
        })
      }
    }

    res.send(204)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}
