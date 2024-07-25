import React from 'react'
import './binpacking.css'
import LeftCard from '../../Components/LeftCard/LeftCard'
import RightCard from '../../Components/RightCard/RightCard'
const BinPacking = () => {
  return (
    <div className="container">
      <div className='rightcard'>
        <RightCard />
      </div>
      <div className='leftcard'>
        <LeftCard />
      </div>
    </div>
  )
}

export default BinPacking
