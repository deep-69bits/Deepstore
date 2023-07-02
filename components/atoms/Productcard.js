import React from 'react'
import Link from 'next/link'
const Productcard = ({name,image,id,price}) => {

  return (
    <div className='py-2 px-3 border-[1px] border-[#afc8d4] hover:border-[#07b0ff] cursor-pointer rounded-xl '>
      <Link href={'/product/'+id}>
      <img src={image} alt="" />
      <h3 className='text-2xl'>{name}</h3>
      <h3>MRP &#8377;{price}</h3>
      </Link>
    </div>
  )
}

export default Productcard
