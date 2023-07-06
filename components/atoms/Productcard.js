import React from 'react'
import Link from 'next/link'
const Productcard = ({name,image,id,price}) => {

  return (
    <a href={'/product/'+id} className=" group relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
      <img className="object-cover scale-90 group-hover:scale-100 duration-500 transition-all " src={image} alt="product image" />
      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">&#8377;40 OFF</span>
    </a>
    <div className="mt-4 px-5 pb-5">
      <a href="#">
        <h5 className="text-xl tracking-tight text-slate">{name.substring(0,20)}...</h5>
      </a>
      <div className="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span className="text-3xl font-bold text-slate-900">&#8377;{price}</span>
          <span className="text-sm text-slate-900 line-through">&#8377;{price+40}</span>
        </p>
        <div className="flex items-center">
         
          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
        </div>
      </div>
      <a href={'/product/'+id} className="flex items-center justify-center rounded-md bg-[#3fb5eb] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg  className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Checkout</a>
    </div>
  </a>
  )
}

export default Productcard
