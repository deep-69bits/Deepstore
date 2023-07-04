import React, { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const initialOptions = {
  clientId: "AWPvx1KZscWQ4P7Nbfq0q1T6RYcu9Ebyupu5QG74Xx4MqY6jK2PQI3IYCo_woN3DO4nYFLrlTv-a3__E",
  currency: "USD",
  intent: "capture",
};
const erroroccured=(error)=>{
  console.log(error)
}

const Paymentform = ({progrsspercent, setProgressPercent}) => {
  return (
    <div>
    <PayPalScriptProvider options={initialOptions} >
    <PayPalButtons onError={erroroccured} />
     </PayPalScriptProvider>
    </div>
  )
}

export default Paymentform
