import Layout from '@/components/Layout'
import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const productid = ({product}) => {
    const router = useRouter()
    const { productid } = router.query
    const client = createClient({
        projectId: "a253bg6b",
        dataset: "production",
        useCdn: false,
      });
      const builder = imageUrlBuilder(client);
      function urlFor(source) {
        return builder.image(source);
    }
    console.log(product)
  return (
    <Layout>
     <div className='px-40'> 
       {
        product.map((item,ind)=>{
            if(item._id==productid){
                return(
                    <div>
                         <img className='w-80 ' src={urlFor(item.picture[0]).url()} alt="" />
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
    const query = `*[_type == "product" ]`;
    const product = await client.fetch(query);
    return {
      props: {
       product,
      },
    };
}

export default productid
