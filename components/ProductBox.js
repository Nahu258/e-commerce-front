import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`

const ProductInfoBox = styled.div`
  margin-top: 5px;
`

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`

export default function ProductBox (props) {
  const url = '/product/' + props._id
  return (
    <div>
      <WhiteBox href={url}>
        <div>
          <img src={props.images[0]} alt='' />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{props.title}</Title>
        <PriceRow>
          <Price>${props.price}</Price>
          <Button $primary $outline>Add to cart</Button>
        </PriceRow>
      </ProductInfoBox>
    </div>
  )
}