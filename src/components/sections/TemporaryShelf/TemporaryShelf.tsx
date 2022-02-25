import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import './temporary-shelf.scss'

interface TemporaryShelfProps {
  products: ProductSummary_ProductFragment[]
  hours: number
  minutes: number
  seconds: number
}

function TemporaryShelf({
  products,
  hours,
  minutes,
  seconds,
}: TemporaryShelfProps) {
  return (
    <div className="temporary-shelf-container">
      <div className="temporary-time-box">
        <h3>Limited Time Offer</h3>
        <div className="counter">
          <span>{hours < 10 ? `0${hours}` : hours}:</span>
          <span>{minutes < 10 ? `0${minutes}` : minutes}:</span>
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
      </div>
      <ul className="temporary-shelf-subcontainer">
        {products.map((product) => (
          <li key={product.id}>
            <a href={`${product.slug}/p`} className="temporary-card-container">
              <img
                src={product.image[0].url}
                alt={product.image[0].alternateName}
              />
              <span className="temporary-card-title">
                {product.isVariantOf.name}
              </span>
              <p className="temporary-card-price">
                $ {product.offers.lowPrice}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TemporaryShelf
