import { getDeliveryOrders } from '@/actions/orders'
import DeliveryOrderTable from '@/components/drlivery-order-table'
import React from 'react'

const delivery = async () => {
    const orders = await getDeliveryOrders()

    return (
        <>
            <div className='text-4xl text-slate-500 dark:text-white'>Item Delivery</div>
            <section>
                <DeliveryOrderTable orders={orders} />
            </section>
        </>
    )
}

export default delivery