import Featured from '@/components/Featured'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default function Home ({ product }) {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  )
}

export async function getServerSideProps () {
  // 6500d5ee16b64d7f4bd4f698
  const featuredProductId = '6500d5ee16b64d7f4bd4f698'
  await mongooseConnect()
  const product = await Product.findById(featuredProductId)
  return {
    props: { product: JSON.parse(JSON.stringify(product)) }
  }
}
