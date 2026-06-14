import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Trello, 
  Coins, 
  Terminal, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Plus, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Send, 
  Sparkles, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Search
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
type Tab = 'dashboard' | 'kanban' | 'crypto' | 'ai';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  holding: number;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  // 1. Dashboard State
  const [mrr, setMrr] = useState(124500);
  const [activeUsers, setActiveUsers] = useState(1420);
  const [systemHealth, setSystemHealth] = useState(99.98);
  const [salesHistory, setSalesHistory] = useState([45, 52, 49, 62, 58, 74, 81, 95, 89, 110, 115, 124]);

  // 2. Kanban State
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Integrate Supabase Auth', description: 'Set up OAuth and email/password sign-in flows.', status: 'todo', priority: 'high' },
    { id: '2', title: 'Design landing page hero', description: 'Create high-converting glassmorphic hero section.', status: 'progress', priority: 'medium' },
    { id: '3', title: 'Optimize database indexes', description: 'Speed up query execution times on transactions table.', status: 'done', priority: 'high' },
    { id: '4', title: 'Write unit tests for checkout', description: 'Achieve >90% test coverage on Stripe integration.', status: 'backlog', priority: 'low' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // 3. Crypto Terminal State
  const [coins, setCoins] = useState<Coin[]>([
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 64250, change24h: 3.45, holding: 0.45 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3450, change24h: -1.22, holding: 2.5 },
    { id: 'sol', name: 'Solana', symbol: 'SOL', price: 142.8, change24h: 8.14, holding: 15.0 },
  ]);
  const [selectedCoin, setSelectedCoin] = useState<Coin>(coins[0]);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  // 4. AI Playground State
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hello! I am Glovix AI. How can I assist you with your project today?', timestamp: '12:00 PM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [aiTemperature, setAiTemperature] = useState(0.7);
  const [selectedPromptTemplate, setSelectedPromptTemplate] = useState('Code Refactoring');

  // ==========================================
  // SIMULATION EFFECTS (Live Dashboard Updates)
  // ==========================================
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live MRR fluctuations
      setMrr(prev => prev + Math.floor(Math.random() * 200 - 80));
      // Simulate active user log-ins/outs
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10 - 5));
      // Simulate slight health fluctuations
      setSystemHealth(prev => Math.min(100, Math.max(99.9, prev + (Math.random() * 0.04 - 0.02))));
      
      // Simulate Crypto market ticks
      setCoins(prevCoins => 
        prevCoins.map(coin => {
          const tickPercent = (Math.random() * 0.4 - 0.2) / 100;
          const newPrice = coin.price * (1 + tickPercent);
          const newChange = coin.change24h + (Math.random() * 0.1 - 0.05);
          return {
            ...coin,
            price: parseFloat(newPrice.toFixed(2)),
            change24h: parseFloat(newChange.toFixed(2))
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update selected coin data when coins change
  useEffect(() => {
    const updated = coins.find(c => c.id === selectedCoin.id);
    if (updated) setSelectedCoin(updated);
  }, [coins]);

  // ==========================================
  // HANDLERS
  // ==========================================
  
  // Kanban Handlers
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      status: 'todo',
      priority: newTaskPriority
    };
    setTasks([...tasks, task]);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const moveTask = (id: string, nextStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Crypto Handlers
  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(tradeAmount);
    if (isNaN(amount) || amount <= 0) return;

    setCoins(coins.map(c => {
      if (c.id === selectedCoin.id) {
        const holdingDiff = tradeType === 'buy' ? amount / c.price : -amount;
        return {
          ...c,
          holding: Math.max(0, c.holding + holdingDiff)
        };
      }
      return c;
    }));
    setTradeAmount('');
  };

  // AI Chat Handlers
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        sender: 'ai',
        text: `[Simulated Model with Temp ${aiTemperature}]: I received your prompt regarding "${inputText.substring(0, 30)}...". Let's optimize this code using clean patterns.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-indigo-100 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none gradient-text">Glovix Nexus</h1>
              <span className="text-xs text-slate-500 font-medium">Command Center v1.0</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 border border-transparent'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              SaaS Analytics
            </button>
            <button 
              onClick={() => setActiveTab('kanban')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'kanban' 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 border border-transparent'
              }`}
            >
              <Trello className="h-4 w-4" />
              Kanban Board
            </button>
            <button 
              onClick={() => setActiveTab('crypto')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'crypto' 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 border border-transparent'
              }`}
            >
              <Coins className="h-4 w-4" />
              Crypto Terminal
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ai' 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 border border-transparent'
              }`}
            >
              <Terminal className="h-4 w-4" />
              AI Playground
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>SANDBOX HEALTH</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              ONLINE
            </span>
          </div>
          <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
            <span className="font-mono">Node.js v20.10.0</span>
            <Activity className="h-3.5 w-3.5 text-indigo-500" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        
        {/* HEADER */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/40 backdrop-blur">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-lg capitalize">{activeTab} Workspace</h2>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
              Live Sync Active
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search command..." 
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-lg border border-slate-700 transition">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* WORKSPACE PAGES */}
        <div className="flex-1 overflow-y-auto p-8">

          {/* ==========================================
              TAB 1: SAAS ANALYTICS DASHBOARD
              ========================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-500/5 rounded-full blur-xl"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-slate-400 text-sm font-medium">Monthly Recurring Revenue</span>
                    <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><DollarSign className="h-4 w-4" /></span>
                  </div>
                  <h3 className="text-3xl font-bold font-mono text-slate-50">${mrr.toLocaleString()}</h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    +14.2% from last month
                  </p>
                </div>

                <div className="glass-panel p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 rounded-full blur-xl"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-slate-400 text-sm font-medium">Active Users (Live)</span>
                    <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Users className="h-4 w-4" /></span>
                  </div>
                  <h3 className="text-3xl font-bold font-mono text-slate-50">{activeUsers.toLocaleString()}</h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Live simulated session feed
                  </p>
                </div>

                <div className="glass-panel p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-violet-500/5 rounded-full blur-xl"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-slate-400 text-sm font-medium">System Uptime</span>
                    <span className="p-2 bg-violet-500/10 text-violet-400 rounded-lg"><Activity className="h-4 w-4" /></span>
                  </div>
                  <h3 className="text-3xl font-bold font-mono text-slate-50">{systemHealth.toFixed(3)}%</h3>
                  <p className="text-xs text-violet-400 flex items-center gap-1 mt-2">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    All nodes fully operational
                  </p>
                </div>
              </div>

              {/* Chart & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-panel p-6 lg:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="font-semibold text-slate-200">Revenue Growth Chart</h4>
                      <p className="text-xs text-slate-500">Sales performance over the last 12 months</p>
                    </div>
                    <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-slate-300 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-indigo-400" />
                      Live Feed
                    </span>
                  </div>
                  
                  {/* Custom Simulated Bar Chart */}
                  <div className="h-64 flex items-end justify-between gap-2 pt-6">
                    {salesHistory.map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full relative bg-indigo-950 rounded-t-md border border-indigo-900/30 overflow-hidden" style={{ height: `${(val / 150) * 100}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/80 to-violet-500/80 group-hover:from-indigo-500 group-hover:to-violet-400 transition-all"></div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">M{idx+1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Alerts */}
                <div className="glass-panel p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-4">Operations Log</h4>
                    <div className="space-y-4">
                      <div className="flex gap-3 items-start text-sm">
                        <div className="p-1 bg-emerald-500/10 text-emerald-400 rounded mt-0.5"><CheckCircle2 className="h-3.5 w-3.5" /></div>
                        <div>
                          <p className="text-slate-300 font-medium">Backup completed successfully</p>
                          <span className="text-xs text-slate-500">2 minutes ago</span>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start text-sm">
                        <div className="p-1 bg-amber-500/10 text-amber-400 rounded mt-0.5"><AlertCircle className="h-3.5 w-3.5" /></div>
                        <div>
                          <p className="text-slate-300 font-medium">Database CPU load spike (82%)</p>
                          <span className="text-xs text-slate-500">14 minutes ago</span>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start text-sm">
                        <div className="p-1 bg-indigo-500/10 text-indigo-400 rounded mt-0.5"><Sparkles className="h-3.5 w-3.5" /></div>
                        <div>
                          <p className="text-slate-300 font-medium">New customer signed up (Enterprise)</p>
                          <span className="text-xs text-slate-500">1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition mt-6">
                    View Full Audit Trail
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 2: KANBAN TASK MANAGER
              ========================================== */}
          {activeTab === 'kanban' && (
            <div className="space-y-8">
              {/* Add Task Form */}
              <form onSubmit={handleAddTask} className="glass-panel p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5">TASK TITLE</label>
                  <input 
                    type="text" 
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    placeholder="e.g., Implement dark mode" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5">DESCRIPTION</label>
                  <input 
                    type="text" 
                    value={newTaskDesc}
                    onChange={e => setNewTaskDesc(e.target.value)}
                    placeholder="Short summary of task" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-slate-400 font-semibold mb-1.5">PRIORITY</label>
                    <select 
                      value={newTaskPriority}
                      onChange={e => setNewTaskPriority(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition flex items-center gap-1.5 h-[38px]">
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
              </form>

              {/* Kanban Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {(['backlog', 'todo', 'progress', 'done'] as const).map(column => {
                  const columnTasks = tasks.filter(t => t.status === column);
                  return (
                    <div key={column} className="glass-panel p-4 bg-slate-900/20 flex flex-col min-h-[450px]">
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                        <h4 className="font-semibold text-slate-300 text-sm uppercase tracking-wider">{column}</h4>
                        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-mono font-bold">
                          {columnTasks.length}
                        </span>
                      </div>

                      <div className="flex-1 space-y-3">
                        {columnTasks.map(task => (
                          <div key={task.id} className="p-4 bg-slate-900 border border-slate-800/80 rounded-lg hover:border-slate-700 transition shadow-md group">
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                                task.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                                'bg-blue-500/10 text-blue-400'
                              }`}>
                                {task.priority}
                              </span>
                              <button onClick={() => deleteTask(task.id)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <h5 className="font-semibold text-slate-200 text-sm mb-1">{task.title}</h5>
                            <p className="text-xs text-slate-400 mb-4">{task.description}</p>
                            
                            {/* Navigation Buttons for Demo */}
                            <div className="flex gap-1 justify-end border-t border-slate-800/60 pt-2.5">
                              {column !== 'backlog' && (
                                <button 
                                  onClick={() => {
                                    const prevs: Record<string, Task['status']> = { todo: 'backlog', progress: 'todo', done: 'progress' };
                                    moveTask(task.id, prevs[column]);
                                  }}
                                  className="text-[10px] text-slate-500 hover:text-slate-300 px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded"
                                >
                                  ◀ Back
                                </button>
                              )}
                              {column !== 'done' && (
                                <button 
                                  onClick={() => {
                                    const nexts: Record<string, Task['status']> = { backlog: 'todo', todo: 'progress', progress: 'done' };
                                    moveTask(task.id, nexts[column]);
                                  }}
                                  className="text-[10px] text-indigo-400 hover:text-indigo-300 px-1.5 py-0.5 bg-indigo-950/20 border border-indigo-900/40 rounded"
                                >
                                  Next ▶
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        {columnTasks.length === 0 && (
                          <div className="h-32 border-2 border-dashed border-slate-800/40 rounded-xl flex items-center justify-center text-xs text-slate-600">
                            No tasks
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 3: CRYPTO TERMINAL
              ========================================== */}
          {activeTab === 'crypto' && (
            <div className="space-y-8">
              {/* Live Market Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coins.map(coin => (
                  <div 
                    key={coin.id} 
                    onClick={() => setSelectedCoin(coin)}
                    className={`glass-panel p-5 cursor-pointer transition ${
                      selectedCoin.id === coin.id 
                        ? 'border-indigo-500 bg-indigo-950/10' 
                        : 'hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">{coin.name}</span>
                        <span className="text-xs text-slate-500 font-mono">{coin.symbol}</span>
                      </div>
                      <span className={`text-xs font-semibold flex items-center font-mono ${
                        coin.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {coin.change24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                      </span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-slate-100">${coin.price.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 mt-2 flex justify-between font-mono">
                      <span>Holding: {coin.holding} {coin.symbol}</span>
                      <span>Value: ${(coin.holding * coin.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trade Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trade Widget */}
                <div className="glass-panel p-6">
                  <h4 className="font-semibold text-slate-200 mb-4">Execute Trade ({selectedCoin.symbol})</h4>
                  <div className="flex gap-2 mb-4 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button 
                      onClick={() => setTradeType('buy')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                        tradeType === 'buy' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-100'
                      }`}
                    >
                      BUY
                    </button>
                    <button 
                      onClick={() => setTradeType('sell')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                        tradeType === 'sell' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-slate-100'
                      }`}
                    >
                      SELL
                    </button>
                  </div>

                  <form onSubmit={handleExecuteTrade} className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-400 font-semibold mb-1.5">INVESTMENT AMOUNT (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-500 font-mono text-sm">$</span>
                        <input 
                          type="number" 
                          value={tradeAmount}
                          onChange={e => setTradeAmount(e.target.value)}
                          placeholder="0.00" 
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-4 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs space-y-2 font-mono">
                      <div className="flex justify-between text-slate-500">
                        <span>Price per unit:</span>
                        <span>${selectedCoin.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Est. received:</span>
                        <span className="text-slate-300">
                          {tradeAmount && !isNaN(parseFloat(tradeAmount)) 
                            ? (parseFloat(tradeAmount) / selectedCoin.price).toFixed(6) 
                            : '0.00'
                          } {selectedCoin.symbol}
                        </span>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className={`w-full py-2.5 rounded-lg text-sm font-semibold transition shadow-lg ${
                        tradeType === 'buy' 
                          ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/10' 
                          : 'bg-red-600 hover:bg-red-500 shadow-red-500/10'
                      }`}
                    >
                      Confirm simulated {tradeType}
                    </button>
                  </form>
                </div>

                {/* Live Ticker Terminal */}
                <div className="glass-panel p-6 lg:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-slate-200">Terminal Output</h4>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                        <RefreshCw className="h-3 w-3 animate-spin" /> Live Ticker
                      </div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-indigo-400 space-y-1.5 h-64 overflow-y-auto">
                      <p className="text-slate-500">[12:00:01] Glovix Terminal Initialized...</p>
                      <p className="text-slate-500">[12:00:02] Connecting to crypto ticker websocket...</p>
                      <p className="text-emerald-500">[SUCCESS] Connected to live ticker stream.</p>
                      <p className="text-slate-300">SOL updated: $142.80 (+8.14%)</p>
                      <p className="text-slate-300">BTC price tick: $64,250.25 (+3.45%)</p>
                      <p className="text-slate-300">ETH price tick: $3,450.12 (-1.22%)</p>
                      <p className="text-indigo-300">[TRADE] Simulated buy order placed for 0.1 BTC</p>
                      <p className="text-emerald-400">[TRADE] Order executed successfully.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 4: AI PROMPT PLAYGROUND
              ========================================== */}
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Parameters Panel */}
              <div className="glass-panel p-6 space-y-6">
                <h4 className="font-semibold text-slate-200 border-b border-slate-800 pb-3">AI Settings</h4>
                
                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-2">PROMPT TEMPLATE</label>
                  <select 
                    value={selectedPromptTemplate}
                    onChange={e => setSelectedPromptTemplate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Code Refactoring">Code Refactoring</option>
                    <option value="SQL Schema Builder">SQL Schema Builder</option>
                    <option value="Tailwind Prototyping">Tailwind Prototyping</option>
                    <option value="API Mock Generator">API Mock Generator</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-2">
                    <span>TEMPERATURE</span>
                    <span className="font-mono text-indigo-400">{aiTemperature}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={aiTemperature}
                    onChange={e => setAiTemperature(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Model:</span>
                    <span className="font-mono text-slate-300">glovix-llama-3-70b</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Max tokens:</span>
                    <span className="font-mono text-slate-300">4,096</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>API latency:</span>
                    <span className="font-mono text-emerald-400">124ms</span>
                  </div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="glass-panel lg:col-span-2 flex flex-col justify-between h-[500px]">
                {/* Chat History */}
                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'
                      }`}>
                        {msg.sender === 'user' ? 'U' : 'AI'}
                      </div>
                      <div className={`p-4 rounded-lg text-sm leading-relaxed ${
                        msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-850'
                      }`}>
                        <p>{msg.text}</p>
                        <span className="text-[10px] text-slate-400 block mt-1.5 text-right font-mono">{msg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 flex gap-3 bg-slate-900/20">
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="Type a prompt template instructions..." 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button type="submit" className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition flex items-center justify-center">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}