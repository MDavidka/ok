"use client";

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

export default function ContactPage() {
  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit message.');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setSubject('general');
      setTimeout(() => setSuccess(false), 5000); // Reset success banner after 5s
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "Are the smartphones sold on Phonex brand new and authentic?",
      answer: "Yes, absolutely. Every device sold on Phonex is 100% brand new, factory sealed, and completely original. We are authorized premium dealers for Apple, Samsung, Google, and OnePlus. Devices come with original boxes, accessories, and a full 2-Year limited warranty."
    },
    {
      question: "How long does express shipping take?",
      answer: "We offer Free Express Shipping on all orders over $499. Orders are shipped from our California fulfillment center using premium couriers (FedEx/UPS). If you place your order before 3:00 PM EST, it will be dispatched the same day and typically arrives within 2 business days. Signature is required upon delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-Day No-Questions-Asked return policy. If you are not completely satisfied with your smartphone, you can return it within 30 days of delivery for a full refund. The device must be in original condition with all packaging materials. We will provide a prepaid insured return shipping label."
    },
    {
      question: "Do you offer trade-in or interest-free installments?",
      answer: "Currently, we support simulated direct checkout with Credit Card, Apple Pay, Google Pay, and Crypto. We plan to launch our trade-in program next quarter, allowing you to swap your older smartphone for instant store credits."
    },
    {
      question: "How does the side-by-side comparison matrix work?",
      answer: "Our comparison matrix allows you to select up to three smartphones from our catalog and view their detailed technical specifications (like camera sensors, battery capacity, screen brightness, charging speeds, and dimensions) side-by-side. This helps you analyze the exact differences and choose the perfect model."
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <Badge variant="outline" className="text-xs font-bold text-primary px-3 py-1 border-primary/20">
          Phonex Support Center
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          How Can We Help You?
        </h1>
        <p className="text-muted-foreground text-sm">
          Submit a support query, explore our comprehensive technical FAQs, or call our flagship store directly. Our experts are available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left Column: Contact Details & Store Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-md space-y-6">
            <h3 className="font-bold text-lg border-b border-slate-800 pb-3">Flagship Location</h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Phonex California</p>
                  <p>742 Evergreen Terrace, Tech District, CA 94016</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Phone className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Customer Hotline</p>
                  <p>1-800-PHONEX (746-639)</p>
                  <p className="text-[11px] text-slate-400">Toll-free, 24/7 dedicated support</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Mail className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Email Address</p>
                  <p>support@phonex-store.com</p>
                  <p className="text-[11px] text-slate-400">Response within 4 hours</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Clock className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Store Hours</p>
                  <p>Mon - Fri: 9:00 AM - 9:00 PM</p>
                  <p>Sat - Sun: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Fake Map Placeholder */}
            <div className="border border-slate-800 rounded-xl bg-slate-950 p-4 text-center space-y-2">
              <div className="h-24 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 border border-slate-800">
                <MapPin className="h-8 w-8 text-blue-500 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-400">Interactive Map View. Click to open in Google Maps.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-8 bg-white border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> Send Us a Message
            </h3>
            <p className="text-xs text-slate-500 mt-1">Fill out the form below and our customer care team will reach out to you.</p>
          </div>

          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">Message Sent Successfully!</p>
                <p className="font-normal mt-0.5 text-slate-600">Thank you for contacting us. We have received your query and will reply within 4 hours.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs font-semibold flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmitContact} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Your Name</label>
                <Input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Email Address</label>
                <Input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Inquiry Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border rounded-md p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-medium text-slate-800"
              >
                <option value="general">🙋 General Inquiry / Sales Question</option>
                <option value="shipping">🚚 Shipping & Delivery Status</option>
                <option value="warranty">🛡️ Warranty Claim or Technical Support</option>
                <option value="business">💼 Bulk Business Ordering</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Detailed Message</label>
              <Textarea
                placeholder="How can our phone experts assist you? Describe your question in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 h-11 gap-2 bg-slate-900 hover:bg-primary text-white"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Secure Message
                </>
              )}
            </Button>
          </form>
        </div>

      </div>

      {/* Accordion FAQ Section */}
      <div className="border-t pt-16 max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <div className="p-2 bg-blue-50 text-primary w-fit rounded-full mx-auto">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-sm">Quick answers to common questions about our store.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="border rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors gap-4"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-sm text-slate-600 border-t bg-slate-50/50 leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
