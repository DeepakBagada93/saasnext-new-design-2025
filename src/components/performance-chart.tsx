
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
    name: "Traffic Campaign",
    reach: 28749,
    impressions: 60409,
    amountSpent: 847.46,
    cpr: 0.46,
    results: 1830,
    resultType: "Link Clicks",
    fill: "var(--color-cyan)",
  },
  {
    name: "Lead Gen Campaign",
    reach: 8520,
    impressions: 9269,
    amountSpent: 627.98,
    cpr: 34.89,
    results: 18,
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
  cyan: {
    label: 'Traffic',
    color: 'hsl(var(--chart-3))',
  },
  lime: {
    label: 'Lead Gen',
    color: 'hsl(var(--chart-4))',
  }
}

export function PerformanceMarketingChart() {
  return (
    <Card className="w-full border-white/5 bg-white/[0.02] rounded-[2rem] backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="font-headline text-xl md:text-2xl text-white tracking-tight">Client Success: Shreeram Enterprise, Mumbai</CardTitle>
            <CardDescription className="text-neutral-400">A snapshot of a recent high-performance campaign.</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="min-h-[250px] md:min-h-[300px]">
                 <ChartContainer config={chartConfig} className="min-h-[250px] md:min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={campaignData}>
                        <defs>
                            <linearGradient id="fillReach" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                                <animate attributeName="stop-opacity" values="0.1; 0.8; 0.1" dur="4s" repeatCount="indefinite" />
                            </linearGradient>
                            <linearGradient id="fillImpressions" x1="0" y1="0" x2="0" y2="1">
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
                        <Bar dataKey="reach" fill="url(#fillReach)" radius={4}>
                             <LabelList position="top" offset={10} className="fill-foreground" fontSize={12} />
                        </Bar>
                        <Bar dataKey="impressions" fill="url(#fillImpressions)" radius={4}>
                             <LabelList position="top" offset={10} className="fill-foreground" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-center">
                 {campaignData.map((campaign) => (
                    <div key={campaign.name} className="flex flex-col items-center justify-center p-3 sm:p-4 text-center h-full">
                        <ChartContainer config={{ results: { label: campaign.resultType, color: campaign.fill } }} className="h-32 w-32 sm:h-40 sm:w-40">
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
                       <h3 className="font-headline text-sm sm:text-lg font-bold mt-3 sm:mt-4 text-white">{campaign.name}</h3>
                        <p className="text-xs sm:text-sm text-neutral-400 mb-1">{campaign.resultType}: {campaign.results.toLocaleString()}</p>
                        <p className="text-[10px] sm:text-xs text-neutral-500">Cost per Result</p>
                        <p className="font-bold text-base sm:text-lg text-white">₹{campaign.cpr}</p>
                    </div>
                 ))}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm text-neutral-500">
        <div className="flex gap-2 font-medium leading-none text-neutral-400">
          Campaign results from last 30 days.
        </div>
        <div className="leading-none">
          Showing key metrics from our recent performance marketing efforts for Shreeram Enterprise.
        </div>
      </CardFooter>
    </Card>
  )
}
