import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Seo from './Seo'




const Layout = ({ children, products }) => {

  return (
    <div className='max-w-[2000px] m-auto'>
      <Seo />
      <div className='absolute'>
      </div>
      <div className='min-h-screen bg-white flex flex-col justify-between'>
        <Header products={products} />
       
        {
          children
        }
        <Footer />
      </div>
    </div>
  )
}


export default Layout
