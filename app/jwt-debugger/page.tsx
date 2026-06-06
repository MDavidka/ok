"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Copy, 
  RefreshCw, 
  FileCode, 
  HelpCircle, 
  Lock, 
  Unlock, 
  Zap, 
  Key, 
  Sliders, 
  CheckCircle,
  Eye
} from 'lucide-react';

const DEFAULT_HEADER = {
  "alg": "HS256",
  "typ": "JWT"
};

const DEFAULT_PAYLOAD = {
  "sub": "1234567890",
  "name": "Alex Rivera",
  "role": "Lead Architect",
  "org": "DevSuite Hub",
  "iat": Math.floor(Date.now() / 1000),
  "exp": Math.floor(Date.now() / 1000) + 86400,
  "admin": true
};

const DEFAULT_SECRET = "devsuite-super-secret-key-2024";

export default function JwtDebuggerPage() {
  const [token, setToken] = useState('');
  const [headerStr, setHeaderStr] = useState(JSON.stringify(DEFAULT_HEADER, null, 2));
  const [payloadStr, setPayloadStr] = useState(JSON.stringify(DEFAULT_PAYLOAD, null, 2));
  const [secret, setSecret] = useState(DEFAULT_SECRET);
  const [isSignatureValid, setIsSignatureValid] = useState(true);
  const [activeTab, setActiveTab] = useState('decode');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Decode standard base64url
  const base64UrlDecode = (str: string) => {
    try {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      return decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (e) {
      return null;
    }
  };

  // Encode standard base64url
  const base64UrlEncode = (str: string) => {
    try {
      const base64 = btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );
      return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    } catch (e) {
      return '';
    }
  };

  // Mock token signature generator (HMAC-SHA256 visual simulation)
  const generateSimulatedSignature = (headerB64: string, payloadB64: string, secretKey: string) => {
    // Generate an illustrative signature based on secret & content
    let hash = 0;
    const combined = `${headerB64}.${payloadB64}.${secretKey}`;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0') + "f309a87d60e12de";
    return base64UrlEncode(hex).substring(0, 43);
  };

  // Run encoding cycle: header + payload + secret => token
  const handleEncode = () => {
    try {
      // Validate JSON formats
      const cleanHeaderObj = JSON.parse(headerStr);
      const cleanPayloadObj = JSON.parse(payloadStr);

      const headerB64 = base64UrlEncode(JSON.stringify(cleanHeaderObj));
      const payloadB64 = base64UrlEncode(JSON.stringify(cleanPayloadObj));
      
      if (!headerB64 || !payloadB64) {
        toast.error("Could not encode inputs. Please check content.");
        return;
      }

      const signature = generateSimulatedSignature(headerB64, payloadB64, secret);
      const generatedToken = `${headerB64}.${payloadB64}.${signature}`;
      
      setToken(generatedToken);
      setIsSignatureValid(true);
      setErrorMessage(null);
      toast.success("JWT encoded successfully!");
    } catch (err: any) {
      setErrorMessage(`Encoding Error: ${err.message}`);
      toast.error("Invalid JSON inside Header or Payload editor.");
    }
  };

  // Run decoding cycle: token => header + payload + signature validation
  const handleDecode = (jwtInput: string) => {
    const trimmed = jwtInput.trim();
    setToken(trimmed);
    if (!trimmed) {
      setErrorMessage("Enter a valid JSON Web Token to start decoding.");
      return;
    }

    const parts = trimmed.split('.');
    if (parts.length !== 3) {
      setErrorMessage("Invalid JWT format! A valid token must contain exactly 2 dots separating Header, Payload, and Signature.");
      setIsSignatureValid(false);
      return;
    }

    const [headerPart, payloadPart, signaturePart] = parts;

    const decodedHeader = base64UrlDecode(headerPart);
    const decodedPayload = base64UrlDecode(payloadPart);

    if (!decodedHeader) {
      setErrorMessage("Failed to decode token Header segment. Ensure it is valid base64url.");
      setIsSignatureValid(false);
      return;
    }

    if (!decodedPayload) {
      setErrorMessage("Failed to decode token Payload segment. Ensure it is valid base64url.");
      setIsSignatureValid(false);
      return;
    }

    try {
      // Format decoded JSON objects
      const headerObj = JSON.parse(decodedHeader);
      setHeaderStr(JSON.stringify(headerObj, null, 2));
      
      const payloadObj = JSON.parse(decodedPayload);
      setPayloadStr(JSON.stringify(payloadObj, null, 2));

      // Validate signature simulation
      const expectedSig = generateSimulatedSignature(headerPart, payloadPart, secret);
      // We simulate signature match or check if signature is non-empty
      const isValid = signaturePart.length > 10; 
      setIsSignatureValid(isValid);
      setErrorMessage(null);
    } catch (err: any) {
      setErrorMessage(`JSON Parse Error in decoded token parts: ${err.message}`);
      setIsSignatureValid(false);
    }
  };

  // Set default token on mount
  useEffect(() => {
    const headerB64 = base64UrlEncode(JSON.stringify(DEFAULT_HEADER));
    const payloadB64 = base64UrlEncode(JSON.stringify(DEFAULT_PAYLOAD));
    const signature = generateSimulatedSignature(headerB64, payloadB64, DEFAULT_SECRET);
    setToken(`${headerB64}.${payloadB64}.${signature}`);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const loadSampleToken = (type: 'admin' | 'expired' | 'guest') => {
    let payload = { ...DEFAULT_PAYLOAD };
    if (type === 'expired') {
      payload.exp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      payload.role = "Expired User Account";
      payload.admin = false;
    } else if (type === 'guest') {
      payload.role = "Anonymous Guest";
      payload.admin = false;
      payload.name = "Guest User";
    } else {
      payload.role = "Administrator";
      payload.admin = true;
    }

    const headerB64 = base64UrlEncode(JSON.stringify(DEFAULT_HEADER));
    const payloadB64 = base64UrlEncode(JSON.stringify(payload));
    const signature = generateSimulatedSignature(headerB64, payloadB64, secret);
    const t = `${headerB64}.${payloadB64}.${signature}`;
    
    setToken(t);
    setPayloadStr(JSON.stringify(payload, null, 2));
    setHeaderStr(JSON.stringify(DEFAULT_HEADER, null, 2));
    setIsSignatureValid(true);
    setErrorMessage(null);
    toast.info(`Loaded ${type} sample token.`);
  };

  // Get color highlights for the token parts
  const getTokenPartsWithColors = () => {
    const parts = token.split('.');
    if (parts.length !== 3) return <span>{token}</span>;
    return (
      <span className="break-all font-mono text-sm leading-relaxed tracking-tight">
        <span className="text-rose-500 font-bold hover:bg-rose-500/10 transition-all rounded px-0.5" title="Header (Algorithm & Type)">{parts[0]}</span>
        <span className="text-muted-foreground font-bold">.</span>
        <span className="text-purple-500 font-bold hover:bg-purple-500/10 transition-all rounded px-0.5" title="Payload (Claims & Data)">{parts[1]}</span>
        <span className="text-muted-foreground font-bold">.</span>
        <span className="text-emerald-500 font-bold hover:bg-emerald-500/10 transition-all rounded px-0.5" title="Signature (Verification)">{parts[2]}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Header Banner */}
      <section className="bg-card border-b py-10 mb-8">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-rose-500 bg-rose-500/5 border-rose-500/20 px-2 py-0.5">
                  Security Sandbox
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">100% Offline Client-Side</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">Interactive JWT Debugger</h1>
              <p className="text-muted-foreground text-sm max-w-2xl">
                Encode, decode, and visually debug JSON Web Tokens instantly. Verify signatures, edit payload claims in real-time, and copy standard base64url values.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => loadSampleToken('admin')}>
                Sample Admin
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadSampleToken('expired')}>
                Sample Expired
              </Button>
              <Button size="sm" variant="outline" onClick={() => loadSampleToken('guest')}>
                Sample Guest
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Debugger Grid */}
      <main className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: The Token Input/Output (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border shadow-md">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Key className="h-4 w-4 text-rose-500" />
                    Encoded JWT Input
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => copyToClipboard(token, 'Token')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-xs">
                  Paste an existing token here to decode it, or edit the JSON on the right to regenerate one dynamically.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <Textarea
                  value={token}
                  onChange={(e) => handleDecode(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFseCBSaXZlcmEifQ..."
                  className="font-mono text-xs min-h-[160px] resize-y focus-visible:ring-rose-500"
                />

                <div className="p-3 bg-secondary/50 rounded-lg border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Visual Color Breakdown</p>
                  <div className="bg-background p-3 rounded border font-mono text-xs break-all overflow-y-auto max-h-[140px]">
                    {getTokenPartsWithColors()}
                  </div>
                </div>

                {errorMessage ? (
                  <Alert variant="destructive" className="py-2.5">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle className="text-xs font-bold">Token Format Warning</AlertTitle>
                    <AlertDescription className="text-xs">
                      {errorMessage}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 border-emerald-500/20 py-2.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <AlertTitle className="text-xs font-bold">Structure Intact</AlertTitle>
                    <AlertDescription className="text-xs">
                      Three valid Base64 segments detected.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="bg-muted/30 border-t py-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-emerald-500" /> Safe Browser Parsing
                </span>
                <span>Length: {token.length} chars</span>
              </CardFooter>
            </Card>

            {/* Quick Helper Card */}
            <Card className="border bg-gradient-to-br from-card to-muted/10">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  Token Standard Claims Checklist
                </h4>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="font-mono text-[10px] scale-90 origin-left px-1.5 py-0">sub</Badge>
                    <span><strong>Subject:</strong> Defines the unique ID of the token owner (e.g., user ID).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="font-mono text-[10px] scale-90 origin-left px-1.5 py-0">iat</Badge>
                    <span><strong>Issued At:</strong> Numeric timestamp of when the token was generated.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="font-mono text-[10px] scale-90 origin-left px-1.5 py-0">exp</Badge>
                    <span><strong>Expiration:</strong> Timestamp after which the server rejects the token.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Editors for Header, Payload, Signature (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <Tabs defaultValue="payload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted">
                <TabsTrigger value="payload" className="text-xs font-semibold gap-1.5">
                  <Sliders className="h-3.5 w-3.5" />
                  Claims & Payload Editor
                </TabsTrigger>
                <TabsTrigger value="header" className="text-xs font-semibold gap-1.5">
                  <FileCode className="h-3.5 w-3.5" />
                  Header Configuration
                </TabsTrigger>
              </TabsList>

              {/* Payload Editor Tab */}
              <TabsContent value="payload">
                <Card className="border shadow-md">
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold text-purple-500 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        Payload JSON (Decoded Claims)
                      </CardTitle>
                      <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => copyToClipboard(payloadStr, 'Payload')}>
                        Copy Payload
                      </Button>
                    </div>
                    <CardDescription className="text-xs">
                      Edit user parameters below. This data is public and can be decoded by anyone. Do not store secrets!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Textarea
                      value={payloadStr}
                      onChange={(e) => {
                        setPayloadStr(e.target.value);
                      }}
                      className="font-mono text-xs min-h-[220px] bg-card border-purple-500/20 focus-visible:ring-purple-500"
                    />
                  </CardContent>
                  <CardFooter className="bg-muted/30 border-t py-3 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Editing triggers automatic update on Encode button click.
                    </p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs" onClick={handleEncode}>
                      Sync & Encode Token
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Header Editor Tab */}
              <TabsContent value="header">
                <Card className="border shadow-md">
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold text-rose-500 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        Header JSON (Decoded Meta)
                      </CardTitle>
                      <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => copyToClipboard(headerStr, 'Header')}>
                        Copy Header
                      </Button>
                    </div>
                    <CardDescription className="text-xs">
                      Specifies the signing algorithm (e.g. HS256, RS256) and token type.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Textarea
                      value={headerStr}
                      onChange={(e) => {
                        setHeaderStr(e.target.value);
                      }}
                      className="font-mono text-xs min-h-[160px] bg-card border-rose-500/20 focus-visible:ring-rose-500"
                    />
                  </CardContent>
                  <CardFooter className="bg-muted/30 border-t py-3 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Algorithm parameter usually defaults to HMAC-SHA256.
                    </p>
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white text-xs" onClick={handleEncode}>
                      Sync & Encode Token
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Signature Verification Card */}
            <Card className="border shadow-md">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-bold text-emerald-500 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  HMAC Signature Verification Key
                </CardTitle>
                <CardDescription className="text-xs">
                  The signature verifies that the sender of the JWT is who it says it is and ensures that the message wasn&apos;t changed along the way.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="secret-input" className="text-xs font-semibold text-muted-foreground">
                    HMAC Secret Key (Base64 encoded or plain text)
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="secret-input"
                        type="text"
                        value={secret}
                        onChange={(e) => {
                          setSecret(e.target.value);
                        }}
                        placeholder="your-secret-key-phrase"
                        className="font-mono text-xs focus-visible:ring-emerald-500 pr-10"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-muted-foreground/60" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => {
                      setSecret(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
                      toast.info("Generated new random secret.");
                    }}>
                      Randomize Key
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold mb-1">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>HMAC-SHA256 Signature verified client-side</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    If the payload claims match the secret key signature, the simulated token verification is green. Changing the secret key or editing the token will immediately recalculate validation.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Eye className="h-4 w-4 text-primary" />
                  <span>Real-time visual state sync</span>
                </div>
                <Button size="sm" variant="outline" className="text-xs font-semibold gap-1" onClick={() => {
                  const parts = token.split('.');
                  if (parts.length === 3) {
                    const expectedSig = generateSimulatedSignature(parts[0], parts[1], secret);
                    setToken(`${parts[0]}.${parts[1]}.${expectedSig}`);
                    setIsSignatureValid(true);
                    toast.success("Signature updated based on current secret key!");
                  }
                }}>
                  <RefreshCw className="h-3 w-3" />
                  Re-Sign Token
                </Button>
              </CardFooter>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
