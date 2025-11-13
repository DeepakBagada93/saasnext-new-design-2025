
'use client';
import { useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFirestore } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, X, Edit, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
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

type Client = {
  id: string;
  name: string;
  userId: string;
  email: string;
};

type QuotationItem = {
  description: string;
  quantity: number;
  price: number;
};

type Quotation = {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Due' | 'Overdue';
  dueDate: string;
  date: string;
  items: QuotationItem[];
  upiId?: string;
};

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
}


function QuotationDialog({ 
    isOpen, 
    onClose, 
    clients, 
    quotation 
}: { 
    isOpen: boolean, 
    onClose: () => void, 
    clients: Client[], 
    quotation?: Quotation | null 
}) {
  const [selectedClientId, setSelectedClientId] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [status, setStatus] = useState<'Paid' | 'Due' | 'Overdue'>('Due');
  const [currency, setCurrency] = useState('INR');
  const [upiId, setUpiId] = useState('');
  const [items, setItems] = useState<QuotationItem[]>([
    { description: '', quantity: 1, price: 0 },
  ]);
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const isEditing = !!quotation;

  useEffect(() => {
    if (isEditing && quotation) {
        setSelectedClientId(quotation.clientId);
        setDueDate(new Date(quotation.dueDate));
        setStatus(quotation.status);
        setCurrency(quotation.currency);
        setUpiId(quotation.upiId || '');
        setItems(quotation.items);
    } else {
        // Reset form for new quotation
        setSelectedClientId('');
        setDueDate(undefined);
        setStatus('Due');
        setCurrency('INR');
        setUpiId('');
        setItems([{ description: '', quantity: 1, price: 0 }]);
    }
  }, [quotation, isEditing, isOpen]);


  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: keyof QuotationItem, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleSubmit = async () => {
    if (!selectedClientId || !dueDate || items.some(item => !item.description || item.price <= 0)) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please select a client, due date, and fill all item details."
        });
        return;
    }

    const selectedClient = clients.find(c => c.id === selectedClientId);
    if (!selectedClient) return;

    const totalAmount = calculateTotalAmount();

    const quotationData = {
        userId: selectedClient.userId,
        clientId: selectedClientId,
        clientName: selectedClient.name,
        clientEmail: selectedClient.email,
        amount: totalAmount,
        currency: currency,
        status,
        dueDate: dueDate.toISOString(),
        items,
        upiId,
    };

    try {
        if (isEditing && quotation) {
            const quotationRef = doc(firestore, 'quotations', quotation.id);
            await updateDoc(quotationRef, {
                ...quotationData,
            });
            toast({
                title: "Quotation Updated",
                description: "The quotation has been successfully updated."
            });
        } else {
            await addDoc(collection(firestore, 'quotations'), {
                ...quotationData,
                date: new Date().toISOString(),
                createdAt: serverTimestamp(),
            });

            toast({
                title: "Quotation Created",
                description: "The new quotation has been successfully created and saved."
            });
        }
        
        onClose();

    } catch (e: any) {
        toast({
            variant: "destructive",
            title: isEditing ? "Update Failed" : "Creation Failed",
            description: e.message
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Quotation' : 'New Quotation'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label htmlFor="client">Client</Label>
                    <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                    <SelectTrigger id="client">
                        <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                        {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                            {client.name}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !dueDate && "text-muted-foreground"
                            )}
                            >
                            {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={dueDate}
                            onSelect={setDueDate}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Due">Due</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                    </Select>
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

            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="your-upi-id@okhdfcbank"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 pt-4">
                <Label>Quotation Items</Label>
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input 
                                placeholder="Item description"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                className="flex-grow"
                            />
                             <Input 
                                type="number"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                                className="w-20"
                            />
                             <Input 
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                                className="w-24"
                            />
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)} disabled={items.length <= 1}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                 <Button variant="outline" size="sm" onClick={handleAddItem} className="mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                </Button>
            </div>
            <div className="flex justify-end pt-4 font-medium">
                Total Amount: {formatCurrency(calculateTotalAmount(), currency)}
            </div>

        </div>
        <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? 'Save Changes' : 'Create Quotation'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default function AdminQuotationsPage() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);

    const [quotationsSnapshot, loadingQuotations, errorQuotations] = useCollection(
        collection(firestore, 'quotations')
    );
    const [clientsSnapshot, loadingClients, errorClients] = useCollection(
        collection(firestore, 'client_profiles')
    );

    const quotations = quotationsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quotation));
    const clients = clientsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
    const loading = loadingQuotations || loadingClients;
    
    const handleOpenNewDialog = () => {
        setEditingQuotation(null);
        setIsDialogOpen(true);
    }

    const handleOpenEditDialog = (quotation: Quotation) => {
        setEditingQuotation(quotation);
        setIsDialogOpen(true);
    }

    const handleDeleteQuotation = async (quotationId: string) => {
        try {
            await deleteDoc(doc(firestore, 'quotations', quotationId));
            toast({
                title: "Quotation Deleted",
                description: "The quotation has been successfully deleted.",
            });
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Deletion Failed',
                description: e.message,
            });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-headline text-3xl font-bold">Quotation Management</h1>
                    <p className="text-muted-foreground">Create and manage all client quotations.</p>
                </div>
                {clients && (
                    <Button onClick={handleOpenNewDialog}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Quotation
                    </Button>
                )}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Quotations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden sm:table-cell">Quotation ID</TableHead>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">Loading quotations...</TableCell>
                                </TableRow>
                            )}
                            {errorQuotations && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-destructive">Error: {errorQuotations.message}</TableCell>
                                </TableRow>
                            )}
                            {quotations?.map(quotation => (
                                <TableRow key={quotation.id}>
                                    <TableCell className="font-mono text-xs hidden sm:table-cell">{quotation.id}</TableCell>
                                    <TableCell>{quotation.clientName}</TableCell>
                                    <TableCell>{formatCurrency(quotation.amount, quotation.currency || 'INR')}</TableCell>
                                    <TableCell className="hidden md:table-cell">{new Date(quotation.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={quotation.status === 'Paid' ? 'secondary' : (quotation.status === 'Overdue' ? 'destructive' : 'default')}
                                            className={quotation.status === 'Due' ? 'bg-amber-500' : ''}
                                        >
                                            {quotation.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(quotation)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the quotation.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-destructive hover:bg-destructive/90"
                                                        onClick={() => handleDeleteQuotation(quotation.id)}
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                             {quotations && quotations.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">No quotations found.</TableCell>
                                </TableRow>
                             )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {clients && (
                <QuotationDialog 
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    clients={clients}
                    quotation={editingQuotation}
                />
            )}
        </div>
    );
}
