import React from 'react'
import Cart from './Cart'
import Footer from './Footer'
import Header from './Header'
import Seo from './Seo'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";





const Layout = ({children,products}) => {
    
  return (
    <div>
    <Seo/>
    <div className='absolute'>
    </div>
    <div className='min-h-screen bg-white flex flex-col justify-between'>
    <Header products={products}/>
    {children}
    <Footer/>
    </div>
    </div>
  )
}


export default Layout
