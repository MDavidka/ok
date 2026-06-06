"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/cart-context';
import { 
  CheckCircle, 
  Truck, 
  MapPin, 
  Package, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Play, 
  User, 
  CreditCard,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || `PNX-${Math.floor(100000 + Math.random() * 900000)}`;
  const { orders } = useCart();

  // Find order in history
  const order = orders.find(o => o.id === orderId);

  // Delivery status simulation state
  const statuses = [
    { label: 'Order Received', desc: 'Secure payment cleared & order logged.', icon: FileText, color: 'text-blue-500 bg-blue-50' },
    { label: 'Packed & Sealed', desc: 'Protected in shockproof premium casing.', icon: Package, color: 'text-amber-500 bg-amber-50' },
    { label: 'In Transit', desc: 'Dispatched via Express CA logistics.', icon: Truck, color: 'text-purple-500 bg-purple-50' },
    { label: 'Delivered', desc: 'Arrived safely at doorstep (Signature verified).', icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50' }
  ];

  const [currentStatusIdx, setCurrentStatusIdx] = useState(0);

  // Auto-advance status for fun simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatusIdx(prev => (prev < 3 ? prev + 1 : prev));
    }, 8000); // advance every 8 seconds

    return () => clearInterval(timer);
  }, []);

  const handleNextStatus = () => {
    setCurrentStatusIdx(prev => (prev < 3 ? prev + 1 : 0));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 max-w-4xl">
      
      {/* Confirmed Banner */}
      <div className="text-center space-y-4 mb-10">
        <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 animate-bounce">
          <CheckCircle className="h-10 w-10 fill-current text-emerald-500" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Simulated Purchase Confirmed</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Thank You For Your Order!</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Your payment was simulated successfully. Order ID: <span className="font-mono font-bold text-slate-900">{orderId}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Delivery timeline tracker */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-bold text-slate-900">Live Delivery Timeline</h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time simulated fulfillment progress</p>
              </div>
              <Button 
                onClick={handleNextStatus} 
                size="sm" 
                variant="outline" 
                className="text-[10px] h-7 gap-1 px-2 border-primary/20 text-primary hover:bg-primary/5"
                title="Manually trigger the next logistic status step"
              >
                <Play className="h-2.5 w-2.5 fill-current" /> Advance Stage
              </Button>
            </div>

            {/* Timeline graphics */}
            <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {statuses.map((status, idx) => {
                const isCompleted = idx <= currentStatusIdx;
                const isActive = idx === currentStatusIdx;
                const Icon = status.icon;

                return (
                  <div key={idx} className="relative flex gap-4 items-start">
                    {/* Circle bullet absolute */}
                    <div className={`absolute -left-[22px] top-1 h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-primary border-primary ring-4 ring-primary/15' 
                        : 'bg-white border-slate-300'
                    }`}>
                      {isCompleted && <div className="h-1 w-1 bg-white rounded-full" />}
                    </div>

                    {/* Status Icon */}
                    <div className={`p-2 rounded-lg shrink-0 border ${
                      isCompleted ? status.color : 'text-slate-300 bg-slate-50 border-slate-200'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold text-sm ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                          {status.label}
                        </h4>
                        {isActive && (
                          <Badge className="bg-blue-600 text-white text-[9px] px-1.5 py-0">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs ${isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                        {status.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Map / Delivery Note */}
            <div className="bg-slate-50 border rounded-xl p-4 flex gap-3 items-start text-xs text-slate-600 leading-relaxed">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Dispatch Address</p>
                <p>{order ? `${order.customer.address}, ${order.customer.city}, ${order.customer.zipCode}` : '742 Evergreen Terrace, Tech District, CA 94016'}</p>
                <p className="text-[10px] text-slate-400 mt-1 italic">Delivery scheduled within 48 hours. Signature is required.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Receipt Summary */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 border-b pb-3">Receipt Summary</h3>

            {/* Customer Details */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex gap-2.5 items-center">
                <User className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="font-bold text-slate-800">{order ? order.customer.name : 'Valued Customer'}</p>
                  <p>{order ? order.customer.email : 'customer@example.com'}</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-center">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="font-bold text-slate-800">Payment Gateway</p>
                  <p className="capitalize">{order ? order.customer.paymentMethod.replace('-', ' ') : 'Simulated Credit Card'}</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-center">
                <Calendar className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="font-bold text-slate-800">Order Date</p>
                  <p>{order ? order.date : new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Items list */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Purchased Items</p>
              {order ? (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center justify-between text-xs">
                      <div className="flex gap-2 items-center min-w-0">
                        <img src={item.image} alt={item.name} className="h-8 w-8 object-contain" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.storage} | Qty {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No items found in active memory history.</p>
              )}
            </div>

            <Separator />

            {/* Financial totals */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">${order ? order.subtotal : '1199'}</span>
              </div>
              {order && order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promo Discount</span>
                  <span>-${order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="font-semibold text-slate-800">
                  {order && order.shipping === 0 ? 'FREE' : `$${order ? order.shipping : '0'}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Simulated Tax (8.25%)</span>
                <span className="font-semibold text-slate-800">${order ? order.tax : '98.92'}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm font-extrabold text-slate-900">
                <span>Total Amount Paid</span>
                <span>${order ? order.total : '1297.92'}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <Link href="/phones">
              <Button className="w-full gap-2 text-xs bg-slate-900 hover:bg-primary text-white">
                Back to Catalog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full text-xs">
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 animate-pulse">Loading order confirmation...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
