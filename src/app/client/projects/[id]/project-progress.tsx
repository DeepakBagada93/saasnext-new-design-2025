'use client';

import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

const calculateProgress = (start: string, end: string, status: string): number => {
    if (status === 'Completed') return 100;
    
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const now = new Date().getTime();

    if (now >= endDate) return 99; // If past due but not completed, show 99%
    if (now <= startDate) return 0;

    const totalDuration = endDate - startDate;
    const elapsedDuration = now - startDate;

    return Math.round((elapsedDuration / totalDuration) * 100);
};

export function ProjectProgress({ start, end, status }: { start: string, end: string, status: string }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(calculateProgress(start, end, status));
    }, [start, end, status]);

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold">Timeline Progress</h4>
                <span className="text-sm font-medium text-muted-foreground">{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
        </div>
    );
}
