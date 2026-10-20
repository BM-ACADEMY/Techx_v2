import { useState, type FC } from 'react';
import {
  X,
  Lock,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  FileText,
  Activity,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LogOut,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSiteConfig } from '@/data/dataLayer';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DemoProject {
  id: string;
  name: string;
  service: string;
  city: string;
  progress: number;
  status: string;
  deliveryDate: string;
  lighthouse: { perf: number; seo: number; a11y: number; best: number };
  techLead: { name: string; phone: string };
  milestones: { title: string; done: boolean; date: string }[];
  stagingUrl: string;
}

const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'BM-TN-2026-088',
    name: 'Balaji Silks & Tex',
    service: 'Custom eCommerce Store + WhatsApp Bot',
    city: 'Chennai & Puducherry',
    progress: 92,
    status: 'Staging & Final Conversion Audit',
    deliveryDate: 'Tomorrow at 5:00 PM',
    lighthouse: { perf: 99, seo: 100, a11y: 100, best: 100 },
    techLead: { name: 'Karthik S. (Lead Full-Stack Eng.)', phone: '919403892971' },
    milestones: [
      { title: 'Brand Tokens & High-Contrast Cyber Architecture', done: true, date: 'Completed' },
      { title: 'Razorpay UPI & 0% Commission Checkout Integration', done: true, date: 'Completed' },
      { title: 'WhatsApp Automated Order & Cart Recovery Flow', done: true, date: 'Completed' },
      { title: 'Lighthouse 99+ Core Web Vitals Optimization', done: true, date: 'Completed' },
      { title: 'Production Domain DNS & Custom SSL Cutover', done: false, date: 'In Progress' },
    ],
    stagingUrl: 'https://staging-balajisilks.bmtechx.dev',
  },
  {
    id: 'BM-PY-2026-104',
    name: 'Dr. Radhakrishnan Dental Hospital',
    service: 'Local SEO Sprint + Custom React Web',
    city: 'Puducherry',
    progress: 100,
    status: 'Live & Ranking Top 3',
    deliveryDate: 'Delivered in 44 Hours',
    lighthouse: { perf: 100, seo: 100, a11y: 100, best: 100 },
    techLead: { name: 'Arun K. (SEO & Performance Lead)', phone: '919403892971' },
    milestones: [
      { title: 'Google Business Profile 100% Verification', done: true, date: 'Completed' },
      { title: 'Local Schema Markup & High-Speed Mobile Build', done: true, date: 'Completed' },
      { title: 'WhatsApp Instant Booking Button Setup', done: true, date: 'Completed' },
      { title: 'Top 3 Ranking on "Dentist near White Town"', done: true, date: 'Verified' },
    ],
    stagingUrl: 'https://radhakrishnandental.bmtechx.dev',
  },
];

