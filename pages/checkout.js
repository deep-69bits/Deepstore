import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Paymentform from '@/components/Paymentform';
import Progress from '@/components/Progress';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import ShippingAdress from '@/components/ShippingAdress';





const checkout = ({ product }) => {

    const [orders, setOrder] = useState([])
    const [totalsum, setSum] = useState(0)


    useEffect(() => {

        var order = JSON.parse(localStorage.getItem('orders'));
        var sum = JSON.parse(localStorage.getItem('sum'));
        if (sum === null || sum == undefined || sum == NaN) {
            sum = 0;
            setSum(0)
        }
        sum = parseInt(sum)
        setSum(sum)
        if (order == null) { order = [] }
        setOrder(order)


    }, [])

    const client = createClient({
        projectId: "a253bg6b",
        dataset: "production",
        useCdn: false,
    });
    const builder = imageUrlBuilder(client);
    function urlFor(source) {
        return builder.image(source);
    }

    const remove = (productid, price) => {
        var order = JSON.parse(localStorage.getItem('orders'));
        var sum = JSON.parse(localStorage.getItem('sum'));
        if (sum == null) sum = 0;
        sum = sum - parseFloat(price)
        setSum(sum)
        localStorage.setItem("sum", JSON.stringify(sum));
        if (order == null) { order = [] }
        var neworder = [];
        order.map((item) => {
            if (item != productid) {
                neworder.push(item)
            }
        })
        localStorage.setItem("orders", JSON.stringify(neworder));
        setOrder(neworder)
    }
    const [progrsspercent, setProgressPercent] = useState(0);

    return (
        <Layout products={[]}>

            <div className='m-auto -z-0 lg:w-4/6 w-full min-h-[600px] py-10'>
                <Progress  percent={progrsspercent}/>

                {
                    progrsspercent==0?
                    <div className='py-10 w-5/6 m-auto items-center '>
                        <h1 className='text-xl text-center my-4'>Order Summary</h1>
                        {
                            product.map((item, index) => {
                                if (orders != null && orders.length != 0 && orders.includes(item._id)) {
                                    return (
                                        <div key={index} className="flex m-auto border-[1px] border-black py-4 cursor-pointer my-4 hover:scale-105 duration-500 transition-all px-10 border-opacity-20  justify-start">
                                            <button onClick={() => { remove(item._id, item.price) }} className='float-right mr-10'>
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6  h-6 text-[#3fb5eb]">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <img className='w-36 h-36' src={urlFor(item.picture[0]).url()} alt="" />
                                            <div className=' px-10'>
                                                <h5 className='text-2xl mt-4'>
                                                    {item.name}
                                                </h5>
                                                <h5 className='text-xl my-2'>
                                                    &#8377;{item.price}
                                                </h5>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                        <div>
                            <hr />
                            <div className='flex justify-between'>
                                <div></div>
                                <div>
                                    <h6 className='text-sm my-3'>Subtotal</h6>
                                    <h5 className='text-xl my-1'> &#8377; {totalsum}</h5>
                                </div>
                            </div>
                            <div className='flex my-2 justify-between'>
                                <Link href={'/'}>
                                    <Button text={"Go back"} />
                                </Link>
                                <div onClick={()=>setProgressPercent(50)} >
                                    <Button text={"Next"} />
                                </div>
                            </div>
                        </div>
                    </div>
                :<div></div>
            }
             {
                progrsspercent==50?
                <ShippingAdress  progrsspercent={progrsspercent} setProgressPercent={setProgressPercent}/>
                :<div></div>
             }
              {
                progrsspercent==100?
                <Paymentform progrsspercent={progrsspercent} setProgressPercent={setProgressPercent} />
                :<div></div>
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

export default checkout
