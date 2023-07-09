import React, { useState, useEffect } from 'react'
import Button from './atoms/Button'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import app from './firebase'
import Cart from './Cart';
import { motion } from 'framer-motion';
import SearchProduct from './SearchProduct';

const Header = ({ products }) => {
  const router = useRouter()
  const [toggle, setToggle] = useState(true)

  const menu = () => { setToggle(!toggle) }

  const [signedin, setSignedin] = useState(false)
  const [profilepic, setprofilepic] = useState('https://i.pinimg.com/originals/77/45/a4/7745a4b9d2ec499547f049b42fb57a9f.jpg')
  const [dp, setdp] = useState(false)
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (user.photoURL) { setprofilepic(user.photoURL) }
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

      <motion.div initial={{ scale: 0 }} exit={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, duration: 0.6, delay: 0.1, scale: 2 }}>
        <Cart opencart={opencart} products={products} setOpenCart={setOpenCart} />
      </motion.div>

      <nav className='px-36 hidden  justify-between items-center w-full py-4 bg-white lg:flex  gap-x-20 shadow-md'>

        <div>
          <Link href={'/'}>
            <img className='h-16 w-16' src="https://ik.imagekit.io/cmef8hxb6/Modern_Blue_Medicine_Center_Hospital_Logo-removebg-preview_Q9fZEGjK-.png?updatedAt=1688294045078" alt="Logo" />
          </Link>
        </div>

        <div className='flex justify-between items-center '>
          <ul className='flex list-none font-medium items-center
           justify-between gap-x-10'>
            <li className='ml-32'>
              <SearchProduct data={products} />
            </li>
          </ul>
        </div>

        {
          signedin ?
            <div className='flex items-center  gap-x-4'>
            <button onClick={() => { setOpenCart(!opencart) }} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span className='mx-3'>Cart</span>
           </button>
              <div  >
                <div onClick={() => { setdp(!dp) }}>
                  <img className='h-12 mx-4 cursor-pointer w-12 rounded-full ' src={profilepic} alt="profile pic" />
                </div>

                {dp ?
                  <motion.div initial={{ scale: 0 }} exit={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, duration: 0.6, delay: 0.1, scale: 2 }} className='absolute bg-white shadow-lg rounded-md px-10 py-4 translate-x-[-20px] z-40'>
                    <button onClick={signoutme}>Logout</button>
                  </motion.div> : <div></div>
                }

              </div>
            </div>
            :

            <div className='flex items-center  gap-x-4'>
              <button onClick={() => { setOpenCart(!opencart) }} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className='mx-3'>Cart</span>
              </button>
              <Link href={'/login'} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span className='mx-3'>hello, Login</span>
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
                <svg fill="#3fb5eb" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[#0E2954]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              :
              <button onClick={menu}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[#0E2954]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          }
        </div>

      </nav>
      {
        !toggle ?
          <motion.div initial={{ y: -100 }} exit={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, duration: 0.6, delay: 0.1, scale: 2 }} className='bg-white z-50 absolute  w-full shadow-md items-center lg:hidden text-center'>
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
          </motion.div> : <div></div>

      }

      <div>

      </div>
    </div>
  )
}

export default Header
