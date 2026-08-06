import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MetricStatus = 'good' | 'warn' | 'risk'

export interface MetricCardData {
  id: string
  label: string
  icon: LucideIcon
  score: number | null
  status: MetricStatus | null
  summary: string
  findings: string[]
}

const statusConfig: Record<
  MetricStatus,
  { label: string; dot: string; text: string; bar: string }
> = {
  good: {
    label: 'Healthy',
    dot: 'bg-success',
    text: 'text-success',
    bar: 'bg-success',
  },
  warn: {
    label: 'Needs review',
    dot: 'bg-warning',
    text: 'text-warning',
    bar: 'bg-warning',
  },
  risk: {
    label: 'At risk',
    dot: 'bg-danger',
    text: 'text-danger',
    bar: 'bg-danger',
  },
}

interface MetricCardProps {
  metric: MetricCardData
  analyzing: boolean
  index: number
}

export function MetricCard({ metric, analyzing, index }: MetricCardProps) {
  const Icon = metric.icon
  const hasResult = metric.score !== null && metric.status !== null
  const config = hasResult ? statusConfig[metric.status as MetricStatus] : null

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-colors',
        hasResult && 'hover:border-primary/40',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h3 className="text-sm font-medium leading-tight text-card-foreground text-balance">
            {metric.label}
          </h3>
        </div>
        {config && (
          <span
            className={cn(
              'flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium',
              config.text,
            )}
          >
            <span className={cn('size-1.5 rounded-full', config.dot)} aria-hidden="true" />
            {config.label}
          </span>
        )}
      </div>

      <div className="mt-5">
        {analyzing ? (
          <SkeletonScore delay={index * 120} />
        ) : hasResult ? (
          <>
            <div className="flex items-end gap-1.5">
              <span className="font-mono text-4xl font-semibold tabular-nums text-card-foreground">
                {metric.score}
              </span>
              <span className="mb-1 text-sm text-muted-foreground">/ 100</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full rounded-full transition-[width] duration-700 ease-out', config?.bar)}
                style={{ width: `${metric.score}%` }}
              />
            </div>
          </>
        ) : (
          <div className="flex items-end gap-1.5">
            <span className="font-mono text-4xl font-semibold text-muted-foreground/40">--</span>
            <span className="mb-1 text-sm text-muted-foreground/60">/ 100</span>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {analyzing ? 'Scanning portal configuration…' : metric.summary}
      </p>

      {hasResult && metric.findings.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-border pt-4">
          {metric.findings.map((finding, i) => (
            <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
              <span className={cn('mt-1.5 size-1 shrink-0 rounded-full', config?.bar)} aria-hidden="true" />
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SkeletonScore({ delay }: { delay: number }) {
  return (
    <div className="animate-pulse" style={{ animationDelay: `${delay}ms` }}>
      <div className="h-9 w-24 rounded-md bg-muted" />
      <div className="mt-3 h-1.5 w-full rounded-full bg-muted" />
    </div>
  )
}
