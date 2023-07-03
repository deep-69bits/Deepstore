import React from 'react'
import Link from 'next/link'
const Productcard = ({name,image,id,price}) => {

  return (
    <div className='py-4 px-5 h-[240px] border-[1px] border-[#afc8d4] hover:border-[#07b0ff] cursor-pointer rounded-xl '>
      <Link href={'/product/'+id}>
      <img className='h-[120px] w-[120px] m-auto' src={image} alt="" />
      {
        name.lenght>20?
        <h3 className='text-xl py-2'>{name}</h3>
        :
        <h3 className='text-xl py-2'>{name.substring(0, 40)+'...'}</h3>
      }
      <h3 className='text-lg font-medium py-2'>MRP &#8377;{price}</h3>
      </Link>
    </div>
  )
}

export default Productcard
