"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
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



type ChartDataType = {
    month: string,
    year: string,
    count: number
}

const chartConfig = {
    month: {
        label: "Month",
        color: "teal",
    },
    year: {
        label: "Year",
        color: "teal",
    },
    count: {
        color: "teal",
        label: "Count",
    },
} satisfies ChartConfig

export function DeliveryChart({ data }: { data: ChartDataType[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery</CardTitle>
                <CardDescription>Items/Food/Laundry Order Delivery</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="year" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="year"
                            layout="vertical"
                            fill="teal"
                            radius={5}
                        >
                            <LabelList
                                dataKey="month"
                                position="insideLeft"
                                offset={8}
                                className="fill-foreground"
                                fontSize={18}
                            />
                            <LabelList
                                dataKey="count"
                                position="right"
                                offset={10}
                                className="fill-foreground"
                                fontSize={16}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    {` Showing total item delivery for the last ${data.length} months`}
                </div>
            </CardFooter>
        </Card>
    )
}
