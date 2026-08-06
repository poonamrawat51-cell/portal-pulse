'use client'

import { Check, FileText, Wrench, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const CALENDLY_URL = 'https://calendly.com/portal-auditor/portal-fix-sprint'

type Tier = {
  id: string
  name: string
  price: string
  cadence: string
  icon: typeof Zap
  description: string
  features: string[]
  cta: string
  href?: string
  featured?: boolean
}

const tiers: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    icon: Zap,
    description: 'Run the Audit Engine and see your four health scores instantly.',
    features: [
      'Full four-dimension health index',
      'Top-line score per category',
      'Paste JSON or upload exports',
      'No account required',
    ],
    cta: 'Run a free audit',
    href: '#audit',
  },
  {
    id: 'pro',
    name: 'Pro Audit',
    price: '$29',
    cadence: 'per report',
    icon: FileText,
    description: 'Unlock the detailed, shareable PDF report with every finding.',
    features: [
      'Everything in Free',
      'Detailed PDF report export',
      'Full findings & remediation steps',
      'Prioritized by revenue impact',
      'Share with your RevOps team',
    ],
    cta: 'Unlock PDF report',
    href: '#audit',
    featured: true,
  },
  {
    id: 'fix',
    name: 'Full Portal Fix',
    price: '$1,500',
    cadence: 'consulting sprint',
    icon: Wrench,
    description: 'We fix it for you — a hands-on sprint to remediate every issue.',
    features: [
      'Everything in Pro Audit',
      'Hands-on remediation by experts',
      'Workflow & routing rebuild',
      'Data cleanup & dedupe',
      'Live walkthrough & handoff',
    ],
    cta: 'Book a sprint',
    href: CALENDLY_URL,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-24 pt-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Start free. Fix what&apos;s leaking revenue.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
          Diagnose for free, unlock the full report when you&apos;re ready, or bring us
          in to remediate the whole portal.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => {
          const Icon = tier.icon
          const isExternal = tier.href?.startsWith('http')
          return (
            <div
              key={tier.id}
              className={cn(
                'relative flex flex-col rounded-2xl border p-6',
                tier.featured
                  ? 'border-primary bg-card shadow-[0_0_0_1px_var(--primary)]'
                  : 'border-border bg-card',
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}

              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg',
                    tier.featured
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-card-foreground">{tier.name}</h3>
              </div>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-semibold tracking-tight text-foreground">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">/ {tier.cadence}</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tier.description}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-card-foreground">
                    <Check
                      className={cn(
                        'mt-0.5 size-4 shrink-0',
                        tier.featured ? 'text-primary' : 'text-muted-foreground',
                      )}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                variant={tier.featured ? 'default' : 'outline'}
                className="mt-8 w-full font-medium"
              >
                <a
                  href={tier.href}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {tier.cta}
                </a>
              </Button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
