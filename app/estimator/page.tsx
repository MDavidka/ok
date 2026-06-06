"use client";

import React, { useState, useMemo } from 'react';
import { ESTIMATION_FACTORS, PROMO_CODES } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Calculator, Check, FileText, Sparkles, AlertCircle, HelpCircle, ArrowRight, Printer, RefreshCw, Percent } from 'lucide-react';

export default function EstimatorPage() {
  // Selection states
  const [selectedPlatform, setSelectedPlatform] = useState<string>('web');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth', 'database']);
  const [selectedDesign, setSelectedDesign] = useState<string>('clean');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('standard');
  
  // Promo code states
  const [promoInput, setPromoInput] = useState('');
  const [activePromo, setActivePromo] = useState<{ code: string; discount: number } | null>(null);

  // Client info for receipt personalization
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');

  // Toggles a feature
  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Find selected objects
  const platformObj = useMemo(() => {
    return ESTIMATION_FACTORS.platforms.find(p => p.id === selectedPlatform)!;
  }, [selectedPlatform]);

  const featuresObjList = useMemo(() => {
    return ESTIMATION_FACTORS.features.filter(f => selectedFeatures.includes(f.id));
  }, [selectedFeatures]);

  const designObj = useMemo(() => {
    return ESTIMATION_FACTORS.designs.find(d => d.id === selectedDesign)!;
  }, [selectedDesign]);

  const urgencyObj = useMemo(() => {
    return ESTIMATION_FACTORS.urgency.find(u => u.id === selectedUrgency)!;
  }, [selectedUrgency]);

  // Calculations
  const calculations = useMemo(() => {
    const platformCost = platformObj.cost;
    const featuresCost = featuresObjList.reduce((acc, curr) => acc + curr.cost, 0);
    const subtotal = platformCost + featuresCost;
    
    // Multipliers
    const designMultiplier = designObj.multiplier;
    const urgencyMultiplier = urgencyObj.multiplier;
    
    let total = subtotal * designMultiplier * urgencyMultiplier;
    
    // Promo discounts
    let discountAmount = 0;
    if (activePromo) {
      if (activePromo.code === 'SUPERPHONE') {
        discountAmount = 50; // Flat discount
      } else {
        discountAmount = total * (activePromo.discount / 100); // Percentage discount
      }
    }
    
    const finalTotal = Math.max(0, total - discountAmount);

    return {
      platformCost,
      featuresCost,
      subtotal,
      multiplierFactor: (designMultiplier * urgencyMultiplier).toFixed(2),
      discountAmount: Math.round(discountAmount),
      totalBeforeDiscount: Math.round(total),
      finalTotal: Math.round(finalTotal)
    };
  }, [platformObj, featuresObjList, designObj, urgencyObj, activePromo]);

  // Apply promo code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const upperCode = promoInput.trim().toUpperCase();
    if (PROMO_CODES[upperCode] !== undefined) {
      setActivePromo({
        code: upperCode,
        discount: PROMO_CODES[upperCode]
      });
      toast.success(`Promo code '${upperCode}' applied successfully!`);
    } else {
      toast.error('Invalid promo code. Try "WELCOME10" (10% off) or "AURASPECIAL" (15% off).');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetCalculator = () => {
    setSelectedPlatform('web');
    setSelectedFeatures(['auth', 'database']);
    setSelectedDesign('clean');
    setSelectedUrgency('standard');
    setPromoInput('');
    setActivePromo(null);
    setClientName('');
    setProjectName('');
    toast.info('Calculator reset to defaults.');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pb-4">
          <Badge variant="outline" className="px-3 py-1 bg-background text-primary gap-1">
            <Calculator className="h-3.5 w-3.5" />
            Instant Estimator Engine
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Interactive Project Cost Calculator
          </h1>
          <p className="text-muted-foreground text-sm">
            Select your target platforms, custom security integrations, design layout fidelity, and timeline constraints to receive a highly detailed, PDF-printable quotation breakdown instantly.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Configurator */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Platforms */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground">Step 1 of 4</span>
                  <Badge variant="secondary">Base Platform</Badge>
                </div>
                <CardTitle className="text-lg font-bold">Select Target Platform</CardTitle>
                <CardDescription>
                  Choose the core codebase framework for your software product.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPlatform} onValueChange={setSelectedPlatform} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ESTIMATION_FACTORS.platforms.map((platform) => (
                    <div key={platform.id} className="relative">
                      <RadioGroupItem
                        value={platform.id}
                        id={platform.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={platform.id}
                        className="flex flex-col h-full p-4 rounded-xl border bg-card hover:bg-muted/50 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-ring transition-all"
                      >
                        <span className="font-bold text-sm text-foreground">{platform.name}</span>
                        <span className="text-xs text-muted-foreground mt-1 flex-1">
                          Dedicated framework baseline development.
                        </span>
                        <span className="text-sm font-semibold mt-4 text-primary font-mono">
                          ${platform.cost.toLocaleString()} Base
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Step 2: Features */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground">Step 2 of 4</span>
                  <Badge variant="secondary">Features & Security</Badge>
                </div>
                <CardTitle className="text-lg font-bold">Integrations & Add-ons</CardTitle>
                <CardDescription>
                  Toggle specific secure modules and custom APIs to build your functional specs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {ESTIMATION_FACTORS.features.map((feature) => {
                    const isChecked = selectedFeatures.includes(feature.id);
                    return (
                      <div
                        key={feature.id}
                        onClick={() => handleFeatureToggle(feature.id)}
                        className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-primary/5 border-primary' 
                            : 'bg-card hover:bg-muted/30'
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{feature.name}</span>
                            {isChecked && <Badge variant="outline" className="text-[10px] bg-primary text-primary-foreground">Selected</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono font-bold text-primary">+${feature.cost}</span>
                          <Switch
                            checked={isChecked}
                            onCheckedChange={() => handleFeatureToggle(feature.id)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Design Complexity */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground">Step 3 of 4</span>
                  <Badge variant="secondary">UI Fidelity</Badge>
                </div>
                <CardTitle className="text-lg font-bold">Design System Complexity</CardTitle>
                <CardDescription>
                  Choose the depth of branding, custom layout motion, and layout components.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedDesign} onValueChange={setSelectedDesign} className="space-y-3">
                  {ESTIMATION_FACTORS.designs.map((design) => (
                    <div key={design.id} className="relative">
                      <RadioGroupItem value={design.id} id={design.id} className="peer sr-only" />
                      <Label
                        htmlFor={design.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-ring transition-all"
                      >
                        <div className="space-y-1">
                          <span className="font-bold text-sm text-foreground">{design.name}</span>
                          <p className="text-xs text-muted-foreground max-w-md">{design.description}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 font-mono text-xs font-bold text-primary bg-muted px-2.5 py-1 rounded">
                          {design.multiplier === 1.0 ? 'Baseline (1.0x)' : `+${Math.round((design.multiplier - 1) * 100)}% (${design.multiplier}x)`}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Step 4: Urgency */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground">Step 4 of 4</span>
                  <Badge variant="secondary">Timeline</Badge>
                </div>
                <CardTitle className="text-lg font-bold">Delivery Urgency</CardTitle>
                <CardDescription>
                  Set your timeline speed. Fast sprints require dedicated developer allocation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedUrgency} onValueChange={setSelectedUrgency} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ESTIMATION_FACTORS.urgency.map((urg) => (
                    <div key={urg.id} className="relative">
                      <RadioGroupItem value={urg.id} id={urg.id} className="peer sr-only" />
                      <Label
                        htmlFor={urg.id}
                        className="flex flex-col items-center text-center p-4 rounded-xl border bg-card hover:bg-muted/50 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-ring transition-all"
                      >
                        <span className="font-bold text-xs">{urg.name}</span>
                        <span className="text-[10px] font-mono font-bold mt-3 bg-muted px-2 py-0.5 rounded text-primary">
                          {urg.multiplier === 1.0 ? '1.0x Cost' : `+${Math.round((urg.multiplier - 1) * 100)}% (${urg.multiplier}x)`}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right: PDF-Style Invoice Receipt */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Client info card */}
            <Card className="border shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-xs uppercase tracking-wider font-mono text-muted-foreground">Receipt Customization</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 p-4 pt-0">
                <div className="space-y-1">
                  <Label htmlFor="client-name" className="text-xs">Client Name</Label>
                  <Input 
                    id="client-name" 
                    placeholder="e.g. Acme Corp" 
                    value={clientName} 
                    onChange={e => setClientName(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="project-name" className="text-xs">Project Name</Label>
                  <Input 
                    id="project-name" 
                    placeholder="e.g. SaaS Portal" 
                    value={projectName} 
                    onChange={e => setProjectName(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Print/PDF Invoice */}
            <Card className="border shadow-lg overflow-hidden bg-card print:border-0 print:shadow-none" id="printable-invoice">
              
              {/* Receipt Header Banner */}
              <div className="bg-primary text-primary-foreground p-6 text-center space-y-1.5">
                <div className="flex justify-center mb-1">
                  <FileText className="h-8 w-8 text-primary-foreground/90" />
                </div>
                <h3 className="font-bold text-lg tracking-tight">Official Cost Quotation</h3>
                <p className="text-[11px] text-primary-foreground/70 font-mono">
                  Quotation ID: EST-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>

              {/* Invoice Meta */}
              <CardContent className="p-6 space-y-6 text-xs">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-bold text-foreground">ISSUED BY:</h4>
                    <p className="text-muted-foreground mt-0.5">DevSuite Hub</p>
                    <p className="text-muted-foreground">https://devsuite-hub.io</p>
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-foreground">ESTIMATED FOR:</h4>
                    <p className="text-muted-foreground mt-0.5">{clientName || 'Valued Client'}</p>
                    <p className="text-muted-foreground">Project: {projectName || 'Web/Mobile MVP'}</p>
                  </div>
                </div>

                <Separator />

                {/* Line Items */}
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground uppercase tracking-wider text-[10px]">Quotation Line Items</h4>
                  
                  <div className="space-y-2">
                    {/* Platform */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-semibold">
                        {platformObj.name} (Base)
                      </span>
                      <span className="font-mono">${calculations.platformCost.toLocaleString()}</span>
                    </div>

                    {/* Features */}
                    {featuresObjList.map(feature => (
                      <div key={feature.id} className="flex justify-between items-center text-muted-foreground">
                        <span>+ {feature.name}</span>
                        <span className="font-mono">${feature.cost.toLocaleString()}</span>
                      </div>
                    ))}

                    {featuresObjList.length === 0 && (
                      <div className="text-muted-foreground italic text-[11px]">
                        No additional feature integrations selected.
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Multipliers Breakdown */}
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Design Fidelity Multiplier:</span>
                    <span className="font-mono">x{designObj.multiplier} ({designObj.name})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline Urgency Multiplier:</span>
                    <span className="font-mono">x{urgencyObj.multiplier} ({urgencyObj.name})</span>
                  </div>
                  <div className="flex justify-between text-foreground font-semibold">
                    <span>Subtotal Before Multipliers:</span>
                    <span className="font-mono">${calculations.subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                {/* Totals & Discounts */}
                <div className="space-y-2 bg-muted/40 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-mono">${calculations.totalBeforeDiscount.toLocaleString()}</span>
                  </div>

                  {activePromo && (
                    <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Percent className="h-3 w-3" />
                        Promo Discount ({activePromo.code}):
                      </span>
                      <span className="font-mono">-${calculations.discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t text-sm font-bold text-foreground">
                    <span>Estimated Total Cost:</span>
                    <span className="font-mono text-primary text-base">
                      ${calculations.finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-muted-foreground leading-normal text-center italic">
                  * Note: This is an automated algorithmic development estimation. Final project contracts are subject to custom scope reviews.
                </div>
              </CardContent>

              {/* Promo code form */}
              <CardFooter className="bg-muted/20 border-t p-4 flex flex-col gap-3">
                <form onSubmit={handleApplyPromo} className="flex gap-2 w-full">
                  <Input
                    placeholder="Enter Coupon (WELCOME10)"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    className="h-8 text-xs uppercase"
                  />
                  <Button type="submit" size="sm" variant="outline" className="h-8 text-xs shrink-0">
                    Apply Code
                  </Button>
                </form>

                <div className="flex gap-2 w-full">
                  <Button onClick={handlePrint} size="sm" className="flex-1 text-xs gap-1.5 h-9">
                    <Printer className="h-3.5 w-3.5" /> Print Quote
                  </Button>
                  <Button onClick={resetCalculator} size="sm" variant="ghost" className="text-xs h-9 text-muted-foreground hover:text-primary">
                    <RefreshCw className="h-3.5 w-3.5" /> Reset
                  </Button>
                </div>
              </CardFooter>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
