import React from 'react'
import './binpacking.css'
import LeftCard from '../../Components/LeftCard/LeftCard'
import RightCard from '../../Components/RightCard/RightCard'
import PackageProvider from '../../contexts/PackageProvider/PackageProvider'
import ItemProvider from '../../contexts/ItemProvider/ItemProvider'

const BinPacking = () => {
  return (
    <PackageProvider>
      <ItemProvider>
        <div className="container">
          <div className='rightcard'>
            <RightCard />
          </div>
          <div className='leftcard'>
            <LeftCard />
          </div>
        </div>
        </ItemProvider>
    </PackageProvider>
  )
}

export default BinPacking
