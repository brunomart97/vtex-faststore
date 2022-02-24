import React from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import './temporary-shelf.scss'

interface TemporaryShelfProps {
  products: ProductSummary_ProductFragment[]
}

function TemporaryShelf({ products }: TemporaryShelfProps) {
  return (
    <div className="temporary-shelf-container">
      <div className="temporary-time-box">
        <h3>Limited Time Offer</h3>
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
