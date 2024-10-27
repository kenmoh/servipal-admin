'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Utensils, Shirt, Shield, Clock, HeartHandshake, Bike } from "lucide-react"

import Navbar from './navbar'
import Link from 'next/link'



const data = [
    {
        icon: <Bike className="w-12 h-12 mb-4 text-orange-400" />,
        title: "Swift Delivery",
        description:
            "From documents to gifts, our registered dispatch riders deliver it all with lightning speed. Your items, our priority.",
    },
    {
        icon: <Utensils className="w-12 h-12 mb-4 text-orange-400" />,
        title: "Food on Demand",
        description:
            "Craving Jollof rice or Pizza? Your favourite restaurants are just a tap away. Bon appétit!",
    },
    {
        icon: <Shirt className="w-12 h-12 mb-4 text-orange-400" />,
        title: "Pristine Laundry",
        description:
            "Say goodbye to laundry day stress. Our laundry services providers will keep your wardrobe fresh and fabulous.",
    },
    {
        icon: <ShoppingBag className="w-12 h-12 mb-4 text-orange-400" />,
        title: "Secure Shopping",
        description:
            "Shop with peace of mind. Our escrow service ensures your money is safe until you're satisfied. Goodbye to What I Ordered versus What I Get! 😊 ",
    },
];


const features = [
    {
        icon: <Clock className="w-8 h-8 mb-4 text-orange-400" />,
        title: "Time-Saving Convenience",
        description:
            "Reclaim your day with our all-in-one platform. More time for you, less time running errands.",
    },
    {
        icon: <Shield className="w-8 h-8 mb-4 text-orange-400" />,
        title: "Ironclad Security",
        description:
            "Shop worry-free with our escrow system. Your transactions are protected from click to delivery.",
    },
    {
        icon: <HeartHandshake className="w-8 h-8 mb-4 text-orange-400" />,
        title: "24/7 Human Support",
        description:
            "Questions? Issues? Our friendly team is always here to help, day or night.",
    },
];
const aboutText = "From doorstep deliveries to sparkling laundry, satisfying meals to secure shopping - we're your one-stop solution for modern living."
export function HomePage() {
    const [email, setEmail] = useState('')

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement email submission logic
        console.log('Email submitted:', email)
        setEmail('')
    }



    return (

        <>
            <Navbar />
            <div className="fixed inset-0 bg-opacity-50 bg-black -z-10">
                <svg className="absolute  inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.1)" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>
            <div className="min-h-screen w-full ">
                <div className="container mx-auto px-4 py-8">

                    <main>
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}>
                                <h1 className="text-3xl mt-10 md:text-7xl font-bold text-orange-200 mb-6">Transforming Errands into Ease</h1>
                                <p className="text-xl text-gray-300 mb-8">{aboutText}</p>
                                <Link href='/auth' className="bg-orange-500 font-semibold uppercase text-white hover:bg-orange-600  text-lg px-10 py-6 rounded-full transition-colors">
                                    Discover Ease
                                </Link>
                            </motion.div>
                            <motion.div
                                className='w-full h-full'
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Image src={'/online.png'} alt='ServiPal' width={3000} height={300} />
                            </motion.div>
                        </section>

                        <motion.section
                            id="services"
                            ref={ref}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isInView ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-8">From Errands To Essentials: Our services covers it all</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                                {data.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-gray-300 border border-gray-700 transition-all hover:bg-opacity-70 hover:scale-105"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                                        transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                                    >
                                        {service.icon}
                                        <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                                        <p>{service.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section id="features" className=" mb-20"
                            ref={ref}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isInView ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-8">Experience the ServiPal Difference</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                        key={index}
                                        className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-6 border border-gray-700 transition-all hover:bg-opacity-50">
                                        {feature.icon}
                                        <h3 className="text-xl font-semibold text-orange-400 mb-2">{feature.title}</h3>
                                        <p className="text-gray-300">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        <section id="contact" className="max-w-xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Join the waitlist</h2>
                            <p className="text-gray-300 mb-6">Be the first to experience the future of service delivery. Get exclusive updates!</p>
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 border-gray-700 focus:ring-2 focus:ring-orange-500"
                                    aria-label="Email for newsletter"
                                />

                                {/* <DropDownInput /> */}
                                <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                                    Join Now
                                </Button>
                            </form>
                        </section>
                    </main>

                    <footer className="mt-20 text-center text-gray-400">
                        <p>&copy; 2024 ServiPal. All rights reserved. Simplifying lives, one service at a time.</p>
                    </footer>
                </div>
            </div >
        </>
    )
}