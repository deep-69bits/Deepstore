import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import ReactStars from 'react-stars'
import RelatedProducts from '@/components/RelatedProducts';
import Button from '@/components/atoms/Button';

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
    const [load, setLoad] = useState(true)
    const [alreadyin, setalreadyin] = useState(false)
    const addorder = (price) => {
        var order = JSON.parse(localStorage.getItem('orders'));
        var sum = JSON.parse(localStorage.getItem('sum'));
        if (sum == null) sum = 0;
        sum = sum + parseFloat(price)
        localStorage.setItem("sum", JSON.stringify(sum));
        if (order == null) { order = [] }
        console.log(order)
        if (!order.includes(productid)) {
            order.push(productid)
            localStorage.setItem("orders", JSON.stringify(order));
            setalreadyin(true)
        }
        else {
            setalreadyin(true)
            setLoad(!load)
        }
    }
    useEffect(() => {

        const func = () => {
            var order = JSON.parse(localStorage.getItem('orders'));
            if (order == null) { order = [] }
            if (order.includes(productid)) {
                setalreadyin(true)
                setLoad(!load)
            }
            else{
                setalreadyin(false)
                setLoad(!load)
            }
        }

        setInterval(func, 3000);

    }, [])

    const remove = (price) => {
        setalreadyin(false)
        var order = JSON.parse(localStorage.getItem('orders'));
        var sum=JSON.parse(localStorage.getItem('sum'));
        if(sum==null)sum=0;
        sum=sum-parseFloat(price)
        localStorage.setItem("sum", JSON.stringify(sum));
        if (order == null) { order = [] }
        var neworder = [];
        order?.map((item) => {
            if (item != productid) {
                neworder.push(item)
            }
        })
        localStorage.setItem("orders", JSON.stringify(neworder));
    }
    return (
        <Layout products={product}>
            <div className='px-10 lg:w-2/3 w-full m-auto'>
                {
                    product?.map((item, ind) => {
                        if (item._id == productid) {
                            return (
                                <div key={ind} className="py-10" >
                                    <div className=' block gap-x-20'>
                                        <div>
                                            <img className='w-80 my-4 m-auto' src={urlFor(item.picture[0]).url()} alt="" />
                                        </div>

                                        <div>
                                            <h1 className='text-3xl'>{item.name}</h1>
                                            <h2 className='my-2 font-light'>By {item.brand}</h2>
                                            <span className='flex items-center '>
                                                <ReactStars count={5} value={item.rating} size={24} color2={'#ffd700'} />
                                                <span className='mx-3'>
                                                    {item.rating}+ rating
                                                </span>
                                            </span>
                                            <h2 className='my-2 text-xl'>MRP &#8377;{item.price}</h2>
                                            <h4 className='text-sm'>Inclusive of all taxes</h4>
                                            {
                                                alreadyin ?
                                                    <div  onClick={()=>{remove(item.price)}}>
                                                        <Button text={"Remove from Cart"} className="my-2" />
                                                    </div>
                                                    :
                                                    <div onClick={() => { addorder(item.price) }}>
                                                        <Button text={"Add to cart"} className="my-2" />
                                                    </div>
                                            }
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
                                    <hr className='my-3' />
                                    <RelatedProducts data={product} category={item.cat._ref} />
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
