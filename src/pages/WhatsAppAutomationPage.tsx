import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Bot,
  Check,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Clock,
  Building2,
  PhoneCall,
  Zap,
  Cpu,
  Send,
  UserCheck,
  Activity,
  Layers,
  Sparkles,
  Play,
  RotateCcw
} from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { ProofBlock } from '@/components/ProofBlock';
import { NotForBlock } from '@/components/NotForBlock';
import { FAQ } from '@/components/FAQ';

interface WhatsAppAutomationPageProps {
  onOpenQuote?: (service?: string) => void;
}

interface ChatStep {
  sender: 'user' | 'bot' | 'system';
  text: string;
  subtext?: string;
  time: string;
  buttons?: string[];
  isTag?: boolean;
}

const DEMO_SCENARIOS = [
  {
    id: 'real-estate',
    name: 'Real Estate Lead (10:45 PM)',
    badge: 'Property Funnel',
    steps: [
      { sender: 'user', text: 'Hi, I saw your ad on Instagram. Is the 1,200 sq.ft villa plot in Villupuram still available? [src:insta-ad-plots]', time: '10:45 PM' },
      { sender: 'system', text: '⚡ Webhook verified: Meta Cloud API · Processing Latency: 320ms · Intent: PROPERTY_INQUIRY', isTag: true, time: '10:45 PM' },
      { sender: 'bot', text: 'Vanakkam! Yes, 4 corner plots are currently available in Phase 2 with DTCP approval. Would you like me to share the verified layout PDF or schedule a site visit this Saturday?', buttons: ['📄 Download Layout PDF', '📅 Book Site Visit', '🗣️ Speak with Builder'], time: '10:45 PM' },
      { sender: 'user', text: 'Please send the layout PDF and price per sq.ft.', time: '10:46 PM' },
      { sender: 'bot', text: 'Here is the approved blueprint & cost calculator: 📑 [Villupuram-Phase2-Brochure.pdf] Price is fixed at ₹1,450/sq.ft. A dedicated manager will call tomorrow at 10 AM to confirm. Have a good night!', time: '10:46 PM' }
    ] as ChatStep[]
  },
  {
    id: 'ecommerce',
    name: 'Retail & D2C Store (Sunday 2:00 PM)',
    badge: 'Order Qualification',
    steps: [
      { sender: 'user', text: 'Do you deliver organic cold-pressed oil to Chennai? How to order? [src:web-header]', time: '2:01 PM' },
      { sender: 'system', text: '⚡ Webhook verified: Web Inbound · Latency: 210ms · Intent: SHIPPING_AND_CATALOG', isTag: true, time: '2:01 PM' },
      { sender: 'bot', text: 'Hello! Yes, we deliver across Chennai & all over Tamil Nadu within 24-48 hours. Express shipping is free on orders above ₹499.', buttons: ['🛒 View WhatsApp Catalog', '💳 Instant UPI Payment', '📦 Track Existing Order'], time: '2:01 PM' },
      { sender: 'user', text: 'Show catalog for groundnut and sesame oil', time: '2:02 PM' },
      { sender: 'bot', text: 'Opening live catalog: 🌿 Pure Marachekku Oil (1L / 2L / 5L cans). Tap below to add directly to your cart with zero transaction fees!', time: '2:02 PM' }
    ] as ChatStep[]
  },
  {
    id: 'consulting',
    name: 'B2B Client Handover (3:15 AM)',
    badge: 'Human Escalation',
    steps: [
      { sender: 'user', text: 'We need an enterprise CRM with custom GST invoice generation for 12 branch offices. What is the quote?', time: '3:15 AM' },
      { sender: 'system', text: '⚡ High-Value Enterprise Query Detected · Triggering Human Handover Protocol', isTag: true, time: '3:15 AM' },
      { sender: 'bot', text: 'Thank you for reaching out! For custom multi-branch architectures, we do not quote generic estimates. I have tagged our founder, Kamar. Would you prefer a Google Meet discovery call or an in-person briefing in Puducherry?', buttons: ['📅 Schedule Google Meet', '🏢 Office Visit (Kosapalayam)'], time: '3:15 AM' },
      { sender: 'user', text: 'Google Meet on Tuesday 3 PM works best.', time: '3:16 AM' },
      { sender: 'bot', text: 'Confirmed! Calendar invitation dispatched to your WhatsApp. Our senior tech lead will be prepared with sample architecture blueprints. 🚀', time: '3:16 AM' }
    ] as ChatStep[]
  }
];

