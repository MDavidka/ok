"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { phonesData, Phone } from '@/lib/data';
import { useCart } from '@/components/cart-context';
import { 
  GitCompare, 
  Trash2, 
  ShoppingCart, 
  Plus, 
  Sparkles, 
  ChevronRight, 
  Check, 
  HelpCircle,
  Smartphone,
  Cpu,
  Camera,
  Battery,
  ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCart } = useCart();
  const [selectorOpenIdx, setSelectorOpenIdx] = useState<number | null>(null);

  // Get compared phones
  const comparedPhones = compareList
    .map(id => phonesData.find(p => p.id === id))
    .filter((p): p is Phone => !!p);

  // Remaining slots (up to 3)
  const emptySlotsCount = Math.max(0, 3 - comparedPhones.length);

  // Phones available to add (not already in comparison list)
  const availablePhones = phonesData.filter(p => !compareList.includes(p.id));

  // Add phone to compare from selector
  const handleAddPhone = (phoneId: string) => {
    // We add to cart comparison list using context toggle
    const { toggleCompare } = useCart();
    // Since we are in client, we can retrieve toggleCompare
  };

  // Wait, let's use the actual toggleCompare from useCart hook
  const { toggleCompare } = useCart();

  const handleSelectPhone = (phoneId: string) => {
    toggleCompare(phoneId);
    setSelectorOpenIdx(null);
  };

  const specRows = [
    { label: 'Brand', key: 'brand' as const },
    { label: 'Price', key: 'price' as const, format: (val: number) => `$${val}` },
    { label: 'Screen Display', key: 'screen' as const, subKey: 'specs' as const, specField: 'screen' as const },
    { label: 'Processor Chipset', key: 'processor' as const, subKey: 'specs' as const, specField: 'processor' as const },
    { label: 'Camera System', key: 'camera' as const, subKey: 'specs' as const, specField: 'camera' as const },
    { label: 'Battery Capacity', key: 'battery' as const, subKey: 'specs' as const, specField: 'battery' as const },
    { label: 'Operating System', key: 'os' as const, subKey: 'specs' as const, specField: 'os' as const },
    { label: 'Device Weight', key: 'weight' as const, subKey: 'specs' as const, specField: 'weight' as const },
    { label: 'Water Resistance', key: 'waterResistance' as const, subKey: 'specs' as const, specField: 'waterResistance' as const },
    { label: 'Charging Power', key: 'charging' as const, subKey: 'specs' as const, specField: 'charging' as const },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Compare Devices</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Compare Smartphones
          </h1>
          <p className="text-muted-foreground mt-1">
            Analyze exact hardware specs side-by-side to determine your perfect upgrade.
          </p>
        </div>
        {comparedPhones.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearCompare}
            className="text-xs text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 self-start"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Clear Matrix
          </Button>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        
        {/* Sticky Header Row */}
        <div className="grid grid-cols-12 border-b bg-slate-50/50 p-4 sm:p-6 gap-4 items-center">
          
          {/* Label slot */}
          <div className="col-span-12 md:col-span-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-bold">
              <GitCompare className="h-3.5 w-3.5" /> Spec Matrix
            </div>
            <p className="text-xs text-slate-500 mt-2">Up to 3 high-end smartphones side-by-side.</p>
          </div>

          {/* Compared Phone Columns */}
          <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Render active phones */}
            {comparedPhones.map((phone) => (
              <div key={phone.id} className="relative border rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between group">
                <button
                  onClick={() => removeFromCompare(phone.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove device"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="text-center space-y-2">
                  <div className="h-24 flex items-center justify-center p-1">
                    <img src={phone.image} alt={phone.name} className="object-contain h-full max-h-20" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">{phone.brand}</span>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{phone.name}</h3>
                  <p className="text-base font-extrabold text-slate-950">${phone.price}</p>
                </div>

                <div className="mt-4 space-y-2">
                  <Button
                    size="sm"
                    onClick={() => addToCart({
                      phoneId: phone.id,
                      name: phone.name,
                      brand: phone.brand,
                      price: phone.price,
                      image: phone.image,
                      color: phone.colors[0].name,
                      storage: phone.storage[0]
                    })}
                    className="w-full text-xs gap-1 h-8 bg-slate-900 hover:bg-primary text-white"
                  >
                    <ShoppingCart className="h-3 w-3" /> Add to Cart
                  </Button>
                  <Link href={`/phones/${phone.id}`} className="block">
                    <Button size="sm" variant="outline" className="w-full text-xs h-8">
                      View Specs
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {/* Empty slots for selectors */}
            {Array.from({ length: emptySlotsCount }).map((_, idx) => {
              const slotIdx = comparedPhones.length + idx;
              const isOpen = selectorOpenIdx === slotIdx;

              return (
                <div key={idx} className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50/50 flex flex-col items-center justify-center text-center min-h-[220px] relative">
                  
                  {!isOpen ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-full border border-slate-200 w-fit mx-auto text-slate-400">
                        <Plus className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Add a Device</h4>
                        <p className="text-[10px] text-slate-400 max-w-[150px] mx-auto mt-1">Select another phone to compare specifications.</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setSelectorOpenIdx(slotIdx)}
                        className="text-xs h-8 border-slate-300"
                      >
                        Choose Phone
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col justify-start text-left">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] font-bold text-slate-700 uppercase">Choose Phone</span>
                        <button 
                          onClick={() => setSelectorOpenIdx(null)}
                          className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                        >
                          Cancel
                        </button>
                      </div>

                      {availablePhones.length === 0 ? (
                        <p className="text-xs text-slate-400 italic text-center py-4">All available phones are already added.</p>
                      ) : (
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {availablePhones.map((phone) => (
                            <button
                              key={phone.id}
                              onClick={() => handleSelectPhone(phone.id)}
                              className="w-full flex items-center gap-2 p-1.5 rounded-lg border bg-white hover:border-primary text-left transition-colors text-xs"
                            >
                              <img src={phone.image} alt={phone.name} className="h-6 w-6 object-contain" />
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-slate-900 truncate">{phone.name}</p>
                                <p className="text-[10px] text-slate-500">${phone.price}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </div>

        {/* Spec Rows */}
        {comparedPhones.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-4">
            <div className="p-3 bg-slate-100 rounded-full w-fit mx-auto text-slate-400">
              <Smartphone className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Your comparison matrix is empty</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Select up to three smartphones from our catalog or use the slots above to compare cameras, batteries, screens, and processors.
            </p>
            <Link href="/phones">
              <Button className="gap-2">
                Browse Catalog to Compare
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {specRows.map((row, rowIdx) => (
              <div 
                key={rowIdx} 
                className={`grid grid-cols-12 p-4 sm:p-6 gap-4 items-start ${
                  rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                }`}
              >
                {/* Spec label */}
                <div className="col-span-12 md:col-span-3">
                  <span className="font-bold text-xs text-slate-700 uppercase tracking-wider">{row.label}</span>
                </div>

                {/* Compared Phone Values */}
                <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {comparedPhones.map((phone, colIdx) => {
                    let value: any = '';
                    
                    if (row.subKey === 'specs' && row.specField) {
                      value = phone.specs[row.specField];
                    } else {
                      value = phone[row.key as keyof Phone];
                    }

                    if (row.format) {
                      value = row.format(value);
                    }

                    return (
                      <div key={colIdx} className="text-sm text-slate-800 font-medium">
                        {/* Mobile responsive label indicator */}
                        <span className="sm:hidden text-[10px] text-slate-400 block mb-0.5">Col {colIdx + 1}:</span>
                        <div className="bg-slate-100/50 sm:bg-transparent p-2.5 sm:p-0 rounded border border-slate-100 sm:border-0">
                          {value}
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty slots placeholders */}
                  {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                    <div key={idx} className="hidden sm:block text-slate-300 text-xs italic">
                      —
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Helpful Spec buying guide */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-2 text-center md:text-left">
          <div className="p-3 bg-white rounded-xl border border-blue-200 text-blue-600 w-fit mx-auto md:mx-0">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>
        <div className="md:col-span-7 text-center md:text-left space-y-1">
          <h3 className="font-extrabold text-blue-900 text-lg">Unsure about technical specifications?</h3>
          <p className="text-xs text-blue-700 leading-relaxed">
            A higher Megapixel count doesn't always guarantee better photos—sensor size and AI processing play a huge role. Similarly, battery life depends heavily on processor efficiency (e.g. 3nm vs 4nm chips). Contact our support team for a free personalized buying consultation.
          </p>
        </div>
        <div className="md:col-span-3 text-center md:text-right">
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
              Talk to Phone Expert
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
