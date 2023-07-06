import React, { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Button from './atoms/Button';
const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};
const erroroccured = (error) => {
  console.log(error)
}

const Paymentform = ({ progrsspercent, setProgressPercent }) => {
  return (
    <div>

     <div className='m-auto items-center  w-1/3'>
     <PayPalScriptProvider options={initialOptions} >
     <PayPalButtons onError={erroroccured} />
     </PayPalScriptProvider>
     </div>


      <div className='flex my-2 justify-between'>
        <div onClick={() => setProgressPercent(50)}>
          <Button text={"Go back"} />
        </div>
        <div> </div>
      </div>
      
    </div>
  )
}

export default Paymentform
