import { getLaundryOrders } from '@/actions/orders'
import DeliveryOrderTable from '@/components/drlivery-order-table'
import React from 'react'

const laundryOrder = async () => {
    const orders = await getLaundryOrders()
    return (
        <>
            <div className='text-4xl text-slate-500 dark:text-white'>Laundry Orders</div>
            <section>
                <DeliveryOrderTable orders={orders} />
            </section>
        </>
    )
}

export default laundryOrder