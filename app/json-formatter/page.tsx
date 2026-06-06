"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  FileJson, 
  Check, 
  Copy, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  FileCode, 
  Sliders, 
  Search, 
  Sparkles,
  Info,
  ArrowRightLeft
} from 'lucide-react';

const SAMPLE_SIMPLE = {
  name: "DevSuite Hub Sandbox",
  version: "1.4.0",
  active: true,
  tags: ["developer", "sandbox", "offline-first"]
};

const SAMPLE_NESTED = {
  organization: "Acme Sandbox Lab",
  location: "San Francisco, CA",
  founded: 2024,
  departments: [
    {
      name: "Engineering",
      head: "Sarah Chen",
      budget: 150000,
      activeProjects: ["api-tester", "jwt-debugger", "json-formatter"]
    },
    {
      name: "Product Design",
      head: "Marcus V.",
      budget: 85000,
      activeProjects: ["figma-tokens", "custom-ui-builder"]
    }
  ],
  status: "Operational"
};

const SAMPLE_CONFIG = {
  server: {
    host: "127.0.0.1",
    port: 8080,
    ssl: {
      enabled: true,
      certPath: "/etc/ssl/certs/sandbox.pem",
      keyPath: "/etc/ssl/private/sandbox.key"
    }
  },
  cors: {
    allowedOrigins: ["https://devsuite-hub.io", "http://localhost:3000"],
    maxAge: 3600,
    credentials: true
  },
  rateLimit: {
    requestsPerMinute: 120,
    burstSize: 20
  }
};

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState(JSON.stringify(SAMPLE_NESTED, null, 2));
  const [outputJson, setOutputJson] = useState(JSON.stringify(SAMPLE_NESTED, null, 2));
  const [spacing, setSpacing] = useState('2');
  const [jsonPath, setJsonPath] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    keysCount: 12,
    sizeBytes: JSON.stringify(SAMPLE_NESTED).length,
    linesCount: JSON.stringify(SAMPLE_NESTED, null, 2).split('\n').length
  });

  // Main utility to parse and format
  const formatJson = (spaceVal = spacing) => {
    try {
      if (!inputJson.trim()) {
        setValidationError("Input is empty.");
        return;
      }
      const parsed = JSON.parse(inputJson);
      const indent = spaceVal === 'tab' ? '\t' : parseInt(spaceVal, 10);
      const formatted = JSON.stringify(parsed, null, indent);
      
      setOutputJson(formatted);
      setValidationError(null);
      updateStats(parsed, formatted);
      toast.success("JSON parsed and beautifully formatted!");
    } catch (err: any) {
      setValidationError(err.message);
      toast.error("Invalid JSON detected. Please fix syntax errors.");
    }
  };

  // Minify JSON (remove all whitespace)
  const minifyJson = () => {
    try {
      if (!inputJson.trim()) return;
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      
      setOutputJson(minified);
      setValidationError(null);
      updateStats(parsed, minified);
      toast.success("JSON minified successfully!");
    } catch (err: any) {
      setValidationError(err.message);
      toast.error("Minify failed: Invalid JSON structure.");
    }
  };

  // Run JSONPath simulation
  const queryJsonPath = (path: string) => {
    setJsonPath(path);
    if (!path.trim()) {
      formatJson();
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      // Basic simulation of direct key selection or array indices
      // E.g. "departments[0].name" or "organization" or "server.ssl.enabled"
      const cleanPath = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
      const keys = cleanPath.split('.');
      
      let result = parsed;
      for (const key of keys) {
        if (result === undefined || result === null) break;
        result = result[key];
      }

      if (result === undefined) {
        setOutputJson(`// No match found for JSON path: ${path}`);
      } else {
        const indent = spacing === 'tab' ? '\t' : parseInt(spacing, 10);
        setOutputJson(JSON.stringify(result, null, indent));
      }
    } catch (err) {
      // Ignore intermediate typing errors
    }
  };

  // Convert JSON to YAML mockup converter
  const convertToYaml = () => {
    try {
      const parsed = JSON.parse(inputJson);
      
      // Simple custom YAML serializer for preview purposes
      const toYamlStr = (obj: any, depth = 0): string => {
        const indentStr = "  ".repeat(depth);
        if (typeof obj !== 'object' || obj === null) {
          return ` ${obj}\n`;
        }
        
        let yaml = "\n";
        if (Array.isArray(obj)) {
          obj.forEach((item) => {
            if (typeof item === 'object' && item !== null) {
              const inner = toYamlStr(item, depth + 1).trimStart();
              yaml += `${indentStr}- ${inner}`;
            } else {
              yaml += `${indentStr}- ${item}\n`;
            }
          });
        } else {
          Object.keys(obj).forEach((key) => {
            const val = obj[key];
            if (typeof val === 'object' && val !== null) {
              yaml += `${indentStr}${key}:${toYamlStr(val, depth + 1)}`;
            } else {
              yaml += `${indentStr}${key}: ${val}\n`;
            }
          });
        }
        return yaml;
      };

      const yamlOutput = `# Generated with DevSuite Hub YAML Engine\n---${toYamlStr(parsed).trimEnd()}`;
      setOutputJson(yamlOutput);
      setValidationError(null);
      toast.success("Converted successfully to YAML format!");
    } catch (err: any) {
      setValidationError(err.message);
      toast.error("Conversion failed: Invalid JSON input.");
    }
  };

  // Convert JSON to XML mockup converter
  const convertToXml = () => {
    try {
      const parsed = JSON.parse(inputJson);
      
      const toXmlStr = (obj: any, rootName = "root"): string => {
        let xml = "";
        if (typeof obj !== 'object' || obj === null) {
          return obj;
        }

        if (Array.isArray(obj)) {
          obj.forEach((item) => {
            xml += `<item>${toXmlStr(item, "item")}</item>\n`;
          });
        } else {
          Object.keys(obj).forEach((key) => {
            const val = obj[key];
            const cleanKey = key.replace(/[^a-zA-Z0-9]/g, '_');
            if (Array.isArray(val)) {
              xml += `<${cleanKey}>\n  ${toXmlStr(val, cleanKey).trim()}\n</${cleanKey}>\n`;
            } else if (typeof val === 'object' && val !== null) {
              xml += `<${cleanKey}>\n  ${toXmlStr(val, cleanKey).trim()}\n</${cleanKey}>\n`;
            } else {
              xml += `<${cleanKey}>${val}</${cleanKey}>\n`;
            }
          });
        }
        return xml;
      };

      const xmlOutput = `<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n${toXmlStr(parsed, "root").split('\n').map(line => '  ' + line).join('\n')}\n</root>`;
      setOutputJson(xmlOutput.replace(/\n\s*\n/g, '\n'));
      setValidationError(null);
      toast.success("Converted successfully to XML format!");
    } catch (err: any) {
      setValidationError(err.message);
      toast.error("Conversion failed: Invalid JSON input.");
    }
  };

  // Update stats summary
  const updateStats = (parsedObj: any, formattedStr: string) => {
    const keysCount = Object.keys(parsedObj).length;
    const sizeBytes = new Blob([formattedStr]).size;
    const linesCount = formattedStr.split('\n').length;
    setStats({ keysCount, sizeBytes, linesCount });
  };

  // Quick loaders
  const loadDataset = (data: any) => {
    const str = JSON.stringify(data, null, 2);
    setInputJson(str);
    setOutputJson(str);
    setValidationError(null);
    updateStats(data, str);
    toast.info("Loaded sample JSON dataset.");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied output successfully!");
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setValidationError(null);
    toast.info("Workspace cleared.");
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Header Banner */}
      <section className="bg-card border-b py-10 mb-8">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-emerald-500 bg-emerald-500/5 border-emerald-500/20 px-2 py-0.5">
                  Developer Utilities
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">Real-time Client Validation</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">JSON Formatter & Converter</h1>
              <p className="text-muted-foreground text-sm max-w-2xl">
                Beautify, validate, minify, and query your JSON payloads instantly in your browser. Seamlessly convert JSON structures into YAML or XML schemas.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" variant="outline" onClick={() => loadDataset(SAMPLE_SIMPLE)}>
                Simple Object
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadDataset(SAMPLE_NESTED)}>
                Nested Array
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadDataset(SAMPLE_CONFIG)}>
                Nested Config
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Formatter Grid */}
      <main className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Input Editor (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <Card className="border shadow-md flex-1 flex flex-col">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <FileJson className="h-4 w-4 text-emerald-500" />
                    Input JSON Editor
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={clearAll} title="Clear workspace">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-xs">
                  Paste raw, minified, or messy JSON below to begin.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 flex-1 flex flex-col space-y-4">
                <Textarea
                  value={inputJson}
                  onChange={(e) => setInputJson(e.target.value)}
                  placeholder='{ "key": "value" }'
                  className="font-mono text-xs min-h-[350px] flex-1 resize-y focus-visible:ring-emerald-500"
                />

                {/* Validation Status */}
                {validationError ? (
                  <Alert variant="destructive" className="py-2.5">
                    <Info className="h-4 w-4" />
                    <AlertTitle className="text-xs font-bold">Invalid JSON Syntax</AlertTitle>
                    <AlertDescription className="text-xs font-mono">
                      {validationError}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 border-emerald-500/20 py-2.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <AlertTitle className="text-xs font-bold">Valid JSON Syntax</AlertTitle>
                    <AlertDescription className="text-xs">
                      No lexical or syntax errors found. Ready to convert or style.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="bg-muted/30 border-t py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="spacing-select" className="text-xs font-medium text-muted-foreground">Spacing:</Label>
                  <Select value={spacing} onValueChange={(val) => {
                    setSpacing(val);
                    formatJson(val);
                  }}>
                    <SelectTrigger id="spacing-select" className="w-[110px] h-8 text-xs font-mono">
                      <SelectValue placeholder="2 Spaces" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Spaces</SelectItem>
                      <SelectItem value="4">4 Spaces</SelectItem>
                      <SelectItem value="8">8 Spaces</SelectItem>
                      <SelectItem value="tab">Tab Indent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs" onClick={minifyJson}>
                    <Minimize2 className="mr-1.5 h-3.5 w-3.5" />
                    Minify
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs" onClick={() => formatJson()}>
                    <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
                    Beautify
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* RIGHT COLUMN: Output Preview & Actions (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <Card className="border shadow-md flex-1 flex flex-col">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-primary" />
                    Formatted Output
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => copyToClipboard(outputJson)}>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Result
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-xs">
                  Review the styled JSON, YAML, XML, or parsed query results.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 flex-1 flex flex-col space-y-4">
                {/* Real-time JSONPath filter search bar */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Filter output using simple JS path (e.g. departments[0].name)"
                    value={jsonPath}
                    onChange={(e) => queryJsonPath(e.target.value)}
                    className="pl-9 text-xs font-mono h-9 focus-visible:ring-emerald-500"
                  />
                  {jsonPath && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => { setJsonPath(''); formatJson(); }} 
                      className="absolute right-1.5 top-1.5 h-6 text-[10px] px-2"
                    >
                      Clear Filter
                    </Button>
                  )}
                </div>

                <Textarea
                  value={outputJson}
                  readOnly
                  placeholder="Processed output will display here..."
                  className="font-mono text-xs min-h-[300px] flex-1 bg-secondary/30 border-muted focus-visible:ring-0 resize-y"
                />

                {/* Live Stats Row */}
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-secondary/50 p-2.5 rounded-lg border font-mono">
                  <div>
                    <span className="text-muted-foreground block">Root Keys</span>
                    <span className="font-bold text-primary">{stats.keysCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Size</span>
                    <span className="font-bold text-primary">{(stats.sizeBytes / 1024).toFixed(3)} KB</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Total Lines</span>
                    <span className="font-bold text-primary">{stats.linesCount}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t py-3 flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowRightLeft className="h-3.5 w-3.5 text-primary" />
                  Export Schema
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs" onClick={convertToYaml}>
                    Convert to YAML
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={convertToXml}>
                    Convert to XML
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
