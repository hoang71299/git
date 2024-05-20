import React from 'react'

function Error({error }) {
  function renderError(){
    if(Object.keys(error).length >0){
      return Object.keys(error).map((key,index)=>(
        <p className='text-danger' key={index}>{error[key]}</p>
      ))
    }
  }
  return (
    <div>
      {renderError()}
    </div>
  )
}

export default Error