
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
import { collection, doc, updateDoc, arrayUnion, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import { format, addDays } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlusCircle } from 'lucide-react';

type Client = {
  id: string;
  contactName: string;
  companyName: string;
  contactEmail: string;
};

type Milestone = {
    name: string;
    date: Date | string; // Allow Date object for picker, string for storage
    status: 'Upcoming' | 'Active' | 'Completed';
}

type Project = {
  id: string;
  name: string;
  clientName: string;
  clientId: string;
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


function ProjectDialog({
  project,
  isOpen,
  onClose,
  clients,
}: {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
}) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const isEditing = !!project;
  
  // Form State
  const [projectName, setProjectName] = useState(project?.name || '');
  const [selectedClientId, setSelectedClientId] = useState(project?.clientId || '');
  const [status, setStatus] = useState(project?.status || 'Planning');
  const [budget, setBudget] = useState(project?.budget || 0);
  const [currency, setCurrency] = useState(project?.currency || 'INR');
  const [quickCallNumber, setQuickCallNumber] = useState(project?.quickCallNumber || '');
  const [whatsappLink, setWhatsappLink] = useState(project?.whatsappLink || '');
  const [newUpdate, setNewUpdate] = useState('');
  
  const [milestones, setMilestones] = useState<Milestone[]>(
    project?.milestones ? project.milestones.map(m => ({...m, date: new Date(m.date as string)})) : [
        { name: 'Project Kick-off', date: addDays(new Date(), 2), status: 'Upcoming' },
        { name: 'Final Delivery', date: addDays(new Date(), 30), status: 'Upcoming' },
    ]
  );
  

  const handleMilestoneDateChange = (index: number, date: Date | undefined) => {
    if (!date) return;
    const newMilestones = [...milestones];
    newMilestones[index].date = date;
    setMilestones(newMilestones);
  };

  const handleSave = async () => {
    if (!firestore) return;
     if (!isEditing && !selectedClientId) {
      toast({ variant: 'destructive', title: 'Client Required', description: 'Please select a client.' });
      return;
    }
     if (!projectName) {
      toast({ variant: 'destructive', title: 'Project Name Required', description: 'Please enter a name for the project.' });
      return;
    }

    try {
      const sortedMilestones = [...milestones].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const start = sortedMilestones.length > 0 ? new Date(sortedMilestones[0].date) : new Date();
      const end = sortedMilestones.length > 0 ? new Date(sortedMilestones[sortedMilestones.length - 1].date) : addDays(new Date(), 30);


      const projectData: any = {
        name: projectName,
        status,
        budget: Number(budget),
        currency,
        timeline: {
          start: start.toISOString(),
          end: end.toISOString(),
        },
        milestones: sortedMilestones.map(m => ({...m, date: new Date(m.date).toISOString()})),
        quickCallNumber,
        whatsappLink,
      };

      if (isEditing && project) {
          const projectRef = doc(firestore, 'projects', project.id);
          if (newUpdate.trim() !== '') {
            projectData.updates = arrayUnion({
                text: newUpdate,
                date: new Date().toISOString(),
            })
          }
          await updateDoc(projectRef, projectData);
          toast({ title: 'Project Updated', description: `${project.name} has been updated.` });
      } else {
          const selectedClient = clients.find(c => c.id === selectedClientId);
          if (!selectedClient) return;

          projectData.clientId = selectedClientId;
          projectData.clientName = selectedClient.companyName || selectedClient.contactName;
          projectData.createdAt = serverTimestamp();
          projectData.updates = [];
          
          await addDoc(collection(firestore, 'projects'), projectData);
          toast({ title: 'Project Created', description: `New project "${projectName}" has been created.` });
      }

      onClose();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: isEditing ? 'Update Failed' : 'Creation Failed',
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? `Edit Project: ${project?.name}` : 'Create New Project'}</DialogTitle>
           {!isEditing && <DialogDescription>Fill out the details to create a new project for a client.</DialogDescription>}
        </DialogHeader>
        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
          {!isEditing && (
            <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                 <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                    <SelectTrigger id="client">
                        <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                        {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                            {client.companyName || client.contactName}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          )}

           <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
            </div>

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
          
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="new-update">Add Project Update</Label>
              <Textarea 
                  id="new-update"
                  placeholder="Share a new update with the client..."
                  value={newUpdate}
                  onChange={(e) => setNewUpdate(e.target.value)}
              />
            </div>
          )}

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
  const { toast } = useToast();
  
  const [projectsSnapshot, loadingProjects, errorProjects] = useCollection(
    collection(firestore, 'projects')
  );
  const [clientsSnapshot, loadingClients, errorClients] = useCollection(
    collection(firestore, 'client_profiles')
  );

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

  const projects = projectsSnapshot?.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Project)
  );

  const clients = clientsSnapshot?.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Client)
  );

  const loading = loadingProjects || loadingClients;
  const error = errorProjects || errorClients;
  
  const handleDeleteProject = async (projectId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'projects', projectId));
      toast({
        title: 'Project Deleted',
        description: 'The project has been successfully deleted.',
      });
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Deletion Failed',
        description: e.message,
      });
    }
  };

  const handleOpenNewDialog = () => {
    setEditingProject(null);
    setIsNewProjectDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setEditingProject(null);
    setIsNewProjectDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Update timelines, post progress, and change statuses.
          </p>
        </div>
        <Button onClick={handleOpenNewDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
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
                <TableHead className="text-right">Actions</TableHead>
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
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProject(project)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the project
                              and all its associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
      
      {clients && (isNewProjectDialogOpen || editingProject) && (
        <ProjectDialog
          project={editingProject}
          isOpen={isNewProjectDialogOpen || !!editingProject}
          onClose={handleCloseDialog}
          clients={clients}
        />
      )}
    </div>
  );
}
