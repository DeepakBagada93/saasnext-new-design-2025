'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Edit, Plus, Trash2, Loader2 } from "lucide-react";
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { usePackages, Package } from "@/hooks/use-packages";
import { useSupabase } from "@/supabase/provider";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminPackagesPage() {
    const { groupedPlans: pricingPlans, isLoading, refetch } = usePackages();
    const { supabase } = useSupabase();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [currentPackage, setCurrentPackage] = useState<Partial<Package>>({});
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (pkg: Package) => {
        setCurrentPackage({ ...pkg });
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setCurrentPackage({
            category: 'Web Development',
            title: '',
            price: '',
            price_usd: '',
            description: '',
            features: [],
            cta: 'Get Started',
            popular: false,
            sort_order: 100
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this package?')) return;
        
        try {
            const { error } = await supabase.from('packages').delete().eq('id', id);
            if (error) throw error;
            toast({ title: 'Package Deleted' });
            refetch();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error deleting package', description: error.message });
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            if (currentPackage.id) {
                // Update
                const { error } = await supabase.from('packages').update(currentPackage).eq('id', currentPackage.id);
                if (error) throw error;
                toast({ title: 'Package Updated' });
            } else {
                // Insert
                const { error } = await supabase.from('packages').insert([currentPackage]);
                if (error) throw error;
                toast({ title: 'Package Created' });
            }
            setIsEditing(false);
            refetch();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error saving package', description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...(currentPackage.features || [])];
        newFeatures[index] = value;
        setCurrentPackage({ ...currentPackage, features: newFeatures });
    };

    const addFeature = () => {
        setCurrentPackage({ ...currentPackage, features: [...(currentPackage.features || []), ''] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...(currentPackage.features || [])];
        newFeatures.splice(index, 1);
        setCurrentPackage({ ...currentPackage, features: newFeatures });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-headline text-3xl font-bold">Manage Packages</h1>
                    <p className="text-muted-foreground">
                        Create, edit, and organize the pricing packages displayed to clients.
                    </p>
                </div>
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogTrigger asChild>
                        <Button onClick={handleCreateNew}><Plus className="w-4 h-4 mr-2" /> Add Package</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{currentPackage.id ? 'Edit Package' : 'Create Package'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Input required value={currentPackage.category || ''} onChange={e => setCurrentPackage({...currentPackage, category: e.target.value})} placeholder="e.g. Web Development" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input required value={currentPackage.title || ''} onChange={e => setCurrentPackage({...currentPackage, title: e.target.value})} placeholder="e.g. Starter Site" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Price (INR)</Label>
                                    <Input required value={currentPackage.price || ''} onChange={e => setCurrentPackage({...currentPackage, price: e.target.value})} placeholder="e.g. ₹5,000 – ₹15,000" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Price (USD)</Label>
                                    <Input required value={currentPackage.price_usd || ''} onChange={e => setCurrentPackage({...currentPackage, price_usd: e.target.value})} placeholder="e.g. $60 - $180" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea required value={currentPackage.description || ''} onChange={e => setCurrentPackage({...currentPackage, description: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Call to Action Button Text</Label>
                                    <Input required value={currentPackage.cta || ''} onChange={e => setCurrentPackage({...currentPackage, cta: e.target.value})} placeholder="e.g. Get Started" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sort Order (Lower appears first)</Label>
                                    <Input type="number" required value={currentPackage.sort_order || 0} onChange={e => setCurrentPackage({...currentPackage, sort_order: parseInt(e.target.value)})} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="popular" checked={currentPackage.popular || false} onChange={e => setCurrentPackage({...currentPackage, popular: e.target.checked})} className="w-4 h-4" />
                                <Label htmlFor="popular">Mark as "Most Popular"</Label>
                            </div>
                            
                            <div className="space-y-2 border-t pt-4 mt-4">
                                <Label className="flex justify-between items-center">
                                    Features List
                                    <Button type="button" variant="outline" size="sm" onClick={addFeature}><Plus className="w-3 h-3 mr-1" /> Add Feature</Button>
                                </Label>
                                {currentPackage.features?.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input value={feature} onChange={e => updateFeature(index, e.target.value)} placeholder={`Feature ${index + 1}`} />
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeFeature(index)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button type="submit" disabled={isSaving}>{isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Save Package</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {pricingPlans?.map((category) => (
                <div key={category.category}>
                    <h2 className="font-headline text-2xl font-bold mb-6">{category.category}</h2>
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      {category.plans.map(plan => (
                          <Card key={plan.id} className={cn(
                              "flex flex-col h-full relative group",
                              plan.popular ? "border-primary ring-2 ring-primary" : "border"
                          )}>
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 bg-background/80 backdrop-blur rounded p-1">
                                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(plan)}>
                                      <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(plan.id)}>
                                      <Trash2 className="h-4 w-4" />
                                  </Button>
                              </div>
                              {plan.popular && <div className="text-center py-1 px-4 bg-primary text-primary-foreground text-sm font-semibold rounded-t-lg">Most Popular</div>}
                              <CardHeader className="text-center">
                                  <CardTitle className="text-2xl font-headline">{plan.title}</CardTitle>
                                  <CardDescription>{plan.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="flex-grow space-y-6">
                                  <div className="text-center">
                                      <span className="text-3xl font-bold">{plan.price}</span>
                                      <div className="text-sm text-muted-foreground mt-1">{plan.price_usd}</div>
                                  </div>
                                  <ul className="space-y-3 text-muted-foreground">
                                      {plan.features.map((feature, i) => (
                                          <li key={i} className="flex items-start">
                                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                              <span>{feature}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </CardContent>
                          </Card>
                      ))}
                    </div>
                </div>
            ))}
            
            {(!pricingPlans || pricingPlans.length === 0) && (
                <div className="text-center py-12 border rounded-lg border-dashed">
                    <p className="text-muted-foreground">No packages found. Click "Add Package" to create one.</p>
                </div>
            )}
        </div>
    );
}
