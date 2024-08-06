import React from 'react'
import './binpacking.css'
import LeftCard from '../../Components/LeftCard/LeftCard'
import RightCard from '../../Components/RightCard/RightCard'
import PackageProvider from '../../Components/PackageProvider/PackageProvider'

const BinPacking = () => {
  return (
    <PackageProvider>
      <div className="container">
        <div className='rightcard'>
          <RightCard />
        </div>
        <div className='leftcard'>
          <LeftCard />
        </div>
      </div>
    </PackageProvider>
  )
}

export default BinPacking
