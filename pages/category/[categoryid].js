import Layout from '@/components/Layout'
import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Productcard from '@/components/atoms/Productcard';
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '@/components/Seo';
const categoryid = ({products}) => {
  const [loading, setLoading] = useState(false)
  const delay = 1.1;
    const router = useRouter()
    const { categoryid } = router.query
    const client = createClient({
        projectId: "a253bg6b",
        dataset: "production",
        useCdn: false,
      });
      const builder = imageUrlBuilder(client);
      function urlFor(source) {
        return builder.image(source);
    }

    useEffect(
      () => {
        setLoading(false);
        setTimeout(() => {
          setLoading(true)
        }, delay * 1000);
      },  
      []
    );
   
  return loading ? (
    <motion.div initial={{ scale: 0 }} exit={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, duration: 0.6, delay: 0.1, scale: 2 }}>
    <Layout products={products}>
    <motion.div initial={{ scale: 0 }} exit={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, duration: 0.6, delay: 0.1, scale: 2 }} className='m-auto w-full lg:w-4/6 py-10 grid grid-flow-row grid-cols-1 lg:grid-cols-3 md:grid-cols-2 px-5 gap-x-4 gap-y-4'>
    {
      products?.map((item,index)=>{
        if(item.cat._ref==categoryid){
          return(
            <div key={index}>
            <Productcard id={item._id} name={item.name} image={urlFor(item.picture[0]).url()} price={item.price}/>
            </div>
            )
          }
        })
      }
      </motion.div>
      </Layout>
   </motion.div>
  ):
  <motion.div  initial={{ y: -600 }} animate={{ y: 0 }} transition={{ delay: 0 }} className='min-h-screen  flex items-center'>
  <Seo/>
  <img className='m-auto' src="https://ik.imagekit.io/cmef8hxb6/303_1__ufAkdsCKK.gif?updatedAt=1688585978869" alt="" />
  </motion.div>
}

export async function getServerSideProps(context) {
    const client = createClient({
      projectId: "a253bg6b",
      dataset: "production",
      useCdn: false,
    });
    const query = `*[_type == "product"]`;
    const products = await client.fetch(query);
    return {
      props: {
       products,
      },
    };
}

export default categoryid

