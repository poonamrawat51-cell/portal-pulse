import { ShieldAlert } from 'lucide-react'

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16 md:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <ShieldAlert className="size-3.5 text-primary" aria-hidden="true" />
          For RevOps teams running HubSpot at scale
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl">
          Diagnose your HubSpot portal.
          <br />
          <span className="text-primary">Before it breaks revenue.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Paste your workflow logic or property JSON and let the Audit Engine grade
          four dimensions of portal health — surfacing the misconfigurations quietly
          leaking pipeline.
        </p>
      </div>

      <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border text-center">
        {[
          { value: '120+', label: 'Best-practice checks' },
          { value: '4', label: 'Health dimensions' },
          { value: '<2s', label: 'Time to first insight' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card px-4 py-5">
            <dt className="font-mono text-2xl font-semibold text-foreground">{stat.value}</dt>
            <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
