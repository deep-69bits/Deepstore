import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout';
import ProductChecout from '@/components/atoms/ProductChecout';
import Paymentform from '@/components/Paymentform';
import Progress from '@/components/Progress';
import ShippingAdress from '@/components/ShippingAdress';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../components/firebase'
import { useRouter } from 'next/navigation';
import client from '@/sanity/client';

const checkout = ({ product }) => {

    const [orders, setOrder] = useState([])
    const [totalsum, setSum] = useState(0)
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
            } else {
                router.push('/login')
            }
        });

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
        <Layout products={product}>
            <div className='m-auto -z-0 lg:w-4/6 w-full min-h-[600px] py-10'>
                <Progress percent={progrsspercent} />
                {
                    progrsspercent == 0 ?
                        <ProductChecout orders={orders} product={product} totalsum={totalsum} />
                        : progrsspercent == 50 ? <ShippingAdress progrsspercent={progrsspercent} setProgressPercent={setProgressPercent} />
                            : progrsspercent == 100 ? <Paymentform progrsspercent={progrsspercent} setProgressPercent={setProgressPercent} />
                                : <div></div>

                }
            </div>
        </Layout>
    )
}
export async function getServerSideProps(context) {
    const query = `*[_type == "product" ]`;
    const product = await client.fetch(query);
    return {
        props: {
            product,
        },
    };
}

export default checkout
