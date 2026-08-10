import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { AuditConsole } from '@/components/audit-console'
import { Pricing } from '@/components/pricing'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <AuditConsole />
      <Pricing />
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>HubSpot Portal Auditor — independent, not affiliated with HubSpot, Inc.</p>
          <p>© {new Date().getFullYear()} Portal Auditor</p>
        </div>
      </footer>
    </main>
  )
}
<footer className="w-full border-t border-slate-800 py-6 text-center text-sm text-slate-400">
  <div className="flex justify-center space-x-6 mb-4">
    <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
    <a href="mailto:portalpulse.support@gmail.com" className="hover:text-white transition-colors">Support</a>
  </div>
  <p>© {new Date().getFullYear()} Portal Pulse. All rights reserved.</p>
</footer>
