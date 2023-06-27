import React from 'react'
import Button from './atoms/Button'
import Link from 'next/link'
const Header = () => {
  return (
    <div>
     <nav className='px-36 fixed justify-between items-center w-full py-4 bg-white flex gap-x-20 shadow-md'>

      <div>
        <img  className='h-16 w-16' src="./Logo.png" alt="logo" />
      </div> 

      <div className='flex justify-between items-center '>
        <ul  className='flex list-none justify-between gap-x-10'>
          <li className='hover:text-[#3fb5eb] cursor-pointer'>Medicine</li>
          <li className='hover:text-[#3fb5eb] cursor-pointer'>Health Care</li>
          <li className='hover:text-[#3fb5eb] cursor-pointer'>Health Blogs</li>
        </ul>
      </div>

      <div>
        <Link href={'/login'}>
        <Button className="mx-3" text={"LogIn"}/>
        </Link>
        <Link href={'/signup'}>
        <Button className="mx-3" text={"SignUp"}/>
        </Link>
      </div>

     </nav>
     <div>
      
     </div>
    </div>
  )
}

export default Header
