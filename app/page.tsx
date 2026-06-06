"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { TESTIMONIALS, FAQS } from '@/lib/data';
import { 
  Terminal, 
  Code2, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Star, 
  ExternalLink,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function HomePage() {
  const stats = [
    { value: '450k+', label: 'Requests Tested', icon: Terminal },
    { value: '14,200+', label: 'Snippets Copied', icon: Code2 },
    { value: '99.99%', label: 'Sandbox Uptime', icon: Zap },
    { value: '2.8ms', label: 'Average Latency', icon: Cpu },
  ];

  const tools = [
    {
      title: 'Code Snippet Repository',
      description: 'Find, copy, and contribute secure functions, hooks, and classes. Filter by language, tags, and difficulty.',
      href: '/snippets',
      icon: Code2,
      badge: 'Interactive',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      actionText: 'Browse Snippets'
    },
    {
      title: 'Live API Client Tester',
      description: 'A fully client-side REST client to test GET, POST, PUT, and DELETE cycles against local services or public APIs.',
      href: '/api-tester',
      icon: Terminal,
      badge: 'Live Sandbox',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      actionText: 'Launch Client'
    },
    {
      title: 'Project Cost Estimator',
      description: 'An algorithmic calculator that generates highly detailed, PDF-style estimates with custom timeline factors.',
      href: '/estimator',
      icon: Calculator,
      badge: 'Algorithmic',
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      actionText: 'Calculate Cost'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b bg-gradient-to-b from-background to-muted/20">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container relative z-10 max-w-5xl text-center space-y-6">
          <Badge variant="outline" className="px-3 py-1 bg-background text-primary gap-1.5 text-xs font-mono">
            <Zap className="h-3.5 w-3.5 text-primary fill-primary animate-pulse" />
            V1.4.0 Engine Release
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
            The Ultimate Tool suite for <br />
            <span className="bg-gradient-to-r from-primary via-slate-600 to-muted-foreground bg-clip-text text-transparent">
              Modern Web Developers
            </span>
          </h1>
          
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Accelerate your development cycle. Test APIs on the fly, manage clean code snippets, and generate professional client cost breakdowns in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button asChild size="lg" className="font-semibold gap-2 shadow-lg shadow-primary/10">
              <Link href="/api-tester">
                Launch API Client
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link href="/estimator">
                Calculate Project Cost
              </Link>
            </Button>
          </div>

          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure Sandbox
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% Client-Side Requests
            </span>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-b bg-card py-10">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-1 p-2">
                  <div className="flex justify-center mb-1">
                    <Icon className="h-5 w-5 text-muted-foreground/80" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Tool Suite Previews */}
      <section className="container max-w-5xl py-20 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="outline" className="px-3 py-1 bg-background text-primary">
            Developer Ecosystem
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Designed to optimize your workflow
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Stop switching context. Everything you need to write, test, and price your custom software architecture is integrated into a unified portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Card key={i} className="flex flex-col h-full border hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`p-2.5 rounded-lg border ${tool.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      {tool.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold">{tool.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <div className="p-6 pt-0 border-t bg-muted/10">
                  <Button asChild variant="ghost" size="sm" className="w-full justify-between text-xs font-semibold hover:bg-background">
                    <Link href={tool.href}>
                      <span>{tool.actionText}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Embedded Feature Highlights */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <Badge variant="outline" className="bg-background text-primary">
                Built-in Sandbox Endpoint
              </Badge>
              <h3 className="text-3xl font-extrabold tracking-tight">
                Need a quick sandbox REST API for your client prototypes?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We have built a dedicated mock API endpoint right into this application. It supports standard GET queries, POST additions, PUT updates, and DELETE validation logs. Perfect for demonstrating dynamic list state rendering!
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Supports category filtering: <code className="font-mono bg-background px-1 py-0.5 rounded">?category=hardware</code></span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Returns detailed JSON timestamps, parsed request headers, and custom ID generation.</span>
                </div>
              </div>

              <div className="pt-3">
                <Button asChild variant="outline" size="sm">
                  <Link href="/api/mock-endpoint" target="_blank" className="gap-1.5 font-semibold">
                    View Live JSON <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-slate-950 text-slate-100 p-6 rounded-xl border border-slate-800 font-mono text-xs space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 border-b border-slate-800">
                <span>GET /api/mock-endpoint?category=software</span>
                <span className="text-emerald-400">200 OK</span>
              </div>
              <pre className="overflow-x-auto leading-relaxed max-h-[220px] text-[11px] text-slate-300">
{`{
  "success": true,
  "timestamp": "2024-10-24T12:00:00.000Z",
  "method": "GET",
  "count": 2,
  "data": [
    {
      "id": 102,
      "name": "SaaS Dashboard Starter Kit",
      "category": "software",
      "price": 89.00
    },
    {
      "id": 103,
      "name": "Neural Network Optimizer",
      "category": "software",
      "price": 299.00
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container max-w-5xl py-20 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="outline" className="px-3 py-1 bg-background text-primary">
            Trusted Worldwide
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight">
            What engineering leaders are saying
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Real developers and product managers rely on our sandbox utility suite to streamline their planning cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col border bg-card hover:shadow-sm transition-shadow">
              <CardHeader className="pb-3 flex flex-row items-center gap-3">
                <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-sm text-foreground">{testimonial.name}</h4>
                  <p className="text-[11px] text-muted-foreground">
                    {testimonial.role}, <span className="font-semibold">{testimonial.company}</span>
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-1 text-xs text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </CardContent>
              <div className="px-6 pb-4 pt-2 border-t bg-muted/5 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t bg-muted/10 py-20" id="faq-section">
        <div className="container max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="px-3 py-1 bg-background text-primary">
              FAQ
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Get answers to our sandboxing architecture, calculator algorithms, and custom code licensing.
            </p>
          </div>

          <Card className="border p-6 bg-card">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, index) => (
                <AccordionItem key={faq.id} value={`faq-${index}`} className={index === FAQS.length - 1 ? "border-b-0" : ""}>
                  <AccordionTrigger className="text-sm font-bold text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-primary to-black opacity-40 pointer-events-none" />
        <div className="container relative z-10 max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to supercharge your developer workflow?
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Bookmark our code snippet repository, test your mock API JSON inputs, or configure a detailed invoice breakdown instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="lg" variant="secondary" className="font-semibold gap-1.5">
              <Link href="/api-tester">
                Launch API Client
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">
              <Link href="/contact">
                Contact Engineering
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
