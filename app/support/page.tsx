"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  Cpu 
} from "lucide-react";
import { toast } from "sonner";

export default function SupportPage() {
  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneModel, setPhoneModel] = useState("");
  const [issueType, setIssueType] = useState("Shattered Screen");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM - 12:00 PM");
  const [location, setLocation] = useState("Phonix Express Hub - Manhattan, NY");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    bookingReference: string;
    fullName: string;
    phoneModel: string;
    issueType: string;
    date: string;
    timeSlot: string;
    location: string;
  } | null>(null);

  const issues = [
    "Shattered Screen",
    "Battery Degradation / Fast Drain",
    "Water Damage Recovery",
    "Camera Fault / Lens Replacement",
    "Charging Port / USB-C Failure",
    "Speaker / Mic Distortion",
    "Software Bootloop / Recovery",
    "General Diagnostics"
  ];

  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM"
  ];

  const locations = [
    "Phonix Express Hub - Manhattan, NY",
    "Phonix Express Hub - Brooklyn, NY",
    "Phonix Express Hub - Los Angeles, CA",
    "Phonix Express Hub - San Francisco, CA",
    "Phonix Express Hub - Chicago, IL",
    "Phonix Mail-In Repair Center (Free Shipping Box)"
  ];

  const handleBookRepair = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phoneModel || !date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneModel,
          issueType,
          date,
          timeSlot,
          location,
          notes
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBookingConfirmation({
          bookingReference: data.bookingReference,
          fullName: data.fullName,
          phoneModel: data.phoneModel,
          issueType: data.issueType,
          date: data.date,
          timeSlot: data.timeSlot,
          location: data.location,
        });
        toast.success("Repair appointment booked successfully!");
        // Clear form
        setFullName("");
        setEmail("");
        setPhoneModel("");
        setNotes("");
      } else {
        toast.error(data.error || "Failed to book appointment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold px-3 py-1">
          CERTIFIED REPAIR & SUPPORT
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-2">
          <Wrench className="h-8 w-8 text-primary" />
          <span>Support & Repair Center</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Book an express appointment at one of our certified hubs, or choose our free mail-in service. Average in-person repair time is only 20 minutes!
        </p>
      </div>

      {/* Grid: Form and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Booking Form */}
        <div className="lg:col-span-7">
          {bookingConfirmation ? (
            <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-lg overflow-hidden animate-in fade-in duration-300">
              <div className="bg-emerald-500 text-white p-4 text-center text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5">
                <CheckCircle className="h-4 w-4" />
                <span>Appointment Confirmed!</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Your Booking Reference</p>
                  <code className="text-lg font-mono font-bold bg-background px-4 py-2 rounded-xl border text-primary tracking-widest inline-block">
                    {bookingConfirmation.bookingReference}
                  </code>
                </div>

                <div className="border-t border-b py-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">Client Name:</span>
                    <span className="font-bold text-foreground">{bookingConfirmation.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">Device Model:</span>
                    <span className="font-bold text-foreground">{bookingConfirmation.phoneModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">Reported Issue:</span>
                    <span className="font-bold text-foreground text-destructive">{bookingConfirmation.issueType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">Date:</span>
                    <span className="font-bold text-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {bookingConfirmation.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">Time Window:</span>
                    <span className="font-bold text-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {bookingConfirmation.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">Location:</span>
                    <span className="font-bold text-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {bookingConfirmation.location}
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    A confirmation email has been sent with directions, packaging instructions (for mail-in), and parking guidelines. Please bring your booking code with you.
                  </p>
                  <Button 
                    onClick={() => setBookingConfirmation(null)} 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs font-bold"
                  >
                    Book Another Repair
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-muted/60">
              <CardHeader>
                <CardTitle className="text-lg">Schedule a Repair</CardTitle>
                <CardDescription className="text-xs">
                  Fill in your details, select your device issue, and pick a convenient time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBookRepair} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">Full Name *</label>
                      <Input
                        placeholder="e.g. John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-xs"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">Smartphone Model *</label>
                      <Input
                        placeholder="e.g. iPhone 15 Pro Max, Galaxy S24"
                        value={phoneModel}
                        onChange={(e) => setPhoneModel(e.target.value)}
                        className="text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">Reported Issue *</label>
                      <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border bg-background text-foreground"
                      >
                        {issues.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">Preferred Date *</label>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">Preferred Time Slot *</label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border bg-background text-foreground"
                      >
                        {timeSlots.map((ts) => (
                          <option key={ts} value={ts}>
                            {ts}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">Hub Location / Method *</label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border bg-background text-foreground"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">Additional Notes (Optional)</label>
                    <Textarea
                      placeholder="Please share any background info, like water exposure or if other parts are broken..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="text-xs min-h-[80px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-11 text-xs font-semibold gap-2 mt-2"
                    disabled={loading}
                  >
                    <Wrench className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                    <span>{loading ? "Booking Appointment..." : "Confirm Repair Appointment"}</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Side: Contact Cards & Repair Commitments */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Card */}
          <Card className="border-muted/60 bg-muted/20">
            <CardHeader>
              <CardTitle className="text-sm">Direct Customer Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <p className="text-muted-foreground">
                Need urgent help? Get in touch with our certified engineers via phone or email.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Phone Hotline</p>
                    <p className="text-muted-foreground">+1 (800) 555-PHONIX</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Email Support</p>
                    <p className="text-muted-foreground">support@phonix-store.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Main HQ Hub</p>
                    <p className="text-muted-foreground">100 Innovation Way, Suite 400, NY</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repair Commitments */}
          <Card className="border-muted/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                <span>Our Repair Guarantees</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">OEM Certified Parts</span>
                  We only use original manufacturer or premium equivalent parts for screens, batteries, and camera arrays.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">90-Day Service Warranty</span>
                  Every repair is backed by our comprehensive 90-day warranty. If anything goes wrong, we fix it for free.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">No Fix, No Fee</span>
                  If our diagnostic engineers cannot resolve the issue, you do not pay a single penny.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQs Section */}
      <section id="faqs" className="pt-8 border-t">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs text-muted-foreground">Have questions about orders, trade-ins, or repairs? We have answers.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-xs font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
