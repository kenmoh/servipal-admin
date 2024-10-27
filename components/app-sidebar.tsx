import { Home, Wallet, List, BadgeDollarSign, Users, Bike, Shirt, Hammer, Beef, WashingMachine, ArrowLeftRight } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"


// Menu items.
const users = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Wallets",
        url: "/dashboard/wallets",
        icon: Wallet,
    },
    {
        title: "Withdrawals",
        url: "/dashboard/withdrawals",
        icon: BadgeDollarSign,
    }
]

const orders = [

    {
        title: "Delivery Orders",
        url: "/dashboard/delivery",
        icon: Bike,
    },
    {
        title: "Food Orders",
        url: "/dashboard/food-orders",
        icon: List,
    },
    {
        title: "Laundry Orders",
        url: "/dashboard/laundry-orders",
        icon: List,
    }
]
const items = [
    {
        title: "Products",
        url: "/dashboard/products",
        icon: Shirt,
    },
    {
        title: "Food Items",
        url: "/dashboard/food-items",
        icon: Beef,
    },
    {
        title: "Laundry Items",
        url: "/dashboard/laundry-items",
        icon: WashingMachine,
    },
    {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: ArrowLeftRight,
    },

]
const disputes = [
    {
        title: "Disputes",
        url: "/dashboard/disputes",
        icon: Hammer,
    },

]

export default function AppSidebar() {
    return (
        <Sidebar collapsible="icon" >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>User Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {users.map((user) => (
                                <SidebarMenu key={user.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={user.url}>
                                            <user.icon />
                                            <span>{user.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenu>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Order Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {orders.map((order) => (
                                <SidebarMenu key={order.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={order.url}>
                                            <order.icon />
                                            <span>{order.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenu>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Item Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenu key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenu>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Dispute Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {disputes.map((dispute) => (
                                <SidebarMenu key={dispute.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={dispute.url}>
                                            <dispute.icon />
                                            <span>{dispute.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenu>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
