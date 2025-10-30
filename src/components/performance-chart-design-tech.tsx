"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, RadialBar, RadialBarChart, XAxis, YAxis } from "recharts"

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
    name: "Reach Campaign",
    reach: 213489,
    impressions: 217816,
    amountSpent: 588.85,
    cpr: 2.76,
    results: 213489,
    resultType: "Reach",
    fill: "var(--color-violet)",
  },
  {
    name: "Lead Gen Campaign",
    reach: 6868,
    impressions: 8316,
    amountSpent: 197.93,
    cpr: 20.23,
    results: 3,
    resultType: "Leads",
    fill: "var(--color-lime)",
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
  },
  violet: {
    label: 'Reach',
    color: 'hsl(var(--chart-5))',
  },
  lime: {
    label: 'Lead Gen',
    color: 'hsl(var(--chart-4))',
  }
} as any

export function PerformanceMarketingChartDesignTech() {
  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Client Success: Design Tech, Pune</CardTitle>
            <CardDescription>A snapshot of a recent high-performance campaign.</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                 <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={campaignData}>
                        <defs>
                            <linearGradient id="fillReachDT" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                                <animate attributeName="stop-opacity" values="0.1; 0.8; 0.1" dur="4s" repeatCount="indefinite" />
                            </linearGradient>
                            <linearGradient id="fillImpressionsDT" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
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
                        <Bar dataKey="reach" fill="url(#fillReachDT)" radius={4}>
                             <LabelList position="top" offset={10} className="fill-foreground" fontSize={12} />
                        </Bar>
                        <Bar dataKey="impressions" fill="url(#fillImpressionsDT)" radius={4}>
                             <LabelList position="top" offset={10} className="fill-foreground" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                 {campaignData.map((campaign) => (
                    <div key={campaign.name} className="flex flex-col items-center justify-center p-4 text-center h-full">
                        <ChartContainer config={{ results: { label: campaign.resultType, color: campaign.fill } }} className="h-40 w-40">
                             <RadialBarChart 
                                data={[{...campaign, name: 'results'}]} 
                                startAngle={90} 
                                endAngle={-270}
                                innerRadius="70%"
                                outerRadius="110%"
                            >
                                <RadialBar dataKey="results" background cornerRadius={10} />
                                <ChartTooltip content={<ChartTooltipContent nameKey="results" />} />
                             </RadialBarChart>
                        </ChartContainer>
                       <h3 className="font-headline text-lg font-bold mt-4">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{campaign.resultType}: {campaign.results.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Cost per Result</p>
                        <p className="font-bold text-lg">₹{campaign.cpr}</p>
                    </div>
                 ))}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Campaign results from last 30 days.
        </div>
        <div className="leading-none text-muted-foreground">
          Showing key metrics from our recent performance marketing efforts for Design Tech.
        </div>
      </CardFooter>
    </Card>
  )
}
