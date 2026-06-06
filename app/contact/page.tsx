"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Loader2, CheckCircle2, MessageSquare, AlertCircle, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('Custom Development');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any>(null);
  const [errorResponse, setErrorResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessResponse(null);
    setErrorResponse(null);

    // Dynamic front-end quick validation
    if (!name || !email || !subject || !message) {
      toast.error('Please verify all required fields are filled out correctly.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, department, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessResponse(data);
        toast.success('Inquiry submitted successfully!');
        
        // Reset fields
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setErrorResponse(data.message || 'There was an issue submitting your inquiry.');
        toast.error('Inquiry submission rejected.');
      }
    } catch (err: any) {
      setErrorResponse('Network connection error. Please try again.');
      toast.error('Network connection failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-5xl space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="px-3 py-1 bg-background text-primary">Get in Touch</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">Contact Our Engineering Team</h1>
          <p className="text-muted-foreground text-sm">
            Have a question about our live API sandboxes, custom snippets, or need a customized quote for your enterprise architecture? Drop us a line.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-6 bg-muted/40 p-6 rounded-xl border">
              <h3 className="font-bold text-lg">Corporate Headquarters</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our distributed engineering teams operate globally to maintain high-availability developer portals, custom sandbox tooling, and real-time support.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-background p-2 border shrink-0 text-primary">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Email Support</p>
                    <p className="text-xs font-semibold">devflow-support@devsuite-hub.io</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-background p-2 border shrink-0 text-primary">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Direct Hotline</p>
                    <p className="text-xs font-semibold">+1 (800) 555-FLOW</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-background p-2 border shrink-0 text-primary">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Office Hub</p>
                    <p className="text-xs font-semibold">San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Helper Widget */}
            <div className="bg-primary text-primary-foreground p-6 rounded-xl space-y-3">
              <h4 className="font-bold text-sm flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Response Commitment
              </h4>
              <p className="text-xs text-primary-foreground/80 leading-relaxed">
                Critical severity bugs, integration blockages, and custom invoice requests receive automated priority queue assignment. Average response is under 12 hours.
              </p>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="lg:col-span-8">
            <Card className="border shadow-sm h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Request Assistance
                </CardTitle>
                <CardDescription>
                  Your form coordinates are processed instantly with real-time server-side validation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Success Alert */}
                {successResponse && (
                  <Alert className="bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div className="ml-3">
                      <AlertTitle className="font-bold text-sm">Inquiry Received Successfully!</AlertTitle>
                      <AlertDescription className="text-xs mt-1 space-y-1">
                        <p>{successResponse.message}</p>
                        <p className="font-mono text-[11px] mt-2 bg-emerald-500/10 dark:bg-emerald-500/20 p-2 rounded">
                          Ticket ID: {successResponse.ticketId} | Estimated Wait: {successResponse.estimatedResponseTime}
                        </p>
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                {/* Error Alert */}
                {errorResponse && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <div className="ml-3">
                      <AlertTitle className="font-bold text-sm">Submission Failed</AlertTitle>
                      <AlertDescription className="text-xs mt-1">
                        {errorResponse}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Your Full Name *</Label>
                      <Input
                        id="contact-name"
                        placeholder="John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Corporate Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="john@company.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-subject">Inquiry Subject *</Label>
                      <Input
                        id="contact-subject"
                        placeholder="e.g. Custom API Quote"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-dept">Department Routing</Label>
                      <Select value={department} onValueChange={setDepartment} disabled={loading}>
                        <SelectTrigger id="contact-dept">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Custom Development">Custom Development</SelectItem>
                          <SelectItem value="Billing & Pricing">Billing &amp; Pricing</SelectItem>
                          <SelectItem value="Technical Integration Support">Technical Integration Support</SelectItem>
                          <SelectItem value="Urgent Escalation">Urgent Escalation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">Detailed Description *</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Describe your architectural requirements, project timelines, or specific query parameters..."
                      className="min-h-[140px]"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" className="w-full font-semibold gap-2" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        Submitting Ticket...
                      </>
                    ) : (
                      'Submit Secure Ticket'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
