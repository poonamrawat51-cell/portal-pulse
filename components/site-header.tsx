'use client'

import { useCallback, useEffect, useState } from 'react'
import { Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'audit', label: 'Audit Engine' },
  { id: 'checks', label: 'Checks' },
  { id: 'pricing', label: 'Pricing' },
]

export function SiteHeader() {
  const [active, setActive] = useState<string>('')

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Scroll spy: highlight the nav item whose section is in view.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="size-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Portal Auditor
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className={cn(
                'relative text-sm transition-colors hover:text-foreground',
                active === item.id ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute -bottom-[22px] left-0 h-0.5 w-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        <Button size="sm" className="font-medium" onClick={() => scrollToId('audit')}>
          Run Free Audit
        </Button>
      </div>
    </header>
  )
}
