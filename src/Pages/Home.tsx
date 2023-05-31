import React from 'react'
import { CarItemList } from '../Components/Page/Home'
import { Banner } from '../Components/Page/Common'


function Home() {
  return (
    <div>
        <Banner />
        <div className='container p-2'>
            <CarItemList />
        </div>
    </div>
  )
}

export default Home