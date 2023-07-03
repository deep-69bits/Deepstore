import React, { useState, useEffect } from 'react'
import Button from './atoms/Button'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import app from '../components/firebase'
import Cart from './Cart';
const Header = () => {
  const router = useRouter()
  const [toggle, setToggle] = useState(true)

  const menu = () => { setToggle(!toggle) }

  const [signedin, setSignedin] = useState(false)
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setSignedin(true)
      }
    });
  }, [])

  const signoutme = async () => {
    signOut(auth).then(() => {
      router.push('/login')
    }).catch((error) => {
    });
  }
  const [opencart, setOpenCart] = useState(false)

  return (
    <div>

      <Cart opencart={opencart} setOpenCart={setOpenCart}/>

      <nav className='px-36 hidden  justify-between items-center w-full py-4 bg-white lg:flex  gap-x-20 shadow-md'>

        <div>
          <Link href={'/'}>
            <img className='h-16 w-16' src="https://ik.imagekit.io/cmef8hxb6/Modern_Blue_Medicine_Center_Hospital_Logo-removebg-preview_Q9fZEGjK-.png?updatedAt=1688294045078" alt="Logo" />
          </Link>
        </div>

        <div className='flex justify-between items-center '>
          <ul className='flex list-none font-medium justify-between gap-x-10'>
            <li className='hover:text-[#3fb5eb] cursor-pointer'>
              <Link href={'/'}>
                Home
              </Link>
            </li>
          </ul>
        </div>

        {
          signedin ?
            <div className='flex items-center  gap-x-4'>
              <button onClick={()=>{setOpenCart(!opencart)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
              <div onClick={signoutme} >
                <Button className="mx-3" text={"Logout"} />
              </div>
            </div>
            :

            <div className='flex items-center  gap-x-4'>
              <button onClick={()=>{setOpenCart(!opencart)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
              <Link href={'/login'}>
                <Button className="mx-3" text={"LogIn"} />
              </Link>
              <Link href={'/signup'}>
                <Button className="mx-3" text={"SignUp"} />
              </Link>
            </div>
        }
      </nav>

      <nav className='lg:hidden py-4 bg-white flex justify-between px-14 shadow-md items-center'>

        <div>
          <Link href={'/'}>
            <img className='h-16 w-16' src="https://ik.imagekit.io/cmef8hxb6/Modern_Blue_Medicine_Center_Hospital_Logo-removebg-preview_Q9fZEGjK-.png?updatedAt=1688294045078" alt="logo" />
          </Link>
        </div>

        <div>
          {
            toggle ?
              <button onClick={menu}>
                <svg fill="#3fb5eb" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#3fb5eb]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              :
              <button onClick={menu}>
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#3fb5eb]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          }
        </div>

      </nav>
      {
        !toggle ?
          <div className='bg-white shadow-md items-center lg:hidden text-center'>
            <ul className='font-medium'>
              <Link href={'/'}>
                <li className='hover:text-[#3fb5eb] py-2 cursor-pointer'>Home</li>
              </Link>
              {
                signedin ?
                  <div>
                    <div onClick={signoutme} >
                      <Button className="mx-3 block w-[80%] my-3" text={"Logout"} />
                    </div>
                  </div>
                  :
                  <div>
                    <Link href={'/login'}>
                      <Button className="mx-3 block w-[80%] my-3" text={"LogIn"} />
                    </Link>
                    <Link href={'/signup'}>
                      <Button className="mx-3 block w-[80%] my-3" text={"SignUp"} />
                    </Link>
                  </div>
              }
            </ul>
          </div> : <div></div>

      }

      <div>

      </div>
    </div>
  )
}

export default Header
