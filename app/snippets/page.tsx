"use client";

import React, { useState, useMemo } from 'react';
import { CODE_SNIPPETS, CodeSnippet } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Search, Copy, Check, Code, Plus, ThumbsUp, Code2, Tag, Terminal, Sparkles, Filter } from 'lucide-react';

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>(CODE_SNIPPETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New snippet form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newLang, setNewLang] = useState('typescript');
  const [newTagsString, setNewTagsString] = useState('React, Next.js');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    snippets.forEach(s => s.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [snippets]);

  // Filter logic
  const filteredSnippets = useMemo(() => {
    return snippets.filter(snippet => {
      const matchesSearch = 
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === 'all' || snippet.tags.includes(selectedTag);
      const matchesDifficulty = selectedDifficulty === 'all' || snippet.difficulty === selectedDifficulty;

      return matchesSearch && matchesTag && matchesDifficulty;
    });
  }, [snippets, searchQuery, selectedTag, selectedDifficulty]);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success('Snippet copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id: string) => {
    setSnippets(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, likes: s.likes + 1 };
      }
      return s;
    }));
    toast.success('Liked snippet! Stored in local session.');
  };

  const handleAddSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newCode) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const parsedTags = newTagsString
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newSnippet: CodeSnippet = {
      id: `snip-custom-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      code: newCode,
      language: newLang,
      tags: parsedTags.length > 0 ? parsedTags : ['General'],
      likes: 0,
      difficulty: newDifficulty
    };

    setSnippets([newSnippet, ...snippets]);
    setIsDialogOpen(false);
    toast.success('Custom snippet added successfully to your session!');
    
    // Reset form
    setNewTitle('');
    setNewDesc('');
    setNewCode('');
    setNewLang('typescript');
    setNewTagsString('React, Custom');
    setNewDifficulty('Intermediate');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b bg-muted/30 py-16 md:py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="container relative z-10 max-w-5xl text-center space-y-4">
          <Badge variant="outline" className="px-3 py-1 bg-background text-primary animate-pulse gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            Interactive Repository
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Reusable Code Snippets
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated library of battle-tested templates, secure functions, and elegant helper hooks. Copy directly into your app or add your own custom snippets.
          </p>

          <div className="pt-4 flex justify-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="font-semibold gap-2 shadow-lg shadow-primary/10">
                  <Plus className="h-4.5 w-4.5" />
                  Add Custom Snippet
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <form onSubmit={handleAddSnippet}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Add New Code Snippet
                    </DialogTitle>
                    <DialogDescription>
                      Publish a clean, reusable snippet to the active list. This persists in your local browser sandbox context.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Snippet Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g. Fetch with Retry Logic"
                          value={newTitle}
                          onChange={e => setNewTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={newLang} onValueChange={setNewLang}>
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="css">CSS / Tailwind</SelectItem>
                            <SelectItem value="bash">Bash / Shell</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Short Description *</Label>
                      <Input
                        id="description"
                        placeholder="Explain what this code does and why it is useful..."
                        value={newDesc}
                        onChange={e => setNewDesc(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="code">Source Code *</Label>
                      <Textarea
                        id="code"
                        placeholder="paste your function, hook, or CSS classes here..."
                        className="font-mono text-xs min-h-[180px] bg-muted/50"
                        value={newCode}
                        onChange={e => setNewCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          placeholder="React, Hook, Async"
                          value={newTagsString}
                          onChange={e => setNewTagsString(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <Select value={newDifficulty} onValueChange={(val: any) => setNewDifficulty(val)}>
                          <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Publish Snippet</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container max-w-6xl py-10">
        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-card p-4 rounded-xl border items-center">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, keywords, tags, or code content..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-background"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Tag Filter */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Tag:</span>
            </div>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-[140px] h-10 bg-background">
                <SelectValue placeholder="All Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground ml-2">
              <span>Difficulty:</span>
            </div>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[140px] h-10 bg-background">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(searchQuery || selectedTag !== 'all' || selectedDifficulty !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('all');
                  setSelectedDifficulty('all');
                }}
                className="text-xs h-10"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Snippets Grid */}
        {filteredSnippets.length === 0 ? (
          <div className="text-center py-16 border rounded-xl bg-muted/10 space-y-3">
            <Code2 className="h-12 w-12 text-muted-foreground mx-auto stroke-1" />
            <h3 className="text-lg font-semibold">No Snippets Found</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              We couldn't find any code matching "{searchQuery}". Try clearing filters, adjusting your search keywords, or add a custom snippet.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('all');
                setSelectedDifficulty('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSnippets.map((snippet) => (
              <Card key={snippet.id} className="flex flex-col overflow-hidden border bg-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-3 border-b bg-muted/10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <span>{snippet.title}</span>
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                        {snippet.description}
                      </CardDescription>
                    </div>
                    <Badge variant={
                      snippet.difficulty === 'Advanced' ? 'destructive' :
                      snippet.difficulty === 'Intermediate' ? 'default' : 'secondary'
                    } className="text-xs shrink-0">
                      {snippet.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                
                {/* Code Body */}
                <CardContent className="p-0 flex-1 relative bg-slate-950 text-slate-100">
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {snippet.language}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(snippet.id, snippet.code)}
                      className="h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                      title="Copy code"
                    >
                      {copiedId === snippet.id ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <pre className="p-5 overflow-x-auto font-mono text-xs max-h-[280px] leading-relaxed scrollbar-thin">
                    <code>{snippet.code}</code>
                  </pre>
                </CardContent>

                {/* Footer Meta */}
                <CardFooter className="py-3 px-5 bg-muted/20 border-t flex items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    {snippet.tags.map(tag => (
                      <span
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="cursor-pointer text-muted-foreground hover:text-primary hover:underline"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(snippet.id)}
                      className="h-8 px-2.5 text-muted-foreground hover:text-primary gap-1.5 text-xs"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{snippet.likes}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Pro Tips Section */}
      <section className="bg-muted/30 border-t py-12 mt-16">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                <span>Developer Pro-Tips</span>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Clean and consistent code snippets prevent layout shifting, minimize duplicate network request triggers, and ensure strict compliance with modern web standards. Use these snippets as a foundation for your production-ready modules.
              </p>
            </div>
            <div className="bg-card p-5 rounded-xl border space-y-3">
              <h4 className="font-semibold text-sm">Need a specific function?</h4>
              <p className="text-xs text-muted-foreground">
                You can write any custom block using the form above. It supports TypeScript, JavaScript, Python, Bash scripts, and CSS.
              </p>
              <div className="text-xs font-mono bg-muted p-2.5 rounded text-muted-foreground">
                const framework = &quot;Next.js 14 App Router&quot;;
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
