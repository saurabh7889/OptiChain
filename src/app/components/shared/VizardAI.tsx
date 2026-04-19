import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, X, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user';
}

function generateResponse(userText: string): string {
  const input = userText.toLowerCase().trim();

  if (input.match(/fleet|vehicle|truck|driver|fuel|mileage/)) {
    const r = [
      "Based on fleet telemetry, I recommend scheduling preventive maintenance for vehicles exceeding 50,000 km. This reduces unplanned downtime by up to 35%.\n\n• Monitor fuel efficiency weekly\n• Rotate drivers on long-haul routes\n• Flag vehicles below 70% health immediately",
      "Vehicles idling for more than 48 hours should be reassigned or scheduled for maintenance. This maximizes asset utilization.\n\n• Target: 85%+ utilization rate\n• Consider pooling idle vehicles across depots",
      "To reduce fuel costs by 12-18%, consider:\n\n• Route consolidation for nearby deliveries\n• Speed limiters at optimal efficiency (85 km/h)\n• Regular tire pressure monitoring (saves ~3% fuel)",
    ];
    return r[Math.floor(Math.random() * r.length)];
  }

  if (input.match(/route|delivery|shipping|transit|delay|optimize|path/)) {
    const r = [
      "Route optimization analysis:\n\n• Consolidate overlapping delivery zones — 22% distance reduction potential\n• Avoid peak traffic corridors between 7-9 AM and 4-7 PM\n• Use multi-stop routing for orders within 15 km radius",
      "To reduce delivery delays:\n\n1. Pre-stage inventory at regional hubs\n2. Use dynamic routing with real-time traffic\n3. Set 15-20% buffer on delivery windows\n\nTypical improvement: 8-12% on-time rate increase.",
    ];
    return r[Math.floor(Math.random() * r.length)];
  }

  if (input.match(/inventory|stock|warehouse|supply|restock|shortage/)) {
    const r = [
      "Inventory recommendations:\n\n• Set reorder points at 2x average weekly demand\n• Fast-moving SKUs: maintain 14-day safety stock\n• Slow-moving items: reduce to 7-day buffer\n\nThis balances availability with carrying costs.",
      "To prevent stockouts:\n\n1. ABC analysis — focus on top 20% revenue items\n2. Forecast using 90-day rolling averages\n3. Auto-alert at 30% stock threshold\n\nExpected: 94%+ fill rate.",
    ];
    return r[Math.floor(Math.random() * r.length)];
  }

  if (input.match(/cost|budget|expense|save|money|profit|revenue|analytics/)) {
    const r = [
      "Cost reduction opportunities:\n\n• Fuel optimization: ~$3,200/month savings\n• Route consolidation: ~$1,800/month\n• Preventive maintenance: ~$950/month\n\nEstimated annual savings: $71,400",
      "Top cost drivers:\n\n1. Fuel — 38% of logistics spend\n2. Labor — 29%\n3. Maintenance — 18%\n4. Warehousing — 15%\n\nFocus on fuel and routing for highest ROI.",
    ];
    return r[Math.floor(Math.random() * r.length)];
  }

  if (input.match(/order|customer|tracking|pending/)) {
    return "Order management tips:\n\n• Auto-assign priority by customer tier and value\n• Batch similar-destination orders for consolidated shipping\n• Set SLA alerts at 80% of delivery window\n\nThis improves satisfaction scores by ~15%.";
  }

  if (input.match(/^(hi|hello|hey|good morning|good evening|sup|yo)/)) {
    return "Hello! I can help with fleet management, route optimization, inventory forecasting, and cost analysis. What would you like to explore?";
  }

  if (input.match(/help|what can you|capabilities/)) {
    return "I can assist with:\n\n🚛 Fleet — health, maintenance, fuel\n📦 Orders — processing, tracking, priority\n🗺️ Routes — optimization, delays\n📊 Analytics — costs, performance\n🏭 Inventory — stock, reorder points\n\nJust ask me anything!";
  }

  if (input.match(/thank|thanks/)) {
    return "You're welcome! I'm here whenever you need supply chain insights.";
  }

  const d = [
    `I've analyzed your query. Key recommendations:\n\n• Review active routes for consolidation\n• Monitor vehicles approaching maintenance thresholds\n• Adjust safety stock for current demand patterns\n\nWant me to dive deeper into any area?`,
    `Your supply chain efficiency can improve by:\n\n1. Reducing idle time — reassign underutilized assets\n2. Optimizing routes — consolidate overlapping zones\n3. Forecasting demand — use historical patterns\n\nWhich area interests you most?`,
  ];
  return d[Math.floor(Math.random() * d.length)];
}

export function VizardAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Vizard AI. I can help with fleet analysis, route optimization, inventory forecasts, and more. Ask me anything!",
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userText = input;
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setInput('');
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
    setIsTyping(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, text: generateResponse(userText), sender: 'ai' }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          open
            ? 'bg-gray-700 hover:bg-gray-800 rotate-0'
            : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
        }`}
      >
        <div className={`transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}>
          {open ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        </div>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Chat Panel */}
      <div className={`fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] transition-all duration-300 origin-bottom-right ${
        open ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-75 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl flex flex-col h-[520px] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-gray-900">Vizard AI</h2>
              <p className="text-[11px] text-gray-400">Supply Chain Assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                )}
                <div className={`px-3 py-2.5 rounded-2xl text-[13px] leading-relaxed max-w-[80%] whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-white text-gray-700 border border-gray-200 rounded-bl-md shadow-xs'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-gray-200 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Vizard AI..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
