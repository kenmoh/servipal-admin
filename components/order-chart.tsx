"use client"

import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"

export const description = "A donut chart with an active sector"


const chartConfig = {

    food: {
        label: "Food",
        color: "hsl(var(--chart-1))",
    },
    laundry: {
        label: "Laundry",
        color: "hsl(var(--chart-2))",
    },
    delivery: {
        label: "Delivery",
        color: "hsl(var(--chart-3))",
    },


} satisfies ChartConfig


type StatType = {
    orders: number,
    food: number,
    laundry: number,
    delivery: number
}

export function OrderChart({ stat }: { stat: StatType }) {


    const chartData = [

        { orderType: "delivery", orders: stat?.delivery, fill: "var(--color-delivery)" },
        { orderType: "food", orders: stat.food, fill: "var(--color-food)" },
        { orderType: "laundry", orders: stat.laundry, fill: "var(--color-laundry)" },

    ]
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Orders</CardTitle>

            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="orders"
                            nameKey="orderType"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {stat.orders}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Orders
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">

                <div className="leading-none text-muted-foreground">
                    Showing total orders by type.
                </div>
            </CardFooter>
        </Card>
    )
}
