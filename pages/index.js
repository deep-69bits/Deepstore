import Layout from '@/components/Layout'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Reviwes from '@/components/Reviwes';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Parallax } from "swiper";

export default function Home({ product,categories, customer_reviwes }) {

  const client = createClient({
    projectId: "a253bg6b",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  return (
    <main>
      <Layout products={product} >
        <div className='m-auto -z-0 lg:w-4/6 w-full py-10'>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            parallax={true}
            modules={[Pagination, Autoplay, Parallax]}
          >
            <SwiperSlide>
              <img className='w-full h-[300px]' src="./ads/ad1.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img className='w-full h-[300px]' src="./ads/ad2.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img className='w-full h-[300px]' src="./ads/ad3.png" />
            </SwiperSlide>
          </Swiper>
        </div>

        <Reviwes data={customer_reviwes} />

        <div className='m-auto w-full lg:w-4/6 py-10 grid grid-flow-row grid-cols-1 lg:grid-cols-3 md:grid-cols-2 px-5 gap-x-4 gap-y-4'>
          {
            categories.map((item, indes) => {
              return (
                <Link href={'/category/' + item._id} key={indes}>
                  <div className='flex px-4 py-2 rounded-xl hover:text-[#3fb5eb] hover:shadow-[#3fb5eb] shadow-lg border-[1px] border-black border-opacity-40 items-center cursor-pointer'>
                    <img className='h-20 w-20' src={urlFor(item.picture).url()} alt="" />
                    <h1 className='px-4 font-medium'>{item.name}</h1>
                  </div>
                </Link>
              )
            })
          }
        </div>


      </Layout>
    </main>
  )
}
export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "a253bg6b",
    dataset: "production",
    useCdn: false,
  });
  const query3 = `*[_type == "product"]`;
  const query = `*[_type == "category"]`;
  const query2 = `*[_type == "customer_reviwes"]`;
  const product = await client.fetch(query3);
  const categories = await client.fetch(query);
  const customer_reviwes = await client.fetch(query2);
  return {
    props: {
      product,
      categories,
      customer_reviwes,
    },
  };
}