export function WhatsAppAutomationPage({ onOpenQuote }: WhatsAppAutomationPageProps) {
  // GSAP Animation Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const flowNodesRef = useRef<HTMLDivElement>(null);
  const pulseLinesRef = useRef<SVGSVGElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  // Demo simulator state
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [displayedSteps, setDisplayedSteps] = useState<number>(1);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  // SEO Metadata & Schema Injection
  useEffect(() => {

    const schemaId = 'wa-auto-schema';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://bmtechx.in/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://bmtechx.in/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'WhatsApp Automation',
              item: 'https://bmtechx.in/services/whatsapp-automation/',
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'WhatsApp Automation for Business',
          serviceType: 'Business Workflow Automation & CRM',
          description:
            'A WhatsApp assistant that answers every enquiry in minutes and follows up until they reply. Built on the same system we run our own agency on.',
          provider: {
            '@type': 'Organization',
            name: 'BM TechX',
            url: 'https://bmtechx.in',
          },
          areaServed: [
            { '@type': 'City', name: 'Puducherry' },
            { '@type': 'City', name: 'Cuddalore' },
            { '@type': 'City', name: 'Villupuram' },
            { '@type': 'City', name: 'Chennai' },
            { '@type': 'State', name: 'Tamil Nadu' },
          ],
        },
      ],
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  // GSAP Entrance & Tech Glow Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          y: -20,
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
        });
      }

      if (titleRef.current) {
        tl.from(
          titleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.3'
        );
      }

      // 2. Continuous Pulse on Circuit Line
      if (pulseLinesRef.current) {
        const packets = pulseLinesRef.current.querySelectorAll('.data-packet');
        packets.forEach((packet, i) => {
          gsap.to(packet, {
            cx: '90%',
            duration: 2.2 + i * 0.4,
            repeat: -1,
            ease: 'power1.inOut',
            delay: i * 0.7,
          });
        });
      }

      // 3. Staggered Entrance for Pipeline Nodes
      if (flowNodesRef.current) {
        const nodes = flowNodesRef.current.children;
        gsap.from(nodes, {
          scale: 0.85,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: flowNodesRef.current,
            start: 'top 85%',
          },
        });
      }

      // 4. Metrics Number Counter Tweening
      if (metricsRef.current) {
        const counterEls = metricsRef.current.querySelectorAll('.counter-val');
        counterEls.forEach((el) => {
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const isDecimal = target % 1 !== 0;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
            onUpdate: () => {
              el.textContent = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val).toString();
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Simulator step progression with GSAP message bubble pop-in
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentScenario = DEMO_SCENARIOS[activeScenarioIdx];

    if (autoPlay && displayedSteps < currentScenario.steps.length) {
      setIsTyping(true);
      timer = setTimeout(() => {
        setIsTyping(false);
        setDisplayedSteps((prev) => prev + 1);
      }, 1400);
    }

    return () => clearTimeout(timer);
  }, [displayedSteps, activeScenarioIdx, autoPlay]);

  // Animate newly added chat bubbles with GSAP
  useEffect(() => {
    if (chatMessagesRef.current) {
      const messages = chatMessagesRef.current.querySelectorAll('.chat-bubble-item');
      if (messages.length > 0) {
        const lastMsg = messages[messages.length - 1];
        gsap.fromTo(
          lastMsg,
          { opacity: 0, y: 15, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.7)' }
        );
      }
    }
  }, [displayedSteps]);

  const handleScenarioChange = (idx: number) => {
    setActiveScenarioIdx(idx);
    setDisplayedSteps(1);
    setIsTyping(false);
  };

  const resetSimulation = () => {
    setDisplayedSteps(1);
    setIsTyping(false);
    setAutoPlay(true);
  };

  const waFaqs = [
    {
      q: 'Is this the official WhatsApp Business API?',
      a: 'Yes — a 100% verified Meta WhatsApp Business Account with green checkmark eligibility, not an unofficial scraping tool that risks your phone number getting permanently banned.',
    },
    {
      q: 'Will my customers know it is an automated assistant?',
      a: 'Not at first, usually — the replies are written in natural, conversational language. However, if asked directly, it identifies itself honestly as an assistant. People find out anyway, and getting caught pretending to be human destroys trust faster than honesty.',
    },
    {
      q: 'Can the assistant speak Tamil?',
      a: 'Yes, full bilingual support in both Tamil and English. It automatically mirrors whichever language the customer writes in.',
    },
    {
      q: 'What if it gives a wrong answer to a customer?',
      a: 'It only answers from the specific knowledge base you have approved, and it immediately hands over to a human team member when it is unsure. We would much rather it say “Let me check with the team” than guess. Reviewing those edge-case handovers each week is how the system improves.',
    },
    {
      q: 'Does it work with my existing business phone number?',
      a: 'Usually yes, through standard Meta API migration. We will check your number’s status on the scope call — some numbers cannot be moved easily and it is essential to know before building around it.',
    },
    {
      q: 'How much does WhatsApp automation cost?',
      a: 'Pricing depends on your monthly conversation volume and how deep the workflows connect into your CRM or Google Sheets. We provide an exact written quote after a 20-minute scope call. There is no generic list price because there is no one-size-fits-all build.',
    },
  ];

  const notForItems = [
    'If your business receives fewer than 20 inquiries a month — answer them yourself on your phone. Automation costs more than it saves at that low volume.',
    'If nobody on your team will maintain the answers — the system needs your current pricing, hours, and inventory kept accurate. A neglected assistant giving wrong answers confidently is worse than no assistant at all.',
    'If your sales process is 100% personal relationship-based — high-value bespoke B2B enterprise deals should not begin with an automated assistant.',
  ];

  const lifecycleStages = [
    {
      stage: 'Enquiry Arrives',
      action: 'From your website, Meta ads, Instagram, or direct message — instantly logged with source tracking tag.',
      handler: 'Assistant',
    },
    {
      stage: 'First Reply',
      action: 'Within minutes, any hour of the day or night, keeping the buyer warm while intent is highest.',
      handler: 'Assistant',
    },
    {
      stage: 'Common Questions',
      action: 'Pricing, service scope, office location, and timing answered strictly from verified company facts.',
      handler: 'Assistant',
    },
    {
      stage: 'Buyer Qualification',
      action: 'Asks what they need, target city, and budget range naturally. Never asks the same question twice.',
      handler: 'Assistant',
    },
    {
      stage: 'Appointment Booking',
      action: 'Offers real available calendar slots, confirms the appointment, and sends automated WhatsApp reminders.',
      handler: 'Assistant',
    },
    {
      stage: 'Serious Inquiries & Deals',
      action: 'High-intent buyers, custom scopes, negotiations, or client complaints are handed over instantly.',
      handler: 'Human (Your Team)',
      highlight: true,
    },
    {
      stage: 'Leads Who Went Quiet',
      action: 'Sends gentle, spaced check-ins over 24h and 48h until the prospect replies or asks to stop.',
      handler: 'Assistant',
    },
  ];

  const trustRules = [
    {
      rule: 'It Won’t Invent a Price',
      desc: 'It only quotes what is published on your agreed rate card. Anything custom or unlisted is routed immediately to your team.',
    },
    {
      rule: 'It Won’t Negotiate or Give Discounts',
      desc: 'All commercial negotiations and discount requests reach a real human decision-maker.',
    },
    {
      rule: 'It Won’t Argue With Unhappy Customers',
      desc: 'Any frustration or complaint triggers an immediate emergency handover to a human manager.',
    },
    {
      rule: 'It Won’t Promise Custom Delivery Dates',
      desc: 'Deadlines for bespoke project work require human scheduling and are never guessed by the bot.',
    },
    {
      rule: 'It Won’t Pretend to Be Human',
      desc: 'When asked directly, it politely confirms it is a digital assistant. Transparency builds credibility.',
    },
    {
      rule: 'It Won’t Message Forever',
      desc: 'Follow-ups are capped at 2–3 touchpoints. If a prospect stays quiet, it stops cleanly rather than spamming.',
    },
  ];

  const currentScenario = DEMO_SCENARIOS[activeScenarioIdx];

  return (
    <div className="space-y-16 sm:space-y-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* ========================================================= */}
      {/* BREADCRUMB                                                */}
      {/* ========================================================= */}
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-muted">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-bm-navy transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link to="/services/" className="hover:text-bm-navy transition-colors">
              Services
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-semibold text-bm-navy-deep">WhatsApp Automation</span>
          </li>
        </ol>
      </nav>

      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST + TECH RADAR BADGE            */}
      {/* ========================================================= */}
      <section ref={heroRef} className="text-center max-w-4xl mx-auto space-y-6">
        <div 
          ref={badgeRef} 
          className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-lg backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>META CLOUD API v21.0 · SYSTEM RUNTIME: 99.98% · SUB-MINUTE DISPATCH</span>
        </div>

        <h1 
          ref={titleRef} 
          className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight leading-tight"
        >
          WhatsApp automation that answers <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-bm-navy">while you sleep</span>
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white/90 backdrop-blur-md border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          We build WhatsApp assistants that reply to every inquiry within minutes, answer the questions you get asked fifty times a week, book appointments, and keep following up with people who went quiet — then hand over to a human the moment the conversation needs one. Pricing depends on your conversation volume and workflow complexity, quoted after a short discovery scope call.
        </p>

        {/* Real-Time Tech Metrics Strip */}
        <div ref={metricsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
          <div className="bg-white p-3.5 rounded-2xl border border-bm-line shadow-sm text-center">
            <p className="text-2xl font-black text-emerald-600 font-mono">
              <span className="counter-val" data-target="0.8">0</span>s
            </p>
            <p className="text-[11px] font-bold text-bm-ink-faint uppercase">Avg Webhook Latency</p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-bm-line shadow-sm text-center">
            <p className="text-2xl font-black text-bm-navy-deep font-mono">
              <span className="counter-val" data-target="100">0</span>%
            </p>
            <p className="text-[11px] font-bold text-bm-ink-faint uppercase">Official API Security</p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-bm-line shadow-sm text-center">
            <p className="text-2xl font-black text-bm-terracotta font-mono">
              <span className="counter-val" data-target="24">0</span>/7
            </p>
            <p className="text-[11px] font-bold text-bm-ink-faint uppercase">Night Lead Capture</p>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-bm-line shadow-sm text-center">
            <p className="text-2xl font-black text-purple-700 font-mono">
              <span className="counter-val" data-target="0">0</span>₹
            </p>
            <p className="text-[11px] font-bold text-bm-ink-faint uppercase">Platform Markup</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <WhatsAppCTA
            src="wa-auto-hero"
            intent="Hi BM TechX — I want to book a 20-minute scope call for WhatsApp automation."
            label="Book a 20-Minute Scope Call"
            variant="primary"
            className="text-sm sm:text-base py-3.5 px-6 shadow-md"
          />
          <Link
            to="/pricing/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white border border-bm-line hover:border-bm-brand px-5 py-3.5 rounded-xl text-bm-navy transition-colors shadow-sm"
          >
            <span>Review Full Pricing Norms</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* GSAP TECH FEATURE 1: LIVE INTERACTIVE BOT SIMULATOR       */}
      {/* ========================================================= */}
      <section ref={terminalRef} className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Live Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy-deep font-display">
              See the Assistant in Action: Choose a Scenario
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetSimulation}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-bm-navy bg-white border border-bm-line hover:bg-bm-wash-cool px-3 py-1.5 rounded-lg transition-colors"
              title="Replay Conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay
            </button>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                autoPlay ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Play className="w-3.5 h-3.5" /> {autoPlay ? 'Auto-Advancing' : 'Paused'}
            </button>
          </div>
        </div>

        {/* Scenario Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEMO_SCENARIOS.map((scen, idx) => (
            <button
              key={scen.id}
              onClick={() => handleScenarioChange(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                activeScenarioIdx === idx
                  ? 'bg-bm-navy text-white border-bm-navy shadow-md ring-2 ring-emerald-400/40'
                  : 'bg-white text-bm-ink border-bm-line hover:border-bm-navy/40'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className={`px-2 py-0.5 rounded-md font-mono ${activeScenarioIdx === idx ? 'bg-white/20 text-emerald-300' : 'bg-bm-wash-cool text-bm-navy font-bold'}`}>
                  {scen.badge}
                </span>
                <span className={activeScenarioIdx === idx ? 'text-white/60' : 'text-bm-ink-faint'}>Scenario {idx + 1}</span>
              </div>
              <p className="font-bold text-xs sm:text-sm">{scen.name}</p>
            </button>
          ))}
        </div>

        {/* Simulated Phone Terminal Frame */}
        <div className="bg-[#0b141a] rounded-3xl border-4 border-gray-800 shadow-2xl overflow-hidden text-gray-100 font-sans">
          {/* WhatsApp Header Bar */}
          <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#202c33]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-gray-100">BM TechX Smart Assistant</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Official WhatsApp Business Account · Sub-minute online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded">
                Meta API v21.0
              </span>
            </div>
          </div>

          {/* Chat Messages Body with WhatsApp Wallpaper Texture */}
          <div 
            ref={chatMessagesRef}
            className="p-4 sm:p-6 space-y-4 min-h-[360px] max-h-[460px] overflow-y-auto bg-[#0b141a] bg-opacity-95"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, #111b21 0%, #0b141a 100%)'
            }}
          >
            {currentScenario.steps.slice(0, displayedSteps).map((step, idx) => {
              if (step.isTag) {
                return (
                  <div key={idx} className="chat-bubble-item flex justify-center my-2">
                    <span className="bg-[#182229] border border-emerald-500/30 text-emerald-400 text-[11px] font-mono px-3 py-1 rounded-full shadow-sm">
                      {step.text}
                    </span>
                  </div>
                );
              }

              const isUser = step.sender === 'user';
              return (
                <div
                  key={idx}
                  className={`chat-bubble-item flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl shadow-md text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#005c4b] text-gray-100 rounded-tr-none'
                        : 'bg-[#202c33] text-gray-100 rounded-tl-none border border-gray-700/60'
                    }`}
                  >
                    <p className="whitespace-pre-line">{step.text}</p>

                    {/* Interactive Action Chips / Quick Reply Buttons */}
                    {step.buttons && (
                      <div className="mt-2.5 pt-2 border-t border-gray-700/60 flex flex-wrap gap-1.5">
                        {step.buttons.map((btn, bIdx) => (
                          <span
                            key={bIdx}
                            className="bg-[#2a3942] hover:bg-[#32444f] text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-emerald-500/30 cursor-default transition-colors flex items-center gap-1"
                          >
                            {btn}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-400">
                      <span>{step.time}</span>
                      {isUser && <span className="text-emerald-400 font-bold">✓✓</span>}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="chat-bubble-item flex justify-start">
                <div className="bg-[#202c33] px-4 py-2.5 rounded-2xl rounded-tl-none border border-gray-700 flex items-center gap-1.5 text-emerald-400 text-xs">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] text-gray-400 ml-1">Assistant typing answer...</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input Bar */}
          <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-t border-gray-700">
            <div className="flex-1 bg-[#2a3942] text-gray-400 text-xs px-4 py-2.5 rounded-xl border border-gray-600 flex items-center justify-between">
              <span>Message encrypted via official Meta Cloud API</span>
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            </div>
            <button 
              onClick={() => {
                if (displayedSteps < currentScenario.steps.length) {
                  setDisplayedSteps(prev => prev + 1);
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-colors shadow-md"
              title="Next Step"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* GSAP TECH FEATURE 2: ANIMATED CIRCUIT ARCHITECTURE FLOW   */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white rounded-3xl p-8 sm:p-12 space-y-10 border border-bm-brand-soft/20 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-bm-orange/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono font-bold border border-emerald-500/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>ARCHITECTURE SPECIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            How Inbound Leads Flow Through the Meta Engine
          </h2>
          <p className="text-sm sm:text-base text-bm-brand-soft leading-relaxed">
            From the initial click on your Instagram ad or website CTA to automated qualification and human sales closing:
          </p>
        </div>

        {/* Dynamic SVG Data Bus Line with GSAP pulsing packets */}
        <div className="hidden lg:block relative py-2">
          <svg 
            ref={pulseLinesRef} 
            className="w-full h-8 overflow-visible" 
            viewBox="0 0 1000 30"
          >
            <line x1="50" y1="15" x2="950" y2="15" stroke="#1e293b" strokeWidth="4" strokeDasharray="8 8" />
            <line x1="50" y1="15" x2="950" y2="15" stroke="#059669" strokeWidth="2" strokeOpacity="0.4" />
            
            {/* GSAP animated packets */}
            <circle className="data-packet" cx="50" cy="15" r="5" fill="#34d399" filter="drop-shadow(0 0 6px #10b981)" />
            <circle className="data-packet" cx="50" cy="15" r="4" fill="#fb923c" filter="drop-shadow(0 0 6px #f97316)" />
            <circle className="data-packet" cx="50" cy="15" r="5" fill="#60a5fa" filter="drop-shadow(0 0 6px #3b82f6)" />
          </svg>
        </div>

        {/* Pipeline Nodes Grid */}
        <div ref={flowNodesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="bg-white/5 border border-white/10 hover:border-emerald-500/50 p-5 rounded-2xl backdrop-blur-sm space-y-3 transition-all hover:bg-white/10 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              Source Attribution
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Every button embeds an invisible <code className="text-emerald-400 font-mono">[src:tag]</code>. The assistant knows if the user came from a 48h website ad, a property reel, or Google Maps.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-emerald-500/50 p-5 rounded-2xl backdrop-blur-sm space-y-3 transition-all hover:bg-white/10 group">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
              Meta Cloud Webhook
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Direct HTTPS handshake with Meta servers. Zero third-party middleman markup. The event hits our server within 250 milliseconds.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-emerald-500/50 p-5 rounded-2xl backdrop-blur-sm space-y-3 transition-all hover:bg-white/10 group">
            <div className="w-10 h-10 rounded-xl bg-bm-orange/20 text-bm-orange flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-bm-orange transition-colors">
              Intent Classification
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Answers verified rate card questions, sends PDF price cards, or bilingual Tamil instructions strictly from your approved knowledge base.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-emerald-500/50 p-5 rounded-2xl backdrop-blur-sm space-y-3 transition-all hover:bg-white/10 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono font-bold text-sm">
              04
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              Human Escalation
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              When a buyer requests custom proposals or expresses hesitation, the system halts automation and alerts your phone for high-touch closing.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — THE PROBLEM THIS ACTUALLY SOLVES (ZERO JARGON)  */}
      {/* ========================================================= */}
      <section className="bg-bm-wash-cool rounded-3xl border border-bm-brand-soft/40 p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white border border-bm-brand-soft px-3 py-1 rounded-full text-xs font-bold text-bm-navy">
            <Clock className="w-3.5 h-3.5 text-bm-orange" />
            <span>The Real Bottleneck</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            The Problem This Actually Solves
          </h2>

          <p className="text-sm sm:text-base text-bm-ink leading-relaxed">
            You spend hard-earned money on ads and marketing. Inquiries come in. Then reality happens:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-bm-line shadow-sm space-y-2 hover:border-rose-300 transition-colors">
            <span className="font-mono text-xs font-bold text-rose-600 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-rose-500" /> The 9:40 PM Lead
            </span>
            <p className="text-sm text-bm-ink font-semibold">
              A high-intent message arrives late in the evening and sits unread until 11:00 AM the next day — by which time they have already called your competitor.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-bm-line shadow-sm space-y-2 hover:border-rose-300 transition-colors">
            <span className="font-mono text-xs font-bold text-rose-600 flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-rose-500" /> The Repetitive Typing Loop
            </span>
            <p className="text-sm text-bm-ink font-semibold">
              Your staff spends 3 hours a day manually typing the exact same five answers: location, hours, pricing, and services.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-bm-line shadow-sm space-y-2 hover:border-rose-300 transition-colors">
            <span className="font-mono text-xs font-bold text-rose-600 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-rose-500" /> The Abandoned Follow-Up
            </span>
            <p className="text-sm text-bm-ink font-semibold">
              Someone says &ldquo;Let me check with my partner&rdquo; and nobody on your team ever follows up with them again.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-bm-line shadow-sm space-y-2 hover:border-rose-300 transition-colors">
            <span className="font-mono text-xs font-bold text-rose-600 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-rose-500" /> Burnout on Low-Intent Leads
            </span>
            <p className="text-sm text-bm-ink font-semibold">
              Your best salespeople burn their energy answering tire-kickers and run out of patience for serious, ready-to-buy clients.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-bm-navy/20 shadow-sm text-center max-w-3xl mx-auto space-y-2">
          <p className="text-base sm:text-lg font-extrabold text-bm-navy-deep">
            None of that is a marketing problem.
          </p>
          <p className="text-xs sm:text-sm text-bm-ink-muted leading-relaxed">
            It is a response-time problem, and it quietly wastes over 60% of what you spend on getting attention in the first place.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — WHAT IT DOES (LIFECYCLE TABLE)                  */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            What It Does: Step by Step
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            The clear division of responsibility between the automated assistant and your human team:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-bm-line-soft">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-bm-wash-cool text-bm-navy-deep font-bold border-b border-bm-line-soft">
              <tr>
                <th className="py-3 px-4 font-display">Inquiry Stage</th>
                <th className="py-3 px-4">What Happens in the Chat</th>
                <th className="py-3 px-4 font-display text-right">Who Handles It</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bm-line-soft">
              {lifecycleStages.map((stage, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-bm-wash-cool/40 transition-colors ${
                    stage.highlight ? 'bg-amber-50/50' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-bm-navy-deep">{stage.stage}</td>
                  <td className="py-3.5 px-4 text-bm-ink leading-relaxed">{stage.action}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] ${
                        stage.highlight
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {stage.handler}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — WHAT IT WILL NEVER DO (TRUST BUILDER)           */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Operational Guardrails</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            What It Will Never Do
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            Business owners are rightly protective of their brand reputation. Here are the hard boundaries built into the code:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustRules.map((item, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2 hover:border-emerald-500/40 hover:bg-emerald-50/30 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <h3 className="text-sm font-bold text-bm-navy-deep">{item.rule}</h3>
              </div>
              <p className="text-xs text-bm-ink-muted leading-relaxed pl-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — WE RUN OUR OWN BUSINESS ON IT                   */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-bm-navy-deep via-bm-brand to-[#08182b] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-bm-brand-soft/20 space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>Tested on Ourselves</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            We Run Our Own Business on This Exact System
          </h2>

          <p className="text-sm sm:text-base text-bm-brand-soft leading-relaxed">
            This is not software we resell or white-label from an overseas third-party. It is the exact automation engine that answers you when you message BM TechX on WhatsApp, managing inbound leads across our group on a single number.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-3 backdrop-blur-sm max-w-3xl">
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            It is the operational reason we can deliver a ₹2,999 website profitably — the intake, project scoping, and asset collection checklist happen without human intervention right up to the point where our developers actually code.
          </p>
          <p className="text-xs text-amber-300 font-semibold">
            Ask us on your scope call what the assistant occasionally gets wrong. We will tell you openly, because you’ll see how we handle edge cases anyway.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5b — PROOF SYSTEM                                   */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            Automation Proof
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Engineered In-House
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            Backed by our production n8n workflows and official Meta Business Cloud API infrastructure.
          </p>
        </div>

        <div className="space-y-4">
          <ProofBlock id="wa-own-usage" />
          <ProofBlock id="wa-transcript" />
          <ProofBlock id="wa-strip" />
          <ProofBlock id="wa-case-1" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — WHO THIS IS NOT FOR (DISQUALIFIERS)             */}
      {/* ========================================================= */}
      <section>
        <NotForBlock items={notForItems} />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 7 — FAQ ACCORDION (WITH FAQPAGE SCHEMA)             */}
      {/* ========================================================= */}
      <section>
        <FAQ
          items={waFaqs}
          title="WhatsApp Automation FAQ"
          subtitle="Honest answers regarding official API verification, language models, wrong answers, and scoping calls."
        />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 8 — CLOSING CTA                                     */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 border border-bm-brand-soft/20 text-center max-w-4xl mx-auto shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Discovery Scope Call</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Book a 20-minute scope call. You’ll get a written quote, not a sales pitch.
          </h2>
          <p className="text-sm text-bm-brand-soft leading-relaxed">
            Message us on WhatsApp. We will map your current inquiry bottlenecks and tell you whether an automated assistant will generate positive ROI for your business.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppCTA
            src="wa-auto-footer"
            intent="Hi BM TechX — I want to book a 20-minute scope call for WhatsApp automation."
            label="Book Scope Call on WhatsApp"
            variant="primary"
            className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg"
          />
          {onOpenQuote && (
            <button
              onClick={() => onOpenQuote('WhatsApp Automation (LeadOS)')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Request Workflow Audit</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default WhatsAppAutomationPage;
