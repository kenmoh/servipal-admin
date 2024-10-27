import { getFoodOrders } from '@/actions/orders'
import DeliveryOrderTable from '@/components/drlivery-order-table'
import React from 'react'

const foodOrders = async () => {
    const orders = await getFoodOrders()
    return (
        <>
            <div className='text-4xl text-slate-500 dark:text-white'>Food Orders</div>
            <section>
                <DeliveryOrderTable orders={orders} />
            </section>
        </>
    )
}

export default foodOrders