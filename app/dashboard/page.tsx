import React from 'react'

import { CircleEllipsis, CookingPot, Logs, Package, Users, WashingMachine } from 'lucide-react'
import { DeliveryChart } from '@/components/delivery-chart'
import { getOrdersPerMonth, getStats } from '@/actions/orders'
import { OrderStats } from '@/types/order-types'
import { OrderChart } from '@/components/order-chart'



const page = async () => {
    const data = await getOrdersPerMonth()
    const stat: OrderStats = await getStats()

    return (
        <>
            <section className='grid md:grid-cols-6 py-4 gap-2'>
                <div className='w-full text-white bg-teal-500 rounded-sm max-h-300 p-4 shadow-sm'>
                    <Users />
                    <h1 className='font-medium text-xl'>{stat.users} Users</h1>
                </div>
                <div className='w-full text-white bg-slate-600 rounded-sm max-h-200 p-4 shadow-sm'>
                    <Logs />
                    <h1 className='font-medium text-xl'> {stat.orders} Total Orders</h1>
                </div>
                <div className='w-full text-white bg-orange-500 rounded-sm max-h-200 p-4 shadow-sm'>
                    <CircleEllipsis />
                    <h1 className='font-medium text-xl'>{stat.pending} Pending Orders</h1>
                </div>
                <div className='w-full text-white bg-purple-900 rounded-sm max-h-200 p-4 shadow-sm'>
                    <CookingPot />
                    <h1 className='font-medium text-xl'>{stat.food} Food Orders</h1>
                </div>
                <div className='w-full text-white bg-blue-500 rounded-sm max-h-200 p-4 shadow-sm'>
                    <WashingMachine />
                    <h1 className='font-medium text-xl'> {stat.laundry} Laundry Orders</h1>
                </div>
                <div className='w-full text-white bg-slate-500 rounded-sm max-h-200 p-4 shadow-sm'>
                    <Package />
                    <h1 className='font-medium text-xl'> {stat.delivery} Item Delivery</h1>
                </div>

            </section>
            <section className='grid md:grid-cols-2 gap-2'>
                <DeliveryChart data={data} />
                <OrderChart stat={stat} />
            </section>
        </>
    )
}

export default page