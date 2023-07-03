import Layout from '@/components/Layout'
import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Productcard from '@/components/atoms/Productcard';

const categoryid = ({products}) => {
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
   
  return (
    <Layout>
      <div className='m-auto w-full lg:w-4/6 py-10 grid grid-flow-row grid-cols-1 lg:grid-cols-3 md:grid-cols-2 px-5 gap-x-4 gap-y-4'>
       {
        products.map((item,index)=>{
          if(item.cat._ref==categoryid){
            return(
              <div>
              <Productcard id={item._id} name={item.name} image={urlFor(item.picture[0]).url()} price={item.price}/>
              </div>
              )
            }
        })
       }
      </div>
    </Layout>
  )
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

