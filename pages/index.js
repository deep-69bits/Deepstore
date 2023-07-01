import Image from 'next/image'
import { Inter } from 'next/font/google'
import Carousel from 'react-grid-carousel'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Layout>
      <div className='m-auto w-4/6'>
        <Carousel   cols={1} autoplay={3000} rows={1} gap={10} loop>
          <Carousel.Item>
            <img  className='w-full h-[300px]' src="./ads/ad1.png" />
          </Carousel.Item>
          <Carousel.Item>
          <img  className='w-full h-[300px]' src="./ads/ad2.png" />
          </Carousel.Item>
          <Carousel.Item>
          <img  className='w-full h-[300px]' src="./ads/ad3.png" />
          </Carousel.Item>
        </Carousel>
      </div>
      </Layout>
    </main>
  )
}
