import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Seo from './Seo'
const Layout = ({children}) => {
  return (
    <div>
    <Seo/>
    <div className='min-h-screen bg-white flex flex-col justify-between'>
    <Header/>
    {children}
    <Footer/>
    </div>
    </div>
  )
}

export default Layout
