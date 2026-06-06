"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/lib/store-context";
import { TRADE_IN_MODELS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  RefreshCw, 
  Check, 
  Info, 
  ArrowRight, 
  AlertCircle, 
  Truck, 
  HelpCircle,
  Copy
} from "lucide-react";
import { toast } from "sonner";

export default function TradeInPage() {
  const { applyPromo, appliedPromo } = useStore();

  // Form State
  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [modelsList, setModelsList] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("128GB");
  const [selectedCondition, setSelectedCondition] = useState("Good");
  
  // Loading & Result state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    estimatedValue: number;
    promoCode: string;
    brand: string;
    model: string;
  } | null>(null);

  const brands = ["Apple", "Samsung", "Google", "OnePlus", "Other"];

  // Update models list when brand changes
  useEffect(() => {
    const filtered = TRADE_IN_MODELS.filter(
      (m) => m.brand.toLowerCase() === selectedBrand.toLowerCase()
    ).map((m) => m.model);
    setModelsList(filtered);
    if (filtered.length > 0) {
      setSelectedModel(filtered[0]);
    } else {
      setSelectedModel("");
    }
  }, [selectedBrand]);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalModel = selectedBrand === "Other" ? customModel : selectedModel;
    if (!finalModel) {
      toast.error("Please enter or select a valid phone model.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/trade-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: selectedBrand,
          model: finalModel,
          storage: selectedStorage,
          condition: selectedCondition,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult({
          estimatedValue: data.estimatedValue,
          promoCode: data.promoCode,
          brand: data.brand,
          model: data.model,
        });
        toast.success("Trade-in estimation calculated successfully!");
      } else {
        toast.error(data.error || "Failed to calculate value.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPromo = () => {
    if (result) {
      applyPromo(result.promoCode, result.estimatedValue, result.model);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.promoCode);
      toast.success("Promo code copied to clipboard!");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-bold px-3 py-1">
          RECYCLING & TRADE-IN
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Phonix Smart Trade-In
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Recycle your old device responsibly and receive an instant discount code of up to $650 to use on any flagship phone in our store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Estimator Form */}
        <div className="lg:col-span-7">
          <Card className="border-muted/60">
            <CardHeader>
              <CardTitle className="text-lg">Estimate Your Device Value</CardTitle>
              <CardDescription className="text-xs">
                Provide accurate details about your smartphone to calculate your instant trade-in credit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Brand Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Phone Brand
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBrand(b)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                          selectedBrand === b
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background hover:bg-muted text-muted-foreground border-muted"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Selection */}
                {selectedBrand !== "Other" ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Select Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border bg-background text-foreground focus:ring-1 focus:ring-primary"
                      required
                    >
                      {modelsList.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Enter Your Device Model
                    </label>
                    <Input
                      placeholder="e.g. Sony Xperia 1 V, Xiaomi 13 Pro"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className="text-xs p-3 rounded-xl"
                      required
                    />
                  </div>
                )}

                {/* Storage Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Storage Capacity
                  </label>
                  <div className="flex gap-2">
                    {["64GB", "128GB", "256GB", "512GB", "1TB"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSelectedStorage(st)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                          selectedStorage === st
                            ? "bg-primary/5 text-primary border-primary"
                            : "bg-background text-muted-foreground border-muted hover:border-muted-foreground"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Condition Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Device Condition
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: "Flawless", desc: "No scratches, fully functional, 100% battery health" },
                      { name: "Good", desc: "Minor light scratches, no cracks, fully functional" },
                      { name: "Fair", desc: "Visible scratches, scuffs, fully functional" },
                      { name: "Broken", desc: "Cracked screen, faulty keys, but powers on" },
                    ].map((cond) => (
                      <button
                        key={cond.name}
                        type="button"
                        onClick={() => setSelectedCondition(cond.name)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                          selectedCondition === cond.name
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-muted hover:border-muted-foreground text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="text-xs font-bold">{cond.name}</span>
                        <span className="text-[10px] opacity-80 mt-1 line-clamp-2 leading-snug">
                          {cond.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-sm font-semibold gap-2 mt-4"
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  <span>{loading ? "Calculating Value..." : "Calculate Trade-In Value"}</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Results & Next Steps */}
        <div className="lg:col-span-5 space-y-6">
          {/* Result Card */}
          {result ? (
            <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-lg overflow-hidden animate-in fade-in duration-300">
              <div className="bg-emerald-500 text-white p-4 text-center text-xs font-bold tracking-wider uppercase">
                🎉 Valuation Calculated!
              </div>
              <CardContent className="p-6 text-center space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Estimated Value for {result.model}</p>
                  <h2 className="text-5xl font-extrabold text-emerald-600 mt-2">
                    ${result.estimatedValue}
                  </h2>
                </div>

                <div className="p-4 bg-background border border-dashed rounded-xl space-y-3">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Your Checkout Promo Code
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="text-base font-mono font-bold tracking-widest bg-muted px-3 py-1.5 rounded-lg border text-primary">
                      {result.promoCode}
                    </code>
                    <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy Code">
                      <Copy className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </Button>
                  </div>
                </div>

                {appliedPromo?.code === result.promoCode ? (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-bold p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <Check className="h-4 w-4" />
                    <span>Promo applied to your cart!</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleApplyPromo}
                    className="w-full text-xs font-bold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-11"
                  >
                    <span>Apply Discount to Cart</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}

                <p className="text-[10px] text-muted-foreground leading-snug">
                  *This code reduces your shopping cart total by ${result.estimatedValue} instantly. Send us your old device within 14 days using the free shipping label we generate for you.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-muted/60 bg-muted/10">
              <CardContent className="p-6 text-center py-16 space-y-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm">No Active Estimate</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Fill in the details on the left and click calculate to view your instant trade-in discount and checkout code.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick How it Works Infographic */}
          <Card className="border-muted/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span>How the program works</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-muted-foreground">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <p className="font-bold text-foreground">Estimate & Buy</p>
                  <p className="mt-0.5">Calculate your value, apply the promo code, and checkout with your brand-new phone.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <p className="font-bold text-foreground">Receive Prepaid Box</p>
                  <p className="mt-0.5">We ship your new phone along with a free prepaid return box and shipping label for your old phone.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <p className="font-bold text-foreground">Ship it back</p>
                  <p className="mt-0.5">Place your old device in the box and drop it at any local post office within 14 days. That&apos;s it!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
