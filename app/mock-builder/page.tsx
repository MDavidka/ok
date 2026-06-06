"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Cpu, 
  Terminal, 
  Copy, 
  Send, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Code, 
  Link as LinkIcon, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Play
} from 'lucide-react';

export default function MockBuilderPage() {
  const [resourceId, setResourceId] = useState('users');
  const [statusCode, setStatusCode] = useState('200');
  const [delay, setDelay] = useState('0');
  const [simulatedUrl, setSimulatedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [testResponse, setTestResponse] = useState<any>(null);
  const [testStatus, setTestStatus] = useState<number | null>(null);
  const [testHeaders, setTestHeaders] = useState<Record<string, string>>({});
  const [customJson, setCustomJson] = useState(JSON.stringify({
    status: "success",
    message: "This is a custom payload designed using the visual builder.",
    timestamp: new Date().toISOString(),
    data: {
      items: [
        { id: 101, name: "Alpha Component", weight: "1.2kg" },
        { id: 102, name: "Beta Controller", weight: "0.8kg" }
      ]
    }
  }, null, 2));

  // Update dynamic URL preview
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const queryParams: string[] = [];
      if (statusCode !== '200') queryParams.push(`status=${statusCode}`);
      if (delay !== '0') queryParams.push(`delay=${delay}`);
      const queryStr = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      setSimulatedUrl(`${origin}/api/mock/${resourceId}${queryStr}`);
    }
  }, [resourceId, statusCode, delay]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  // Run live test request
  const handleTestRequest = async () => {
    setLoading(true);
    setTestResponse(null);
    setTestStatus(null);
    setTestHeaders({});
    
    try {
      const start = performance.now();
      const res = await fetch(`/api/mock/${resourceId}?status=${statusCode}&delay=${delay}`);
      const duration = (performance.now() - start).toFixed(0);
      
      const data = await res.json();
      setTestStatus(res.status);
      setTestResponse(data);
      
      // Populate mock headers
      setTestHeaders({
        'content-type': 'application/json; charset=utf-8',
        'x-simulated-latency': `${delay}ms`,
        'x-response-time': `${duration}ms`,
        'access-control-allow-origin': '*'
      });
      
      if (res.ok) {
        toast.success(`Mock API responded with standard ${res.status} OK in ${duration}ms!`);
      } else {
        toast.error(`Mock API responded with simulated error status: ${res.status}`);
      }
    } catch (err: any) {
      toast.error(`Fetch failed: ${err.message}`);
      setTestResponse({ error: "Network error or CORS failure." });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (code: number) => {
    if (code >= 200 && code < 300) return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono">{code} OK</Badge>;
    if (code >= 300 && code < 400) return <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-mono">{code} Redirect</Badge>;
    if (code >= 400 && code < 500) return <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-mono">{code} Client Error</Badge>;
    return <Badge className="bg-rose-500 hover:bg-rose-600 text-white font-mono">{code} Server Error</Badge>;
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Header Banner */}
      <section className="bg-card border-b py-10 mb-8">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-indigo-500 bg-indigo-500/5 border-indigo-500/20 px-2 py-0.5">
                  Visual Sandbox Engine
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">Simulate Network States</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">Visual Mock API Builder</h1>
              <p className="text-muted-foreground text-sm max-w-2xl">
                Design mock JSON data schemas, inject simulated latency delays, and test server error status codes instantly. Perfect for testing loading states or edge cases.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1 bg-background text-primary gap-1.5 text-xs font-mono">
                <Cpu className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
                Active Sandbox
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Controls & Config (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border shadow-md">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Layers className="h-4.5 w-4.5 text-indigo-500" />
                  Mock Configuration
                </CardTitle>
                <CardDescription className="text-xs">
                  Customize the dynamic parameters to automatically compile a test endpoint.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                
                {/* Simulated ID Selector */}
                <div className="space-y-2">
                  <Label htmlFor="resource-select" className="text-xs font-bold text-muted-foreground">
                    Target Dataset Template
                  </Label>
                  <Select value={resourceId} onValueChange={setResourceId}>
                    <SelectTrigger id="resource-select" className="h-9 text-xs">
                      <SelectValue placeholder="Select dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">Users Database (Alice, Bob, Charlie...)</SelectItem>
                      <SelectItem value="products">Products List (SaaS subscriptions...)</SelectItem>
                      <SelectItem value="config">Server Configuration (Environment status...)</SelectItem>
                      <SelectItem value="profile">User Profile details (API keys...)</SelectItem>
                      <SelectItem value="notfound-test">Non-existent resource (Trigger custom message)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* HTTP Status Code */}
                <div className="space-y-2">
                  <Label htmlFor="status-select" className="text-xs font-bold text-muted-foreground">
                    Simulated HTTP Status Code
                  </Label>
                  <Select value={statusCode} onValueChange={setStatusCode}>
                    <SelectTrigger id="status-select" className="h-9 text-xs">
                      <SelectValue placeholder="HTTP 200 OK" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="200">200 OK (Standard Success)</SelectItem>
                      <SelectItem value="201">201 Created (Mock creation success)</SelectItem>
                      <SelectItem value="400">400 Bad Request (Validation failure)</SelectItem>
                      <SelectItem value="401">401 Unauthorized (Missing token)</SelectItem>
                      <SelectItem value="403">403 Forbidden (Incorrect permissions)</SelectItem>
                      <SelectItem value="404">404 Not Found (Missing endpoint)</SelectItem>
                      <SelectItem value="500">500 Internal Server Error (Database crash)</SelectItem>
                      <SelectItem value="503">503 Service Unavailable (Maintenance mode)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Simulated Network Latency */}
                <div className="space-y-2">
                  <Label htmlFor="delay-select" className="text-xs font-bold text-muted-foreground">
                    Simulated Network Latency (Delay)
                  </Label>
                  <Select value={delay} onValueChange={setDelay}>
                    <SelectTrigger id="delay-select" className="h-9 text-xs">
                      <SelectValue placeholder="No delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0ms (Instant response)</SelectItem>
                      <SelectItem value="300">300ms (Fast 4G / Localhost)</SelectItem>
                      <SelectItem value="1000">1000ms (1 second delay)</SelectItem>
                      <SelectItem value="2000">2000ms (2 seconds delay - test loading states)</SelectItem>
                      <SelectItem value="4000">4000ms (4 seconds delay - slow mobile simulation)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10 text-xs space-y-2">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-400 block">How to call in your local app:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    You can copy the generated URL and query it from any external frontend codebase, curl, or terminal command. It has CORS headers fully enabled.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick curl generator */}
            <Card className="border">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">cURL Command</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => copyToClipboard(`curl -i "${simulatedUrl}"`, 'cURL')}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="bg-secondary/80 p-3 rounded font-mono text-[11px] break-all leading-relaxed text-foreground border">
                  curl -i &quot;{simulatedUrl}&quot;
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Endpoint URL, Live Test & JSON results (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Compiled URL Preview */}
            <Card className="border shadow-md">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-bold text-primary flex items-center gap-1.5">
                  <LinkIcon className="h-4 w-4 text-indigo-500" />
                  Compiled Sandbox Endpoint
                </CardTitle>
                <CardDescription className="text-xs">
                  This endpoint is live and fully operational. Try calling it.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={simulatedUrl}
                    readOnly
                    className="font-mono text-xs h-10 bg-secondary/30 focus-visible:ring-0 select-all"
                  />
                  <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => copyToClipboard(simulatedUrl, 'Endpoint URL')} title="Copy URL">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Selected delay: <strong>{delay}ms</strong></span>
                  </div>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold gap-1.5" onClick={handleTestRequest} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Fetching...
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-current" />
                        Test Endpoint Live
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card className="border shadow-md">
              <CardHeader className="pb-3 border-b bg-secondary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Terminal className="h-4.5 w-4.5 text-primary" />
                      Live Response Tester Output
                    </CardTitle>
                    <CardDescription className="text-xs">
                      See the live headers and payload parsed in real-time.
                    </CardDescription>
                  </div>
                  {testStatus !== null && getStatusBadge(testStatus)}
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {testResponse ? (
                  <Tabs defaultValue="payload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-muted h-8">
                      <TabsTrigger value="payload" className="text-xs">JSON Body</TabsTrigger>
                      <TabsTrigger value="headers" className="text-xs">Headers</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="payload" className="pt-2">
                      <Textarea
                        value={JSON.stringify(testResponse, null, 2)}
                        readOnly
                        className="font-mono text-[11px] min-h-[220px] bg-secondary/30 resize-y"
                      />
                    </TabsContent>

                    <TabsContent value="headers" className="pt-2">
                      <div className="bg-secondary/30 border rounded-lg p-3 font-mono text-[11px] space-y-2">
                        {Object.entries(testHeaders).map(([key, val]) => (
                          <div key={key} className="flex justify-between border-b pb-1 last:border-0 last:pb-0">
                            <span className="text-muted-foreground font-semibold">{key}:</span>
                            <span className="text-foreground">{val}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="py-12 text-center border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-xs text-muted-foreground font-medium">No active response loaded yet.</p>
                    <p className="text-[11px] text-muted-foreground/80 max-w-sm">
                      Click the &quot;Test Endpoint Live&quot; button above to send a client-side request and analyze the simulated payload.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/30 border-t py-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> CORS Allowed (* origin)
                </span>
                <span>Content-Type: application/json</span>
              </CardFooter>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
