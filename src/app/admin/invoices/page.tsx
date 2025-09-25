

'use client';
import { useState } from 'react';
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
  DialogTrigger,
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
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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
};


function NewQuotationDialog({ clients }: { clients: Client[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [status, setStatus] = useState<'Paid' | 'Due' | 'Overdue'>('Due');
  const [currency, setCurrency] = useState('INR');
  const [items, setItems] = useState<QuotationItem[]>([
    { description: '', quantity: 1, price: 0 },
  ]);
  const firestore = useFirestore();
  const { toast } = useToast();

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

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
  }

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

    try {
        await addDoc(collection(firestore, 'quotations'), {
            userId: selectedClient.userId,
            clientId: selectedClientId,
            clientName: selectedClient.name,
            clientEmail: selectedClient.email,
            amount: totalAmount,
            currency: currency,
            status,
            date: new Date().toISOString(),
            dueDate: dueDate.toISOString(),
            items,
            createdAt: serverTimestamp(),
        });

        toast({
            title: "Quotation Created",
            description: "The new quotation has been successfully created and saved."
        });
        setIsOpen(false);
        // Reset form
        setSelectedClientId('');
        setDueDate(undefined);
        setStatus('Due');
        setCurrency('INR');
        setItems([{ description: '', quantity: 1, price: 0 }]);

    } catch (e: any) {
        toast({
            variant: "destructive",
            title: "Creation Failed",
            description: e.message
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Quotation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>New Quotation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Quotation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default function AdminQuotationsPage() {
    const firestore = useFirestore();
    const [quotationsSnapshot, loadingQuotations, errorQuotations] = useCollection(
        collection(firestore, 'quotations')
    );
    const [clientsSnapshot, loadingClients, errorClients] = useCollection(
        collection(firestore, 'clients')
    );

    const quotations = quotationsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quotation));
    const clients = clientsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
    const loading = loadingQuotations || loadingClients;
    
    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
        }).format(amount);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-headline text-3xl font-bold">Quotation Management</h1>
                    <p className="text-muted-foreground">Create and manage all client quotations.</p>
                </div>
                {clients && <NewQuotationDialog clients={clients} />}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Quotations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Quotation ID</TableHead>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">Loading quotations...</TableCell>
                                </TableRow>
                            )}
                            {errorQuotations && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-destructive">Error: {errorQuotations.message}</TableCell>
                                </TableRow>
                            )}
                            {quotations?.map(quotation => (
                                <TableRow key={quotation.id}>
                                    <TableCell className="font-mono">{quotation.id}</TableCell>
                                    <TableCell>{quotation.clientName}</TableCell>
                                    <TableCell>{formatCurrency(quotation.amount, quotation.currency || 'INR')}</TableCell>
                                    <TableCell>{new Date(quotation.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={quotation.status === 'Paid' ? 'secondary' : (quotation.status === 'Overdue' ? 'destructive' : 'default')}
                                            className={quotation.status === 'Due' ? 'bg-amber-500' : ''}
                                        >
                                            {quotation.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                             {quotations && quotations.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No quotations found.</TableCell>
                                </TableRow>
                             )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
