import React, { useState } from 'react';
import {
  Layers,
  Database,
  Cpu,
  Globe,
  Lock,
  Server,
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface StackNode {
  id: string;
  title: string;
  subtitle: string;
  category: 'frontend' | 'cms' | 'backend' | 'database' | 'hosting' | 'payments';
  technologies: string[];
  description: string;
  whyChosen: string;
  legacyComparison: {
    legacyStack: string;
    modernProductionStack: string;
    keyAdvantage: string;
  };
  sampleCodeSnippet?: string;
}

export const TechStackExplorer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('frontend');
  const [comparisonView, setComparisonView] = useState<'interactive_diagram' | 'side_by_side'>('interactive_diagram');

  const stackNodes: StackNode[] = [
    {
      id: 'frontend',
      title: 'Frontend & UI Layer',
      subtitle: 'Next.js + Tailwind CSS + TypeScript',
      category: 'frontend',
      technologies: ['Next.js (App Router)', 'Tailwind CSS', 'TypeScript', 'Lucide Icons'],
      description:
        'Next.js is the sweet spot for a modern creative marketplace because it supports both static pages (Public Marketplace, Portfolios, About, System Documentation) and dynamic pages (Client & Designer Dashboards, Real-time Messaging, M-Pesa STK push) from a unified codebase.',
      whyChosen:
        'Server-Side Rendering (SSR) delivers superior SEO for designer portfolios and creative projects, allowing search engines to index creative talent. Tailwind provides atomic utility styling adhering to strict typography and 60-30-10 color balance.',
      legacyComparison: {
        legacyStack: 'Legacy PHP server templates with jQuery & manual CSS',
        modernProductionStack: 'Next.js + Tailwind CSS + TypeScript',
        keyAdvantage: 'Type-safe component reuse, zero page reload routing, and automated SSR SEO indexing for public portfolios.',
      },
      sampleCodeSnippet: `// app/marketplace/page.tsx
export default async function MarketplacePage() {
  const projects = await prisma.project.findMany({
    where: { status: 'Pending' },
    include: { client: true, bids: true }
  });
  return <ProjectsFeed initialProjects={projects} />;
}`,
    },
    {
      id: 'cms',
      title: 'Headless CMS Layer',
      subtitle: 'Sanity.io or Contentful',
      category: 'cms',
      technologies: ['Sanity Studio', 'Contentful GraphQL', 'GROQ Query Engine'],
      description:
        'A headless CMS decouples content authoring from code deployment. Non-technical staff (curators, creative directors, marketing managers) can curate featured designers, spotlight design awards, publish industry briefs, and manage editorial news without modifying source code.',
      whyChosen:
        'Sanity and Contentful provide generous free tiers, real-time structured previews, collaborative editing, and instantaneous webhooks that revalidate Next.js cache on demand.',
      legacyComparison: {
        legacyStack: 'Raw PHP MySQL admin forms and manual database inserts',
        modernProductionStack: 'Sanity / Contentful Headless CMS + Next.js ISR',
        keyAdvantage: 'Zero-downtime editorial publishing; non-programmers safely update marketplace spotlights and editorial collections.',
      },
      sampleCodeSnippet: `// sanity.config.ts - Designer Spotlight Schema
export const designerSchema = {
  name: 'featuredDesigner',
  title: 'Featured Creative Designer',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'specialization', type: 'string' },
    { name: 'portfolioGallery', type: 'array', of: [{ type: 'image' }] },
    { name: 'featuredBadge', type: 'string' }
  ]
};`,
    },
    {
      id: 'backend',
      title: 'Backend & Authentication',
      subtitle: 'Next.js API Routes + NextAuth.js / Auth.js',
      category: 'backend',
      technologies: ['Next.js Route Handlers', 'NextAuth.js', 'OAuth / Google SSO', 'JWT Sessions'],
      description:
        'Next.js Route Handlers (/api/*) eliminate the need for an independent Express microservice while maintaining full server-side capability. NextAuth.js handles session management, CSRF protection, and single sign-on (SSO).',
      whyChosen:
        'Seamless integration with Google Workspace (used by creative agencies, enterprises, and startups), role-based access control (Client vs Designer vs Administrator), and encrypted HTTP-only session cookies.',
      legacyComparison: {
        legacyStack: 'PHP $_SESSION with custom cookie scripts and plaintext sessions',
        modernProductionStack: 'Next.js API Handlers + NextAuth.js (Auth.js)',
        keyAdvantage: 'Standards-compliant OAuth2 & JWT tokens, role-based middleware guards, and reduced server maintenance overhead.',
      },
      sampleCodeSnippet: `// auth.ts - Multi-Role Session Config
export const { handlers, auth } = NextAuth({
  providers: [GoogleProvider],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role; // 'client' | 'designer' | 'admin'
      return token;
    }
  }
});`,
    },
    {
      id: 'database',
      title: 'Relational Database & ORM',
      subtitle: 'PostgreSQL + Prisma ORM',
      category: 'database',
      technologies: ['PostgreSQL 16', 'Prisma ORM', 'Type-Safe Migrations', 'Connection Pooling'],
      description:
        'PostgreSQL is the industry benchmark for structured, mission-critical relational data — handling verified designer profiles, creative contracts, escrow transactions, and audit trails. Prisma provides an intuitive, type-safe data access layer.',
      whyChosen:
        'Prisma auto-generates TypeScript types directly from the database schema, completely preventing runtime typos in table joins or missing foreign key constraints.',
      legacyComparison: {
        legacyStack: 'Legacy MySQL via raw PDO/mysqli string queries',
        modernProductionStack: 'PostgreSQL + Prisma ORM with automated migrations',
        keyAdvantage: 'Compile-time type safety for complex relations (e.g. Project -> Bids -> Payments), JSONB support for flexible deliverable metadata.',
      },
      sampleCodeSnippet: `// prisma/schema.prisma
model Project {
  id                  String     @id @default(cuid())
  title               String
  budgetKes           Decimal    @db.Decimal(12, 2)
  status              Status     @default(PENDING)
  client              Client     @relation(fields: [clientId], references: [id])
  clientId            String
  bids                Bid[]
  payments            Payment[]
  createdAt           DateTime   @default(now())
}`,
    },
    {
      id: 'payments',
      title: 'Payment Infrastructure',
      subtitle: 'Safaricom Daraja M-Pesa STK Push API',
      category: 'payments',
      technologies: ['Daraja 2.0 REST API', 'STK Push (Lipa Na M-Pesa)', 'Webhook Callbacks', 'AES Encryption'],
      description:
        'Direct connection to Safaricom Daraja API enabling real-time mobile push prompts to user handsets (+254 7XX), verifying callbacks, locking funds in escrow, and generating instant Safaricom receipt codes.',
      whyChosen:
        'M-Pesa accounts for over 90% of digital transactions in Kenya. Native Daraja integration eliminates exorbitant 15-20% foreign exchange fees charged by global platforms like Upwork and Fiverr.',
      legacyComparison: {
        legacyStack: 'Raw PHP cURL scripts to Safaricom Sandbox endpoints',
        modernProductionStack: 'Next.js Edge API Route + Webhook signature verification',
        keyAdvantage: 'Real-time callback handling with exponential backoff retry and cryptographic receipt validation.',
      },
      sampleCodeSnippet: `// app/api/mpesa/stkpush/route.ts
export async function POST(req: Request) {
  const { phone, amount, projectId } = await req.json();
  const token = await generateDarajaToken();
  const res = await fetch('https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    headers: { Authorization: \`Bearer \${token}\` },
    body: JSON.stringify({ BusinessShortCode: '174379', ... })
  });
  return NextResponse.json(await res.json());
}`,
    },
    {
      id: 'hosting',
      title: 'Cloud Hosting & Edge CDN',
      subtitle: 'Vercel / Google Cloud Run',
      category: 'hosting',
      technologies: ['Vercel Edge Network', 'Serverless Functions', 'Zero-Config CI/CD', 'Automated SSL'],
      description:
        'Vercel or Cloud Run provides single-command zero-config deployment. Assets and static pages are served from nearest global edge caches with automatic HTTPS and instant preview branches for team collaboration.',
      whyChosen:
        'Zero server patching, instant scaling to meet high-volume project posting spikes, and automated branch previews that allow engineering teams to review code changes before merging to production.',
      legacyComparison: {
        legacyStack: 'Localhost XAMPP / cPanel Apache server with manual FTP uploads',
        modernProductionStack: 'Vercel / Cloud Run Edge Serverless Cloud',
        keyAdvantage: 'Global high availability (99.99%), automated SSL certificates, and zero hardware maintenance.',
      },
      sampleCodeSnippet: `// Command-line deployment
$ vercel deploy --prod
🔍 Inspecting /mydms-platform
✅ Production: https://mydms.co.ke [1.8s]
🚀 Automatic Edge Caching active across Nairobi & Johannesburg nodes`,
    },
  ];

  const selectedNode = stackNodes.find((n) => n.id === selectedNodeId) || stackNodes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-800" />
              <span>Production Architecture Roadmap · Enterprise 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Recommended Enterprise Stack: Next.js + Headless CMS + PostgreSQL
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              A modern, unified 100% TypeScript production architecture uniting Next.js, Headless CMS,
              and PostgreSQL — completely free of PHP, Apache, or manual server config.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setComparisonView('interactive_diagram')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                comparisonView === 'interactive_diagram'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Interactive Diagram
            </button>
            <button
              onClick={() => setComparisonView('side_by_side')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                comparisonView === 'side_by_side'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Legacy PHP vs. Modern Stack
            </button>
          </div>
        </div>
      </div>

      {comparisonView === 'interactive_diagram' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Diagram Flow */}
          <div className="lg:col-span-5 space-y-3">
            <div className="px-2 pb-1 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Click any box to inspect deep architecture:
              </span>
            </div>

            <div className="space-y-2.5">
              {stackNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all relative flex items-center justify-between group ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-blue-500/50'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {node.category}
                        </span>
                        <h3 className="text-xs font-bold leading-tight">{node.title}</h3>
                      </div>
                      <p
                        className={`text-[11px] font-mono truncate ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {node.subtitle}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected
                          ? 'text-blue-400 translate-x-1'
                          : 'text-slate-400 group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Architecture Pipeline Flowchart Indicator */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <span className="text-[11px] font-bold text-slate-800 uppercase block">
                End-to-End Request Pipeline
              </span>
              <div className="font-mono text-[11px] text-slate-700 space-y-1">
                <div>Client Browser → Vercel Edge CDN</div>
                <div className="text-slate-400 pl-4">↓ (SSR / SSG Caching)</div>
                <div>Next.js Frontend (Tailwind + TypeScript)</div>
                <div className="text-slate-400 pl-4">↓ (Auth &amp; API Routes)</div>
                <div>NextAuth.js + Daraja M-Pesa + Sanity CMS</div>
                <div className="text-slate-400 pl-4">↓ (Type-Safe Query)</div>
                <div>Prisma ORM → PostgreSQL Database</div>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Dive Drawer */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                  {selectedNode.category} Layer
                </span>
                <span className="text-xs text-slate-400 font-mono">Component Architecture</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{selectedNode.title}</h2>
              <p className="text-xs font-mono font-semibold text-blue-900">{selectedNode.subtitle}</p>
            </div>

            {/* Technologies */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900">Associated Technologies & Libraries:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 text-slate-800 font-medium text-xs rounded-lg border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Architectural Role */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900">Role in MYDMS Platform:</span>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedNode.description}</p>
            </div>

            {/* Strategic Advantage */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-blue-800 shrink-0" />
                <span>Why This Stack Wins for Kenya&apos;s Creative Economy:</span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">{selectedNode.whyChosen}</p>
            </div>

            {/* Legacy Comparison */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Modernization Impact
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Legacy Monolith (PHP / Static)
                  </span>
                  <p className="text-slate-700 font-medium">{selectedNode.legacyComparison.legacyStack}</p>
                </div>
                <div>
                  <span className="text-[10px] text-blue-900 uppercase font-semibold block">
                    Recommended Production Target
                  </span>
                  <p className="text-slate-900 font-semibold">{selectedNode.legacyComparison.modernProductionStack}</p>
                </div>
              </div>
              <p className="text-slate-600 text-[11px] pt-1 border-t border-slate-200">
                <strong>Key Advantage:</strong> {selectedNode.legacyComparison.keyAdvantage}
              </p>
            </div>

            {/* Code Snippet */}
            {selectedNode.sampleCodeSnippet && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-900">Architecture Implementation Code:</span>
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{selectedNode.sampleCodeSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Side-by-side Table Comparison */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Comprehensive Architectural Matrix: Legacy PHP vs. Enterprise Production Stack
            </h3>
            <span className="text-xs text-slate-500 font-mono">6 Architectural Layers</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 w-40">System Layer</th>
                  <th className="px-5 py-3">Legacy PHP / MySQL Architecture</th>
                  <th className="px-5 py-3">Recommended Production Stack (TypeScript)</th>
                  <th className="px-5 py-3">Value Realized</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {stackNodes.map((node) => (
                  <tr key={node.id} className="hover:bg-slate-50/80">
                    <td className="px-5 py-4 font-bold text-slate-900 capitalize">
                      {node.title}
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-mono text-[11px]">
                      {node.legacyComparison.legacyStack}
                    </td>
                    <td className="px-5 py-4 text-blue-900 font-mono font-semibold text-[11px]">
                      {node.legacyComparison.modernProductionStack}
                    </td>
                    <td className="px-5 py-4 text-slate-700 leading-relaxed">
                      {node.legacyComparison.keyAdvantage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
