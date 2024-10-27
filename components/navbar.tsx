import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './toggle'
import { Bell, LogIn, User } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="flex flex-col flex-1 overflow-hidden mb-10">
            <header className="flex items-center justify-between px-6 py-4 border-b">
                <Link href={'/'} className="flex items-center">

                    LOGO
                </Link>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <Link href={'/auth'} className='bg-orange-600 py-3 px-10 rounded-md hover:bg-orange-500 transition-colors'> Login
                    </Link>
                    <Button variant="ghost" size="icon">
                        <Bell />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <User />
                    </Button>
                </div>
            </header>

        </div>

    )
}

export default Navbar