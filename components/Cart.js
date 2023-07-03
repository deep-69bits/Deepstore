import React, { useState } from 'react'
import Button from './atoms/Button'

const Cart = ({opencart,setOpenCart}) => {
     
    
    return (
        <div className={opencart?'block transition-all duration-300 ':'hidden transition-all duration-300'}>
        <div className='z-50 px-7 py-5 shadow-2xl transition-all duration-300  h-screen bg-white w-[500px]  right-0 fixed flex flex-col justify-between'>

            <div>
                <div className='flex justify-between'>
                    <button onClick={(e)=>{setOpenCart(!opencart)}} >
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[#3fb5eb]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div></div>
                </div>
            </div>

            <div>
                <hr className='my-4' />
                <div className='grid grid-flow-row grid-cols-1'>
                    <div className='flex justify-between px-3 py-4'>
                        <h2 className='text-xl '>Subtotal amount</h2>
                        <h4 className='text-xl'>69</h4>
                    </div>
                    <Button text={'Checkout'} className="text-center" />
                </div>
            </div>

        </div>
        </div>
    )
}

export default Cart
