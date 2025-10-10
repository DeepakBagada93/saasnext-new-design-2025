
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type Milestone = {
    name: string;
    date: string; // Keep as ISO string for consistency
    status: 'Upcoming' | 'Active' | 'Completed';
}

type Project = {
  id: string;
  name: string;
  clientName: string;
  status: string;
  budget: number;
  currency: string;
  timeline: {
    start: string;
    end: string;
  };
  milestones?: Milestone[];
  updates?: any[];
  quickCallNumber?: string;
  whatsappLink?: string;
};

function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
}


function EditProjectDialog({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [status, setStatus] = useState(project.status);
  const [budget, setBudget] = useState(project.budget);
  const [currency, setCurrency] = useState(project.currency || 'INR');
  const [milestones, setMilestones] = useState(project.milestones || []);
  const [newUpdate, setNewUpdate] = useState('');
  const [quickCallNumber, setQuickCallNumber] = useState(project.quickCallNumber || '');
  const [whatsappLink, setWhatsappLink] = useState(project.whatsappLink || '');

  const handleMilestoneDateChange = (index: number, date: Date | undefined) => {
    if (!date) return;
    const newMilestones = [...milestones];
    newMilestones[index].date = date.toISOString();
    setMilestones(newMilestones);
  };

  const handleSave = async () => {
    try {
      const projectRef = doc(firestore, 'projects', project.id);
      
      const updateData: any = {
        status,
        budget: Number(budget),
        currency,
        milestones,
        quickCallNumber,
        whatsappLink,
      };

      if (newUpdate.trim() !== '') {
        updateData.updates = arrayUnion({
            text: newUpdate,
            date: new Date().toISOString(),
        })
      }

      await updateDoc(projectRef, updateData);

      toast({
        title: 'Project Updated',
        description: `${project.name} has been updated.`,
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Project: {project.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="status">Project Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          
           <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="quickCallNumber">Quick Call Number</Label>
                    <Input
                        id="quickCallNumber"
                        placeholder="+91 12345 67890"
                        value={quickCallNumber}
                        onChange={(e) => setQuickCallNumber(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="whatsappLink">WhatsApp Group Link</Label>
                    <Input
                        id="whatsappLink"
                        placeholder="https://chat.whatsapp.com/..."
                        value={whatsappLink}
                        onChange={(e) => setWhatsappLink(e.target.value)}
                    />
                </div>
          </div>


          <div className="space-y-4">
            <Label>Work Phases (Milestones)</Label>
             <div className="space-y-2">
                {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <Input value={milestone.name} readOnly className="flex-grow bg-muted"/>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-[280px] justify-start text-left font-normal")}
                                >
                                    {format(new Date(milestone.date), "PPP")}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={new Date(milestone.date)}
                                    onSelect={(date) => handleMilestoneDateChange(index, date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-update">Add Project Update</Label>
            <Textarea 
                id="new-update"
                placeholder="Share a new update with the client..."
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
            />
          </div>

        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminProjectsPage() {
  const firestore = useFirestore();
  const [projectsSnapshot, loading, error] = useCollection(
    collection(firestore, 'projects')
  );
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const projects = projectsSnapshot?.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Project)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Project Management</h1>
        <p className="text-muted-foreground">
          Update timelines, post progress, and change statuses.
        </p>
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
                <TableHead>Client Name</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-destructive">
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              )}
              {projects?.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.clientName}</TableCell>
                  <TableCell>{formatCurrency(project.budget || 0, project.currency || 'INR')}</TableCell>
                  <TableCell>
                    {new Date(project.timeline.start).toLocaleDateString()} -{' '}
                    {new Date(project.timeline.end).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === 'Completed' ? 'secondary' : 'default'
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProject(project)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {projects && projects.length === 0 && !loading && (
                 <TableRow>
                    <TableCell colSpan={6} className="text-center">No projects found.</TableCell>
                 </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {editingProject && (
        <EditProjectDialog
          project={editingProject}
          isOpen={!!editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  );
}
