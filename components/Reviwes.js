import React from 'react'
import Carousel from 'react-grid-carousel'
import PortableText from "react-portable-text"

const Reviwes = ({ data }) => {
    console.log(data);
    return (
        <div className='px-10 py-10 m-auto lg:w-4/6 w-full'>

            <div className='hidden lg:block'>
                <Carousel cols={2} autoplay={3000} rows={1} gap={10} loop>
                    {
                        data.map((item, index) => {
                            return (
                                <Carousel.Item>
                                    <div className='py-2 px-8 hover:scale-105 transition-all duration-500 cursor-pointer'>
                                        <h1 className='px-4 text-xl font-medium'>{item.customer_name}</h1>
                                        <h2 className='px-4 opacity-60 py-2'>{item.date}</h2>
                                        <p className='py-6 px-4 my-4 rounded-xl border-[#aaebff]  border-[1px] bg-[#f1faff]'>{item.review}</p>
                                    </div>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </div>

            <div className='block lg:hidden'>
                <Carousel cols={1} autoplay={3000} rows={1} gap={10} loop>
                    {
                        data.map((item, index) => {
                            return (
                                <Carousel.Item>
                                    <div className='py-2 px-8 hover:scale-105 transition-all duration-500 cursor-pointer'>
                                        <h1 className='px-4 text-xl font-medium'>{item.customer_name}</h1>
                                        <h2 className='px-4 opacity-60 py-2'>{item.date}</h2>
                                        <p className='py-6 px-4 my-4 rounded-xl border-[#aaffd3]  border-[1px] bg-[#f1fff8]'>{item.review}</p>
                                    </div>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </div>

        </div>
    )
}

export default Reviwes
