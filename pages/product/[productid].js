import Layout from '@/components/Layout'
import React from 'react'
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import ReactStars from 'react-stars'
import PortableText from "react-portable-text"

const productid = ({ product }) => {
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
            <div className='px-10 lg:w-2/3 w-full m-auto'>
                {
                    product.map((item, ind) => {
                        if (item._id == productid) {
                            return (
                                <div key={ind} className="py-10" >
                                    <div className='flex gap-x-20'>
                                        <div>
                                            <img className='w-80 ' src={urlFor(item.picture[0]).url()} alt="" />
                                        </div>

                                        <div>
                                            <h1 className='text-3xl'>{item.name}</h1>
                                            <h2>{item.price}</h2>
                                            <ReactStars
                                                count={5}
                                                value={item.rating}
                                                size={24}
                                                color2={'#ffd700'} />
                                        </div>
                                    </div>

                                    <div className='py-10'>
                                        <h3 className='py-4 text-2xl font-medium'>Description</h3>
                                        <h5 className='font-light '>
                                        {item.description}
                                        </h5>
                                    </div>
                                    <div>
                                        <h3 className='py-4 text-2xl font-medium'>Ingredients</h3>
                                        <h5 className='font-light '>
                                        {item.ingredients}
                                        </h5>
                                    </div>
                                    <div>
                                        <h3 className='py-4 text-2xl font-medium'>Benefits</h3>
                                        <h5 className='font-light '>
                                        {item.benefits}
                                        </h5>
                                    </div>
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
