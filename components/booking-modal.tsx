'use client'

import { useEffect } from 'react'
import { CalendarClock, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CALENDLY_URL = 'https://calendly.com/portal-auditor/portal-fix-sprint'

const includes = [
  'Live review of your four health scores',
  'Prioritized remediation roadmap',
  'Workflow, routing & data cleanup plan',
  '$1,500 fixed-scope consulting sprint',
]

export function BookingModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <CalendarClock className="size-6" aria-hidden="true" />
        </span>

        <h2 id="booking-title" className="mt-4 text-xl font-semibold tracking-tight text-card-foreground">
          Book a portal walkthrough
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Grab a time with our RevOps team to walk through your audit and scope a
          Full Portal Fix consulting sprint.
        </p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-card-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Button asChild size="lg" className="mt-6 w-full font-medium">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Open Calendly
          </a>
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Opens Calendly in a new tab — no charge until you confirm.
        </p>
      </div>
    </div>
  )
}
