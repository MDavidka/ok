"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Play, Terminal, Trash2, Send, HelpCircle, Loader2, Sparkles, RefreshCw } from 'lucide-react';

export default function ApiTesterPage() {
  const [url, setUrl] = useState('/api/mock-endpoint');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [body, setBody] = useState('{\n  "name": "Jane Doe",\n  "email": "jane@example.com",\n  "role": "Lead Architect"\n}');
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([
    { key: 'category', value: 'all' },
    { key: 'limit', value: '3' }
  ]);
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: 'Content-Type', value: 'application/json' }
  ]);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});

  const addQueryParam = () => setQueryParams([...queryParams, { key: '', value: '' }]);
  const removeQueryParam = (index: number) => setQueryParams(queryParams.filter((_, i) => i !== index));
  const updateQueryParam = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...queryParams];
    updated[index][field] = val;
    setQueryParams(updated);
  };

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);
  const removeHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));
  const updateHeader = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...headers];
    updated[index][field] = val;
    setHeaders(updated);
  };

  const loadPreset = (preset: 'get-mock' | 'post-mock' | 'delete-mock' | 'swapi') => {
    if (preset === 'get-mock') {
      setUrl('/api/mock-endpoint');
      setMethod('GET');
      setQueryParams([
        { key: 'category', value: 'software' },
        { key: 'limit', value: '2' }
      ]);
      toast.success('Loaded Mock GET Preset');
    } else if (preset === 'post-mock') {
      setUrl('/api/mock-endpoint');
      setMethod('POST');
      setQueryParams([]);
      setBody('{\n  "name": "Alex Rivera",\n  "email": "alex@devflow.io",\n  "role": "Lead Architect",\n  "company": "DevFlow Solutions"\n}');
      toast.success('Loaded Mock POST Preset');
    } else if (preset === 'delete-mock') {
      setUrl('/api/mock-endpoint');
      setMethod('DELETE');
      setQueryParams([{ key: 'id', value: '101' }]);
      toast.success('Loaded Mock DELETE Preset');
    } else if (preset === 'swapi') {
      setUrl('https://swapi.py4e.com/api/people/1/');
      setMethod('GET');
      setQueryParams([]);
      toast.success('Loaded Star Wars Public API Preset');
    }
  };

  const executeRequest = async () => {
    setLoading(true);
    setResponse(null);
    setResponseStatus(null);
    setLatency(null);

    // Build query string
    const activeParams = queryParams.filter(p => p.key.trim() !== '');
    const queryString = activeParams.length > 0
      ? '?' + activeParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&')
      : '';

    const finalUrl = url.startsWith('http') ? `${url}${queryString}` : `${window.location.origin}${url}${queryString}`;

    const fetchOptions: RequestInit = {
      method: method,
      headers: headers.reduce((acc, curr) => {
        if (curr.key.trim()) acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>)
    };

    if (method !== 'GET' && body) {
      try {
        // Validate JSON formatting
        JSON.parse(body);
        fetchOptions.body = body;
      } catch (err) {
        toast.error('Body contains invalid JSON format. Please verify syntax.');
        setLoading(false);
        return;
      }
    }

    const startTime = performance.now();

    try {
      const res = await fetch(finalUrl, fetchOptions);
      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));
      setResponseStatus(res.status);

      // Parse headers
      const resHeaders: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        resHeaders[key] = val;
      });
      setResponseHeaders(resHeaders);

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(data);
      } else {
        const text = await res.text();
        setResponse({ rawText: text });
      }
      toast.success(`Request completed with status ${res.status}`);
    } catch (err: any) {
      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));
      setResponseStatus(500);
      setResponse({
        error: 'Network Request Failed',
        message: err.message || 'Make sure the remote server allows CORS requests and is currently active.',
        details: 'If testing local endpoints, verify they are listening on the correct port.'
      });
      toast.error('Network request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-muted text-primary">HTTP Sandbox Client</Badge>
              <span className="text-xs text-emerald-500 font-mono flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Online
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Terminal className="h-7 w-7 text-primary" />
              Live API Tester Client
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Construct, execute, and analyze HTTP requests directly from your browser. Test our pre-configured local mock endpoints or fetch public external REST services.
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Load Presets:</span>
            <Button size="sm" variant="outline" onClick={() => loadPreset('get-mock')} className="text-xs">
              GET Mock
            </Button>
            <Button size="sm" variant="outline" onClick={() => loadPreset('post-mock')} className="text-xs">
              POST Mock
            </Button>
            <Button size="sm" variant="outline" onClick={() => loadPreset('delete-mock')} className="text-xs">
              DELETE Mock
            </Button>
            <Button size="sm" variant="outline" onClick={() => loadPreset('swapi')} className="text-xs text-indigo-500 hover:text-indigo-600">
              Star Wars API
            </Button>
          </div>
        </div>

        {/* Workspace Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Request Builder */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Request Configuration
                </CardTitle>
                <CardDescription>
                  Configure URL parameters, custom headers, and payload bodies.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Method & URL Row */}
                <div className="flex gap-2.5">
                  <div className="w-[110px] shrink-0">
                    <Select value={method} onValueChange={(val: any) => setMethod(val)}>
                      <SelectTrigger className="font-bold">
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET" className="text-blue-500 font-semibold">GET</SelectItem>
                        <SelectItem value="POST" className="text-emerald-500 font-semibold">POST</SelectItem>
                        <SelectItem value="PUT" className="text-amber-500 font-semibold">PUT</SelectItem>
                        <SelectItem value="DELETE" className="text-rose-500 font-semibold">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Enter absolute URL or relative api route..."
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Parameters & Body Tabs */}
                <Tabs defaultValue="params" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="params" className="text-xs">
                      Query Params ({queryParams.length})
                    </TabsTrigger>
                    <TabsTrigger value="headers" className="text-xs">
                      Headers ({headers.length})
                    </TabsTrigger>
                    <TabsTrigger value="body" className="text-xs" disabled={method === 'GET'}>
                      JSON Body
                    </TabsTrigger>
                  </TabsList>

                  {/* Query Params Tab */}
                  <TabsContent value="params" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">URL Query Parameters</span>
                      <Button size="sm" variant="outline" onClick={addQueryParam} className="h-7 text-xs">
                        Add Parameter
                      </Button>
                    </div>
                    {queryParams.length === 0 ? (
                      <div className="text-center py-4 border border-dashed rounded-lg text-xs text-muted-foreground">
                        No query parameters configured.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {queryParams.map((param, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <Input
                              placeholder="Parameter Key"
                              value={param.key}
                              onChange={e => updateQueryParam(index, 'key', e.target.value)}
                              className="h-8 font-mono text-xs"
                            />
                            <Input
                              placeholder="Value"
                              value={param.value}
                              onChange={e => updateQueryParam(index, 'value', e.target.value)}
                              className="h-8 font-mono text-xs"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeQueryParam(index)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* Headers Tab */}
                  <TabsContent value="headers" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">Request Headers</span>
                      <Button size="sm" variant="outline" onClick={addHeader} className="h-7 text-xs">
                        Add Header
                      </Button>
                    </div>
                    {headers.length === 0 ? (
                      <div className="text-center py-4 border border-dashed rounded-lg text-xs text-muted-foreground">
                        No custom headers configured.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {headers.map((header, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <Input
                              placeholder="Header Name"
                              value={header.key}
                              onChange={e => updateHeader(index, 'key', e.target.value)}
                              className="h-8 font-mono text-xs"
                            />
                            <Input
                              placeholder="Value"
                              value={header.value}
                              onChange={e => updateHeader(index, 'value', e.target.value)}
                              className="h-8 font-mono text-xs"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeHeader(index)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* JSON Body Tab */}
                  <TabsContent value="body" className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">JSON Body Payload</span>
                      <span className="text-[10px] text-muted-foreground font-mono">application/json</span>
                    </div>
                    <Textarea
                      value={body}
                      onChange={e => setBody(e.target.value)}
                      className="font-mono text-xs min-h-[160px] bg-muted/30"
                      placeholder="{\n  &quot;key&quot;: &quot;value&quot;\n}"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="border-t py-4 flex items-center justify-between bg-muted/10">
                <div className="text-xs text-muted-foreground">
                  Method: <span className="font-bold text-primary">{method}</span>
                </div>
                <Button onClick={executeRequest} disabled={loading} className="gap-2 font-semibold">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Dispatching...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Request
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Documentation Alert Block */}
            <div className="bg-muted/40 border rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5" />
                Quick Sandbox Instructions
              </h4>
              <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>GET Sandbox:</strong> Fetch mock parameters from <code className="font-mono bg-muted p-0.5 rounded">/api/mock-endpoint</code>. Try sending a category argument like <code className="font-mono">software</code> or <code className="font-mono">hardware</code>.</li>
                <li><strong>POST / PUT Simulator:</strong> Send a JSON body payload with <code className="font-mono">name</code> and <code className="font-mono">email</code> to simulate record additions.</li>
                <li><strong>DELETE Method:</strong> Append query parameter <code className="font-mono">id=101</code> to view virtual deletion confirmation logs.</li>
              </ul>
            </div>
          </div>

          {/* Right Side: Response Viewer */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border shadow-sm h-full flex flex-col min-h-[450px]">
              <CardHeader className="pb-3 border-b bg-muted/10 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Response Monitor</CardTitle>
                  <CardDescription className="text-xs">
                    Live console logs and returned payload values.
                  </CardDescription>
                </div>
                {latency !== null && (
                  <Badge variant="secondary" className="font-mono text-xs text-muted-foreground">
                    {latency} ms
                  </Badge>
                )}
              </CardHeader>

              <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 p-4 font-mono text-xs overflow-auto max-h-[500px]">
                {loading ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-slate-400">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span>Executing HTTP request cycle...</span>
                  </div>
                ) : response ? (
                  <div className="space-y-4 w-full">
                    {/* Status Info bar */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span>Status:</span>
                        <span className={`font-bold ${responseStatus && responseStatus < 300 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {responseStatus}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[10px]">
                        {responseHeaders['content-type'] || 'application/json'}
                      </div>
                    </div>

                    {/* JSON Format */}
                    <div className="overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(response, null, 2)}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 text-slate-500 py-12">
                    <Terminal className="h-10 w-10 stroke-1" />
                    <div>
                      <p className="font-bold">No Active Response</p>
                      <p className="text-[11px] max-w-xs mt-1">
                        Configure your method parameters and click &quot;Send Request&quot; above to view live network records.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {response && (
                <CardFooter className="py-2.5 px-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Size: ~{JSON.stringify(response).length} bytes</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setResponse(null);
                      setResponseStatus(null);
                      setLatency(null);
                    }}
                    className="h-6 text-slate-400 hover:text-white text-[10px] gap-1"
                  >
                    <RefreshCw className="h-3 w-3" /> Clear Console
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
