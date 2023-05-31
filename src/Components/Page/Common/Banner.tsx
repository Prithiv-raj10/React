import React from 'react'
import  "./banner.css";
function Banner() {
  return (
    <div className="custom-banner">
      <div
        className="m-auto d-flex align-items-center"
        style={{
          width: "400px",
          height: "50vh",
        }}
      >
          <span style={{ marginRight:"120px" ,color:"white"}}>
            <h1>Welcome To <b className='text-info'>Hire Car !</b> </h1>
          </span>
        </div>
      </div>
    // </div>
  )
}

export default Banner