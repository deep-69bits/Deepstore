import React, { useState, useEffect } from 'react'
import Button from './atoms/Button'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import app from '../components/firebase'
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

  return (
    <div>
    
      <nav className='px-36 hidden  justify-between items-center w-full py-4 bg-white lg:flex  gap-x-20 shadow-md'>

        <div>
          <Link href={'/'}>
            <img className='h-16 w-16' src="./Logo.png" alt="logo" />
          </Link>
        </div>

        <div className='flex justify-between items-center '>
          <ul className='flex list-none justify-between gap-x-10'>
            <li className='hover:text-[#3fb5eb] cursor-pointer'>Medicine</li>
            <li className='hover:text-[#3fb5eb] cursor-pointer'>Health Care</li>
            <li className='hover:text-[#3fb5eb] cursor-pointer'>Health Blogs</li>
          </ul>
        </div>

        {
          signedin ?
            <div>
              <div onClick={signoutme} >
                <Button className="mx-3" text={"Logout"} />
              </div>
            </div>
            :

            <div>
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
            <img className='h-16 w-16' src="./Logo.png" alt="logo" />
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
                <svg  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#3fb5eb]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          }
        </div>

      </nav>
      {
        !toggle?
        <div className='bg-white shadow-md items-center lg:hidden text-center'>
         <ul >
         <li className='hover:text-[#3fb5eb] py-2 cursor-pointer'>Medicine</li>
         <li className='hover:text-[#3fb5eb] py-2 cursor-pointer'>Health Care</li>
         <li className='hover:text-[#3fb5eb] py-2 cursor-pointer'>Health Blogs</li>
         </ul>
        </div>:<div></div>

      }

      <div>

      </div>
    </div>
  )
}

export default Header
