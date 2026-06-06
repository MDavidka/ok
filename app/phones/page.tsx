"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { phonesData, Phone } from '@/lib/data';
import { useCart } from '@/components/cart-context';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  GitCompare, 
  ShoppingCart, 
  RotateCcw, 
  Grid, 
  List, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { toggleCompare, compareList, addToCart } = useCart();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Load initial brand filter from URL query if present
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    if (brandParam && ['Apple', 'Samsung', 'Google', 'OnePlus'].includes(brandParam)) {
      setSelectedBrands([brandParam]);
    }
  }, [searchParams]);

  // Handle brand toggle
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Handle storage toggle
  const handleStorageToggle = (storage: string) => {
    setSelectedStorages(prev => 
      prev.includes(storage) ? prev.filter(s => s !== storage) : [...prev, storage]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedStorages([]);
    setPriceRange('all');
    setSortBy('featured');
    router.replace('/phones');
  };

  // Filter and Sort Logic
  const filteredPhones = phonesData.filter(phone => {
    // Search filter
    const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phone.specs.processor.toLowerCase().includes(searchQuery.toLowerCase());

    // Brand filter
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(phone.brand);

    // Storage filter
    const matchesStorage = selectedStorages.length === 0 || 
                           selectedStorages.some(s => phone.storage.includes(s));

    // Price filter
    let matchesPrice = true;
    if (priceRange === 'under-600') matchesPrice = phone.price < 600;
    else if (priceRange === '600-900') matchesPrice = phone.price >= 600 && phone.price <= 900;
    else if (priceRange === '900-1200') matchesPrice = phone.price >= 900 && phone.price <= 1200;
    else if (priceRange === 'over-1200') matchesPrice = phone.price > 1200;

    return matchesSearch && matchesBrand && matchesStorage && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default featured
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Catalog</span>
      </div>

      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Explore Smartphone Catalog
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Compare specifications, filter by premium brands, screen size, and storage capacities. Find the perfect device with real-time stock and checkout.
        </p>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-3 bg-white border rounded-xl p-6 space-y-6 sticky top-24">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
            </h3>
            {(selectedBrands.length > 0 || selectedStorages.length > 0 || priceRange !== 'all' || searchQuery !== '') && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleResetFilters}
                className="text-xs text-red-600 hover:text-red-700 p-0 h-auto font-semibold"
              >
                Reset All
              </Button>
            )}
          </div>

          <Separator />

          {/* Search Bar Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Search Device</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="e.g. iPhone, 200MP, Tensor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Brand</label>
            <div className="space-y-2">
              {['Apple', 'Samsung', 'Google', 'OnePlus'].map((brand) => (
                <label key={brand} className="flex items-center space-x-3 cursor-pointer text-sm font-medium text-slate-700 hover:text-primary">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Price Range</label>
            <div className="space-y-2 text-sm">
              {[
                { value: 'all', label: 'All Prices' },
                { value: 'under-600', label: 'Under $600' },
                { value: '600-900', label: '$600 - $900' },
                { value: '900-1200', label: '$900 - $1200' },
                { value: 'over-1200', label: 'Over $1200' }
              ].map((range) => (
                <label key={range.value} className="flex items-center space-x-3 cursor-pointer text-slate-700 hover:text-primary">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.value}
                    checked={priceRange === range.value}
                    onChange={() => setPriceRange(range.value)}
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Storage Capacity Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Storage Capacity</label>
            <div className="space-y-2">
              {['128GB', '256GB', '512GB', '1TB'].map((storage) => (
                <label key={storage} className="flex items-center space-x-3 cursor-pointer text-sm font-medium text-slate-700 hover:text-primary">
                  <input
                    type="checkbox"
                    checked={selectedStorages.includes(storage)}
                    onChange={() => handleStorageToggle(storage)}
                    className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>{storage}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Compare Shortcut Widget inside filters */}
          {compareList.length > 0 && (
            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Compare Tray ({compareList.length}/3)</span>
                <Link href="/compare" className="text-primary font-semibold hover:underline">Compare Now</Link>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {compareList.map(id => {
                  const phone = phonesData.find(p => p.id === id);
                  if (!phone) return null;
                  return (
                    <div key={id} className="relative group border rounded p-1 bg-slate-50 text-center">
                      <img src={phone.image} alt={phone.name} className="h-8 object-contain mx-auto" />
                      <button 
                        onClick={() => toggleCompare(id)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-3.5 w-3.5 flex items-center justify-center text-[8px]"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Content */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border rounded-xl">
            <p className="text-sm text-slate-600">
              Showing <span className="font-bold text-slate-900">{filteredPhones.length}</span> of {phonesData.length} premium models
            </p>

            <div className="flex items-center space-x-4 self-stretch sm:self-auto justify-between">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-medium shrink-0">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs bg-slate-50 border rounded p-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="featured">Featured / Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border rounded overflow-hidden bg-slate-50">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode('grid')}
                  className={`h-8 w-8 rounded-none p-0 ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode('list')}
                  className={`h-8 w-8 rounded-none p-0 ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Catalog Grid or List */}
          {filteredPhones.length === 0 ? (
            <div className="text-center py-16 bg-white border rounded-xl space-y-4">
              <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">No phones match your filters</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Try loosening your parameters or clear all filters to start exploring from scratch.
              </p>
              <Button onClick={handleResetFilters} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" /> Reset All Filters
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhones.map((phone) => {
                const isComparing = compareList.includes(phone.id);
                return (
                  <Card key={phone.id} className="group relative flex flex-col justify-between overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200">
                    
                    {phone.tag && (
                      <Badge className="absolute top-3 left-3 z-10 bg-slate-900 text-white font-medium text-[10px] px-2.5 py-0.5">
                        {phone.tag}
                      </Badge>
                    )}

                    <button 
                      onClick={() => toggleCompare(phone.id)}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full border transition-all ${
                        isComparing 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white/90 hover:bg-white text-slate-700 border-slate-200'
                      }`}
                      title={isComparing ? "Remove from compare" : "Add to compare"}
                    >
                      <GitCompare className="h-4 w-4" />
                    </button>

                    <Link href={`/phones/${phone.id}`} className="block pt-8 px-4 pb-4 bg-slate-50/50 group-hover:bg-slate-50 transition-colors">
                      <div className="relative h-44 w-full flex items-center justify-center">
                        <img 
                          src={phone.image} 
                          alt={phone.name} 
                          className="object-contain h-full max-h-40 transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    <CardHeader className="p-4 pt-3 pb-1 space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{phone.brand}</span>
                      <Link href={`/phones/${phone.id}`} className="hover:text-primary transition-colors">
                        <CardTitle className="text-base font-bold text-slate-900 truncate">
                          {phone.name}
                        </CardTitle>
                      </Link>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="font-semibold text-slate-800">{phone.rating}</span>
                        <span className="text-muted-foreground text-[10px]">({phone.reviewCount})</span>
                      </div>
                    </CardHeader>

                    {/* Quick Specs */}
                    <div className="px-4 pb-4 pt-1 space-y-2">
                      <p className="text-xs text-muted-foreground line-clamp-2">{phone.description}</p>
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">{phone.storage[0]}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded">{phone.specs.screen.split(',')[0]}</span>
                      </div>
                    </div>

                    <CardFooter className="p-4 pt-2 border-t flex items-center justify-between bg-slate-50/30">
                      <div className="flex flex-col">
                        {phone.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">${phone.originalPrice}</span>
                        )}
                        <span className="text-base font-extrabold text-slate-900">${phone.price}</span>
                      </div>
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
                        className="gap-1 text-xs bg-slate-900 hover:bg-primary text-white"
                      >
                        <ShoppingCart className="h-3 w-3" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredPhones.map((phone) => {
                const isComparing = compareList.includes(phone.id);
                return (
                  <div key={phone.id} className="group relative bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row items-center p-4 gap-6">
                    {/* Image */}
                    <div className="w-32 h-32 shrink-0 bg-slate-50 rounded-lg p-2 flex items-center justify-center">
                      <img src={phone.image} alt={phone.name} className="object-contain h-full max-h-28 group-hover:scale-105 transition-transform" />
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 space-y-2 text-center sm:text-left min-w-0">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{phone.brand}</span>
                        {phone.tag && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{phone.tag}</Badge>}
                      </div>
                      <Link href={`/phones/${phone.id}`} className="hover:text-primary transition-colors block">
                        <h3 className="font-bold text-lg text-slate-900 truncate">{phone.name}</h3>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-xl">{phone.description}</p>
                      
                      {/* Specs pills */}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs">
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">Chip: {phone.specs.processor.split('with')[0]}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">Battery: {phone.specs.battery.split('(')[0]}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">Screen: {phone.specs.screen.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Actions and Pricing */}
                    <div className="w-full sm:w-44 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6 flex flex-col items-center sm:items-stretch justify-center gap-2">
                      <div className="text-center sm:text-right">
                        {phone.originalPrice && (
                          <span className="text-xs text-slate-400 line-through block">${phone.originalPrice}</span>
                        )}
                        <span className="text-2xl font-extrabold text-slate-900">${phone.price}</span>
                      </div>
                      
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
                        className="w-full gap-2 text-xs"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                      </Button>

                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toggleCompare(phone.id)}
                        className={`w-full gap-2 text-xs ${isComparing ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
                      >
                        <GitCompare className="h-3.5 w-3.5" /> {isComparing ? 'Comparing' : 'Compare'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </section>

      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 animate-pulse">Loading catalog...</p>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
