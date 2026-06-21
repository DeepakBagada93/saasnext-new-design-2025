'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Sparkles, CheckCircle, ArrowLeft, Loader2, Send, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const services = [
  "Core OS Web Interface (Web Development)",
  "AI Intelligence Module (AI Agents & Automation)",
  "Growth & AEO Engine (SEO & Citations)",
  "Business Automation OS (Custom Software)"
];

const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

export default function BookPage() {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  // Generate next 5 business dates (skipping Sundays)
  useEffect(() => {
    const dates = [];
    const today = new Date();
    let count = 0;
    let daysOffset = 1;
    
    while (count < 5) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + daysOffset);
      
      // Skip Sundays (0)
      if (nextDate.getDay() !== 0) {
        dates.push(nextDate.toISOString().split('T')[0]);
        count++;
      }
      daysOffset++;
    }
    
    setAvailableDates(dates);
    setSelectedDate(dates[0]);
    setSelectedTimeSlot(timeSlots[0]);
  }, []);

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !whatsapp || !selectedService || !selectedDate || !selectedTimeSlot) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields."
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          service: selectedService,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          companyName,
          description
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookingConfirmation(data.bookingDetails);
        toast({
          title: "Booking Confirmed!",
          description: `Your booking ID is ${data.bookingDetails.bookingId}`
        });
      } else {
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: data.error || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to the booking server."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white relative overflow-hidden py-16 md:py-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000_90%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {!bookingConfirmation ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Heading */}
              <div className="text-center md:text-left mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm text-accent text-xs font-mono mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DIRECT SERVICE BOOKING</span>
                </div>
                <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                  Secure Your Growth Slot.
                </h1>
                <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
                  Choose a service module, pick a date & time slot, and tell us about your goals. We'll synchronize a strategy call with a lead automation engineer.
                </p>
              </div>

              {/* Booking Dashboard Form */}
              <form onSubmit={handleBooking} className="grid md:grid-cols-3 gap-8">
                
                {/* Step 1 & 2: Select Service and Slot */}
                <div className="md:col-span-2 space-y-6">
                  
                  {/* Service Selection */}
                  <Card className="border-white/5 bg-white/[0.01] backdrop-blur-xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs flex items-center justify-center font-mono">1</span>
                        Choose Service
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {services.map((service) => (
                        <div 
                          key={service}
                          onClick={() => setSelectedService(service)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                            selectedService === service 
                              ? 'border-accent bg-accent/5 text-white shadow-[0_0_15px_rgba(242,106,46,0.15)]'
                              : 'border-white/5 bg-white/[0.01] text-neutral-400 hover:border-white/10 hover:text-white'
                          }`}
                        >
                          <p className="font-semibold text-sm">{service}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Slot Selection */}
                  <Card className="border-white/5 bg-white/[0.01] backdrop-blur-xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs flex items-center justify-center font-mono">2</span>
                        Select Date & Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      
                      {/* Date Selector */}
                      <div className="space-y-2">
                        <Label className="text-xs font-mono uppercase text-neutral-500 tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> Date
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {availableDates.map((date) => (
                            <div
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                                selectedDate === date
                                  ? 'border-accent bg-accent/5 text-white font-bold'
                                  : 'border-white/5 bg-white/[0.01] text-neutral-400 hover:border-white/15'
                              }`}
                            >
                              <p className="text-xs uppercase font-bold tracking-wider">{formatDateLabel(date).split(',')[0]}</p>
                              <p className="text-sm font-semibold mt-1">{formatDateLabel(date).split(',')[1]}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Time Slot Selector */}
                      <div className="space-y-2">
                        <Label className="text-xs font-mono uppercase text-neutral-500 tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Time (IST)
                        </Label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {timeSlots.map((slot) => (
                            <div
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                                selectedTimeSlot === slot
                                  ? 'border-accent bg-accent/5 text-white font-bold'
                                  : 'border-white/5 bg-white/[0.01] text-neutral-400 hover:border-white/15'
                              }`}
                            >
                              <p className="text-xs font-semibold">{slot}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </CardContent>
                  </Card>

                </div>

                {/* Step 3: Contact Info & Book */}
                <div className="md:col-span-1 space-y-6">
                  
                  <Card className="border-white/5 bg-white/[0.01] backdrop-blur-xl h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs flex items-center justify-center font-mono">3</span>
                        Your Info
                      </CardTitle>
                      <CardDescription>We will send confirmation to this info.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs text-neutral-400">Full Name *</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Deepak Bagada" 
                          required 
                          className="bg-black/50 border-white/10 focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs text-neutral-400">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="connect@saasnext.in" 
                          required 
                          className="bg-black/50 border-white/10 focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="whatsapp" className="text-xs text-neutral-400">WhatsApp / Phone *</Label>
                        <Input 
                          id="whatsapp" 
                          value={whatsapp} 
                          onChange={(e) => setWhatsapp(e.target.value)} 
                          placeholder="+91 7016179234" 
                          required 
                          className="bg-black/50 border-white/10 focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-xs text-neutral-400">Company Name (Optional)</Label>
                        <Input 
                          id="company" 
                          value={companyName} 
                          onChange={(e) => setCompanyName(e.target.value)} 
                          placeholder="SaaSNext Corp" 
                          className="bg-black/50 border-white/10 focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="desc" className="text-xs text-neutral-400">Project Brief (Optional)</Label>
                        <Textarea 
                          id="desc" 
                          value={description} 
                          onChange={(e) => setDescription(e.target.value)} 
                          placeholder="Tell us about your project or business goals." 
                          rows={3}
                          className="bg-black/50 border-white/10 focus:border-accent resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full mt-6 bg-accent hover:bg-accent/90 text-white py-6 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Locking Slot...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Book Service Slot
                          </>
                        )}
                      </Button>

                    </CardContent>
                  </Card>

                </div>

              </form>
            </motion.div>
          ) : (
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto"
            >
              <Card className="border-accent/20 bg-neutral-900/40 backdrop-blur-2xl p-8 text-center space-y-6">
                
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-headline font-bold text-white">Booking Confirmed!</h2>
                  <p className="text-neutral-400">Your slot is officially locked. Here are your booking details.</p>
                </div>

                <div className="p-6 rounded-2xl bg-black/60 border border-white/5 text-left space-y-4 font-mono text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-500">Booking ID:</span>
                    <span className="text-accent font-bold">{bookingConfirmation.bookingId}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-500">Service:</span>
                    <span className="text-white text-right max-w-[250px] truncate">{bookingConfirmation.service}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-500">Scheduled Date:</span>
                    <span className="text-white">{formatDateLabel(bookingConfirmation.date)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-500">Time Slot:</span>
                    <span className="text-white">{bookingConfirmation.timeSlot} (IST)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-500">Client Name:</span>
                    <span className="text-white">{bookingConfirmation.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">WhatsApp:</span>
                    <span className="text-white">{bookingConfirmation.whatsapp}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-accent/5 border border-accent/15 text-xs text-left leading-relaxed text-neutral-300">
                  <p className="font-bold text-accent uppercase tracking-wider mb-1">💡 What happens next?</p>
                  <ul className="list-disc list-inside space-y-1">
                    {bookingConfirmation.nextSteps.map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button asChild className="flex-1 bg-accent hover:bg-accent/90 py-5 rounded-xl font-bold">
                    <Link href="/">Return to Homepage</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-grow border-white/10 hover:bg-white/5 py-5 rounded-xl font-bold flex items-center gap-2">
                    <a href="https://wa.me/917016179234" target="_blank" rel="noopener noreferrer">
                      <PhoneCall className="w-4 h-4" /> Whatsapp Support
                    </a>
                  </Button>
                </div>

              </Card>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
