
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, Pie, PieChart, RadialBar, RadialBarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const campaignData = [
  {
    name: "Traffic Campaign",
    reach: 28749,
    impressions: 60409,
    amountSpent: 847.46,
    cpr: 0.46,
    results: 1830,
    resultType: "Link Clicks",
    fill: "var(--color-primary)",
  },
  {
    name: "Lead Gen Campaign",
    reach: 8520,
    impressions: 9269,
    amountSpent: 627.98,
    cpr: 34.89,
    results: 18,
    resultType: "Leads",
    fill: "var(--color-accent)",
  },
]

const chartConfig = {
  reach: {
    label: "Reach",
    color: "hsl(var(--chart-1))",
  },
  impressions: {
    label: "Impressions",
    color: "hsl(var(--chart-2))",
  },
  amountSpent: {
      label: "Amount Spent (INR)",
      color: "hsl(var(--chart-3))"
  }
}

export function PerformanceMarketingChart() {
  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Client Success: Shreeram Enterprise, Mumbai</CardTitle>
            <CardDescription>A snapshot of a recent high-performance campaign.</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                 <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={campaignData}>
                        <defs>
                            <linearGradient id="fillReach" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-reach)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--color-reach)" stopOpacity={0.1}/>
                                <animate attributeName="stop-opacity" values="0.1; 0.8; 0.1" dur="4s" repeatCount="indefinite" />
                            </linearGradient>
                            <linearGradient id="fillImpressions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-impressions)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--color-impressions)" stopOpacity={0.1}/>
                                <animate attributeName="stop-opacity" values="0.1; 0.8; 0.1" dur="4s" repeatCount="indefinite" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.replace(" Campaign", "")}
                        />
                        <YAxis />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                         <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="reach" fill="url(#fillReach)" radius={4}>
                             <LabelList position="top" offset={10} className="fill-foreground" fontSize={12} />
                        </Bar>
                        <Bar dataKey="impressions" fill="url(#fillImpressions)" radius={4}>
                             <LabelList position="top" offset={10} className="fill-foreground" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                 {campaignData.map((campaign) => (
                    <Card key={campaign.name} className="flex flex-col items-center justify-center p-4 text-center h-full bg-muted/50">
                       <h3 className="font-headline text-lg font-bold">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{campaign.resultType}</p>
                        <p className="text-4xl font-bold text-primary">{campaign.results.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mt-2">Cost per Result</p>
                        <p className="font-bold text-lg">₹{campaign.cpr}</p>
                    </Card>
                 ))}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Campaign results from last 30 days.
        </div>
        <div className="leading-none text-muted-foreground">
          Showing key metrics from our recent performance marketing efforts for Shreeram Enterprise.
        </div>
      </CardFooter>
    </Card>
  )
}
