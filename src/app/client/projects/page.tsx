import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ClientProjectsPage() {
    const clientProjects = projects.filter(p => p.clientId === 'client-1' || p.clientId === 'client-2');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">My Projects</h1>
                <p className="text-muted-foreground">Track the status and timeline of all your projects.</p>
            </div>
            <div className="space-y-4">
                {clientProjects.map(project => (
                    <Card key={project.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>{project.name}</CardTitle>
                                <CardDescription>Project ID: {project.id}</CardDescription>
                            </div>
                            <Badge variant={project.status === 'Completed' ? 'secondary' : 'default'} className="text-sm">{project.status}</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="text-sm font-semibold">Timeline</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(project.timeline.start).toLocaleDateString()} - {new Date(project.timeline.end).toLocaleDateString()}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/client/projects/${project.id}`}>
                                        View Updates <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
