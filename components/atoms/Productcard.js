import React from 'react'
import Link from 'next/link'
const Productcard = ({name,image,id,price}) => {

  return (
    <div className='py-10  h-auto px-10 border-[1px] border-[#afc8d4] hover:border-[#07b0ff] cursor-pointer rounded-xl '>
      <Link href={'/product/'+id}>
      <img className='h-40 w-80 m-auto' src={image} alt="" />
      {
        name.lenght>20?
        <h3 className='text-2xl py-8'>{name}</h3>
        :
        <h3 className='text-2xl py-2'>{name.substring(0, 40)+'...'}</h3>
      }
      <h3 className='text-2xl py-2'>MRP &#8377;{price}</h3>
      </Link>
    </div>
  )
}

export default Productcard