export const ClientPortalModal: FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const site = getSiteConfig();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DemoProject>(DEMO_PROJECTS[0]);
  const [projectIdInput, setProjectIdInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const query = projectIdInput.trim().toUpperCase();
    const found = DEMO_PROJECTS.find(
      (p) => p.id.toUpperCase() === query || p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      setSelectedProject(found);
      setIsLoggedIn(true);
      setErrorMsg('');
    } else {
      // Allow instant entry with demo default
      setSelectedProject(DEMO_PROJECTS[0]);
      setIsLoggedIn(true);
      setErrorMsg('');
    }
  };

  const handleDemoSwitch = (proj: DemoProject) => {
    setSelectedProject(proj);
    setIsLoggedIn(true);
    setErrorMsg('');
  };

  const openWhatsAppLead = () => {
    const text = encodeURIComponent(
      `Hello ${selectedProject.techLead.name}! I am reviewing project ${selectedProject.id} (${selectedProject.name}) in the BM TechX Client Portal.`
    );
    window.open(`https://wa.me/${selectedProject.techLead.phone}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#0D0F17] border border-[#232636] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232636] bg-[#12141D]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFE600] flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_15px_rgba(255,230,0,0.3)]">
              &lt;&gt;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span id="portal-title" className="font-display font-extrabold text-base text-white tracking-tight">
                  BM TechX Client Command Center
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/30">
                  {isLoggedIn ? 'AUTHENTICATED' : 'CLIENT LOGIN'}
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">
                Real-Time Project Telemetry, Live Staging & Sprint Milestones
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#1A1D2B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE600]"
            aria-label="Close Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {!isLoggedIn ? (
            /* ======================================================== */
            /* VIEW 1: SIGN IN & DEMO ACCESS                           */
            /* ======================================================== */
            <div className="max-w-md mx-auto space-y-6 py-4">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600] shadow-[0_0_25px_rgba(255,230,0,0.15)]">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  Client Project Sign In
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Enter your Project Tracking ID or phone number to access your staging preview, milestone progress, and tax invoices.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="projectId" className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Project Tracking ID or Business Name
                  </label>
                  <input
                    id="projectId"
                    type="text"
                    value={projectIdInput}
                    onChange={(e) => setProjectIdInput(e.target.value)}
                    placeholder="e.g. BM-TN-2026-088 or Balaji"
                    className="w-full px-4 py-3 rounded-xl bg-[#12141D] border border-[#232636] text-white text-sm focus:outline-none focus:border-[#FFE600] focus:ring-2 focus:ring-[#FFE600]/20"
                  />
                  {errorMsg && <p className="text-xs text-red-400 mt-1">{errorMsg}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FFE600] hover:bg-[#FFD000] text-black font-extrabold py-3.5 rounded-xl shadow-[0_0_20px_rgba(255,230,0,0.25)] flex items-center justify-center gap-2"
                >
                  <span>Authenticate & View Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Instant 1-Click Demo Previews */}
              <div className="pt-4 border-t border-[#232636] space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Or Explore Live Demo Client Portals:
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {DEMO_PROJECTS.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleDemoSwitch(proj)}
                      className="w-full text-left p-3.5 rounded-xl bg-[#12141D] border border-[#232636] hover:border-[#FFE600]/60 transition-all group flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-[#FFE600] transition-colors">
                            {proj.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#94A3B8]">
                            ({proj.id})
                          </span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8]">
                          {proj.service} · {proj.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-[#FFE600]">
                          {proj.progress}%
                        </span>
                        <p className="text-[10px] text-emerald-400 font-medium">
                          {proj.status.slice(0, 16)}...
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* VIEW 2: AUTHENTICATED COOL CLIENT HUD DASHBOARD        */
            /* ======================================================== */
            <div className="space-y-6">
              {/* Project Top Card */}
              <div className="bg-[#12141D] border border-[#232636] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFE600]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FFE600] text-black">
                        {selectedProject.id}
                      </span>
                      <span className="text-xs text-[#94A3B8]">
                        Location: {selectedProject.city}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                      {selectedProject.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#FFE600] font-semibold">
                      {selectedProject.service}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Button
                      onClick={() => setIsLoggedIn(false)}
                      variant="outline"
                      size="sm"
                      className="border-[#232636] text-[#94A3B8] hover:text-white hover:bg-[#181B27] text-xs gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </Button>
                    <a
                      href={selectedProject.stagingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-[#FFE600] text-black hover:bg-[#FFD000] shadow-[0_0_15px_rgba(255,230,0,0.3)] transition-all"
                    >
                      <span>Live Staging URL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-6 border-t border-[#232636] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FFE600]" />
                      Status: <strong className="text-white">{selectedProject.status}</strong>
                    </span>
                    <span className="font-black text-[#FFE600] text-sm">
                      {selectedProject.progress}% Completed
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#08090D] rounded-full overflow-hidden border border-[#232636]">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFE600] to-[#FFB800] rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(255,230,0,0.5)]"
                      style={{ width: `${selectedProject.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                    <span>Target Delivery: {selectedProject.deliveryDate}</span>
                    <span className="text-emerald-400 font-semibold">Strict 48-Hour SLA Tracked</span>
                  </div>
                </div>
              </div>

              {/* 4 Telemetry Performance Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-[#12141D] border border-[#232636] text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">PageSpeed</span>
                  <div className="text-3xl font-black text-emerald-400 font-display">
                    {selectedProject.lighthouse.perf}
                  </div>
                  <p className="text-[10px] text-emerald-400 font-semibold">Mobile 4G Score</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#12141D] border border-[#232636] text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Search SEO</span>
                  <div className="text-3xl font-black text-emerald-400 font-display">
                    {selectedProject.lighthouse.seo}
                  </div>
                  <p className="text-[10px] text-emerald-400 font-semibold">Schema Injected</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#12141D] border border-[#232636] text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Accessibility</span>
                  <div className="text-3xl font-black text-[#FFE600] font-display">
                    {selectedProject.lighthouse.a11y}
                  </div>
                  <p className="text-[10px] text-[#FFE600] font-semibold">WCAG 2.1 AA</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#12141D] border border-[#232636] text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Cloud Server</span>
                  <div className="text-3xl font-black text-cyan-400 font-display">
                    120ms
                  </div>
                  <p className="text-[10px] text-cyan-400 font-semibold">Edge CDN Node</p>
                </div>
              </div>

              {/* Milestone Checklist & Action Strip */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Milestone Checklist */}
                <div className="lg:col-span-7 bg-[#12141D] border border-[#232636] rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Project Sprint Checkpoints
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.milestones.map((m, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 p-2 rounded-xl bg-[#08090D]/50 border border-[#232636]/60 text-xs"
                      >
                        {m.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-[#FFE600] shrink-0 mt-0.5 animate-pulse" />
                        )}
                        <div className="flex-1">
                          <span className={m.done ? 'text-[#CBD5E1]' : 'text-white font-bold'}>
                            {m.title}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            m.done ? 'text-emerald-400 bg-emerald-500/10' : 'text-[#FFE600] bg-[#FFE600]/10'
                          }`}
                        >
                          {m.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Client Actions */}
                <div className="lg:col-span-5 bg-[#12141D] border border-[#232636] rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Assigned Lead Engineer
                    </h4>
                    <div className="p-3.5 rounded-xl bg-[#08090D] border border-[#232636] space-y-1">
                      <p className="text-xs font-bold text-white">
                        {selectedProject.techLead.name}
                      </p>
                      <p className="text-[11px] text-[#94A3B8]">
                        Direct Engineering Response SLA: &lt; 15 mins
                      </p>
                    </div>

                    <button
                      onClick={openWhatsAppLead}
                      className="w-full py-3 px-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat with Lead Engineer on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => alert(`Invoice #INV-${selectedProject.id}.pdf downloaded with 18% GST tax summary.`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#181B27] hover:bg-[#232636] text-[#CBD5E1] font-semibold text-xs border border-[#232636] flex items-center justify-center gap-2 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#FFE600]" />
                      <span>Download Tax Invoice & SOW (PDF)</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-[#232636] flex items-center gap-2 text-[10px] text-[#94A3B8]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>BM TechX MCA Registered Entity (CIN: {site.entity.cin})</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPortalModal;
