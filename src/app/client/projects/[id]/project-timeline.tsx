
'use client';
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Loader } from "lucide-react";

type Milestone = {
    name: string;
    date: string;
    status: 'Completed' | 'Active' | 'Upcoming';
}

const statusIcons = {
    Completed: <CheckCircle className="h-6 w-6 text-green-500" />,
    Active: <Loader className="h-6 w-6 text-blue-500 animate-spin" />,
    Upcoming: <Circle className="h-6 w-6 text-muted-foreground" />,
}

export function ProjectTimeline({ milestones }: { milestones: Milestone[] }) {
    return (
        <div className="space-y-8">
            {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                        <div className={cn(
                            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                            milestone.status === 'Completed' && 'bg-green-100 dark:bg-green-900',
                            milestone.status === 'Active' && 'bg-blue-100 dark:bg-blue-900',
                            milestone.status === 'Upcoming' && 'bg-muted',
                        )}>
                            {statusIcons[milestone.status]}
                        </div>
                        {index < milestones.length - 1 && (
                            <div className="w-px flex-1 bg-border mt-2" />
                        )}
                    </div>
                    <div className="pt-1">
                        <p className="font-semibold">{milestone.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {new Date(milestone.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                         <p className={cn(
                             "text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1",
                             milestone.status === 'Completed' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                             milestone.status === 'Active' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                             milestone.status === 'Upcoming' && 'bg-muted text-muted-foreground',
                         )}>
                            {milestone.status}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
