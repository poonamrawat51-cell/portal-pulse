'use client'

import { useCallback, useRef, useState } from 'react'
import {
  Braces,
  Database,
  FileJson,
  GitBranch,
  Loader2,
  Route,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MetricCard, type MetricCardData } from '@/components/metric-card'

const initialMetrics: MetricCardData[] = [
  {
    id: 'workflow',
    label: 'Workflow Efficiency',
    icon: GitBranch,
    score: null,
    status: null,
    summary: 'Redundant branches, unreachable enrollment triggers, and delay bottlenecks.',
    findings: [],
  },
  {
    id: 'routing',
    label: 'Lead Routing',
    icon: Route,
    score: null,
    status: null,
    summary: 'Round-robin gaps, owner assignment logic, and SLA handoff coverage.',
    findings: [],
  },
  {
    id: 'pipeline',
    label: 'Pipeline Hygiene',
    icon: ShieldCheck,
    score: null,
    status: null,
    summary: 'Stale deals, stage-skip velocity, and probability misalignment.',
    findings: [],
  },
  {
    id: 'data',
    label: 'Data Quality',
    icon: Database,
    score: null,
    status: null,
    summary: 'Property fill rates, format validation, and duplicate contact density.',
    findings: [],
  },
]

// Deterministic "analysis" result used for the demo audit run.
const auditResult: Record<string, Pick<MetricCardData, 'score' | 'status' | 'summary' | 'findings'>> = {
  workflow: {
    score: 62,
    status: 'warn',
    summary: '3 of 18 workflows have unreachable branches draining enrollment.',
    findings: [
      'Workflow "Nurture — Tier 2" has a delay step of 30 days with no re-enrollment guard.',
      'Two branches evaluate the same property, creating a redundant fork.',
    ],
  },
  routing: {
    score: 41,
    status: 'risk',
    summary: 'Round-robin skips 4 reps with inactive assignment rules.',
    findings: [
      'No fallback owner set for inbound leads outside business hours.',
      'Territory rule references a deprecated country property value.',
    ],
  },
  pipeline: {
    score: 78,
    status: 'good',
    summary: 'Healthy velocity, with a small pocket of stalled enterprise deals.',
    findings: [
      '11 deals have been in "Decision Maker Bought-In" for 60+ days.',
      'Stage probabilities align with historical close rates.',
    ],
  },
  data: {
    score: 55,
    status: 'warn',
    summary: 'Contact email fill rate is strong, but industry data is sparse.',
    findings: [
      '38% of companies are missing the "Industry" property.',
      '~1,240 likely duplicate contacts detected by fuzzy email match.',
    ],
  },
}

const samplePayload = `{
  "workflow": {
    "name": "Nurture — Tier 2",
    "enrollmentTriggers": [{ "property": "lifecyclestage", "operator": "EQ", "value": "lead" }],
    "actions": [
      { "type": "DELAY", "days": 30 },
      { "type": "BRANCH", "on": "hs_lead_status" }
    ]
  }
}`

type Phase = 'idle' | 'analyzing' | 'complete'

export function AuditConsole() {
  const [input, setInput] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [metrics, setMetrics] = useState<MetricCardData[]>(initialMetrics)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const hasInput = input.trim().length > 0 || files.length > 0

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    setFiles((prev) => [...prev, ...Array.from(incoming)].slice(0, 6))
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      addFiles(e.dataTransfer.files)
    },
    [addFiles],
  )

  const runAudit = useCallback(() => {
    if (!hasInput || phase === 'analyzing') return
    setPhase('analyzing')
    setMetrics(initialMetrics)

    window.setTimeout(() => {
      setMetrics((prev) =>
        prev.map((m) => ({ ...m, ...auditResult[m.id] })),
      )
      setPhase('complete')
    }, 1900)
  }, [hasInput, phase])

  const overall =
    phase === 'complete'
      ? Math.round(
          metrics.reduce((sum, m) => sum + (m.score ?? 0), 0) / metrics.length,
        )
      : null

  return (
    <section id="audit" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-24">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Input column */}
        <div className="lg:col-span-3">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Braces className="size-4 text-primary" aria-hidden="true" />
              <h2 className="text-sm font-medium text-card-foreground">Portal input</h2>
            </div>

            <label htmlFor="portal-input" className="sr-only">
              Paste workflow logic or property JSON
            </label>
            <div className="relative mt-4">
              <textarea
                id="portal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste workflow logic, property JSON, or a HubSpot export snippet…"
                spellCheck={false}
                className="h-56 w-full resize-none rounded-xl border border-border bg-background p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              {input.trim().length === 0 && (
                <button
                  type="button"
                  onClick={() => setInput(samplePayload)}
                  className="absolute bottom-3 right-3 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Load sample
                </button>
              )}
            </div>

            {/* File upload zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
              className={cn(
                'mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center transition-colors',
                dragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-primary/40',
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".json,.csv,.txt"
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
              <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Upload className="size-5" aria-hidden="true" />
              </span>
              <p className="text-sm text-card-foreground">
                Drop portal exports or{' '}
                <span className="font-medium text-primary">browse files</span>
              </p>
              <p className="text-xs text-muted-foreground">JSON, CSV, or TXT — up to 6 files</p>
            </div>

            {files.length > 0 && (
              <ul className="mt-3 flex flex-col gap-2">
                {files.map((file, i) => (
                  <li
                    key={`${file.name}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <FileJson className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="truncate text-sm text-card-foreground">{file.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="size-3.5" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex items-center gap-3">
              <Button
                size="lg"
                onClick={runAudit}
                disabled={!hasInput || phase === 'analyzing'}
                className="gap-2 font-medium"
              >
                {phase === 'analyzing' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Running Audit Engine…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" aria-hidden="true" />
                    Run Audit Engine
                  </>
                )}
              </Button>
              {!hasInput && (
                <p className="text-xs text-muted-foreground">
                  Paste logic or upload a file to begin.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Score summary column */}
        <div className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6">
            <div>
              <h2 className="text-sm font-medium text-card-foreground">Portal health index</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Weighted across all four audit dimensions.
              </p>
            </div>

            <div className="my-6 flex flex-col items-center justify-center py-4">
              <div
                className={cn(
                  'flex size-40 items-center justify-center rounded-full border-4 transition-colors',
                  overall === null
                    ? 'border-border'
                    : overall >= 70
                      ? 'border-success'
                      : overall >= 50
                        ? 'border-warning'
                        : 'border-danger',
                )}
              >
                <div className="text-center">
                  <span className="font-mono text-5xl font-semibold tabular-nums text-card-foreground">
                    {phase === 'analyzing' ? '…' : (overall ?? '--')}
                  </span>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {overall === null ? 'Awaiting scan' : 'of 100'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {phase === 'complete'
                  ? 'Lead routing is your biggest revenue leak. Fix fallback ownership first.'
                  : phase === 'analyzing'
                    ? 'Parsing configuration and cross-checking against best-practice rules…'
                    : 'Run the engine to surface prioritized, revenue-impacting issues.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div id="checks" className="mt-6 grid scroll-mt-24 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            analyzing={phase === 'analyzing'}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
