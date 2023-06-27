import React from 'react'

const Button = ({text,className}) => {
  return (
    <div className={className +' bg-[#3fb5eb] text-white rounded-md inline-block cursor-pointer px-4 py-2'}>
      {text}
    </div>
  )
}

export default Button
