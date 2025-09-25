import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function AdminProjectsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Project Management</h1>
                <p className="text-muted-foreground">Update timelines, post progress, and change statuses.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Name</TableHead>
                                <TableHead>Client ID</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell>{project.clientId}</TableCell>
                                    <TableCell>
                                        <Badge variant={project.status === 'Completed' ? 'secondary' : 'default'}>{project.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
