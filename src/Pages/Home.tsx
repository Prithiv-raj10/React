import React from 'react'
import { CarItemList } from '../Components/Page/CarLists'


function Home() {
  return (
    <div>
        <div className='container p-2'>
            <CarItemList />
        </div>
    </div>
  )
}

export default Home