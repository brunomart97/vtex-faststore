import React, { useState, useEffect } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import './temporary-shelf.scss'

interface TemporaryShelfProps {
  products: ProductSummary_ProductFragment[]
  hours: number
  minutes: number
}

function TemporaryShelf({ products, hours, minutes }: TemporaryShelfProps) {
  const [hoursTime, setHoursTime] = useState(hours)
  const [minutesTime, setMinutesTime] = useState(minutes)
  const [secondsTime, setSecondsTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsTime((currentSecond) => currentSecond - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (secondsTime === 0) {
    setMinutesTime((currentMinute) => currentMinute - 1)
    setSecondsTime(59)
  }

  if (minutesTime === 0 && secondsTime === 0) {
    setHoursTime((currentHour) => currentHour - 1)
    setMinutesTime(59)
  }

  return (
    <div className={`temporary-shelf-container ${hoursTime >= 0 && 'visible'}`}>
      <div className="temporary-time-box">
        <h3>Limited Time Offer</h3>
        <div className="counter">
          <span>{hoursTime < 10 ? `0${hoursTime}` : hoursTime}:</span>
          <span>{minutesTime < 10 ? `0${minutesTime}` : minutesTime}:</span>
          <span>{secondsTime < 10 ? `0${secondsTime}` : secondsTime}</span>
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
