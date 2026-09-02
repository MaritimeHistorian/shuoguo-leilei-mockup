import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import {
  ActionButton,
  BarChart,
  Card,
  DetailList,
  EmptyState,
  ErrorPanel,
  LoadingPanel,
  MetricCard,
  PageNotice,
  ProgressBar,
  SectionHeading,
  StatusBadge,
  TabButton,
} from './components'
import {
  barriers,
  buyerRequests,
  deadlines,
  dealRoom,
  exporters,
  featuredCategories,
  interestByCategory,
  interestByChannel,
  interestByRegion,
  journeyStages,
  meetings,
  observations,
  opportunityPipeline,
  partners,
  recentActivity,
  summaryCards,
} from './data/mockData'
import { cn } from './lib/cn'
import { useI18n } from './lib/i18n'
import type { BuyerRequest, Exporter, Stage } from './types'

function useDelayedReady(delay = 450) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), delay)
    return () => window.clearTimeout(timer)
  }, [delay])

  return ready
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition',
        active ? 'bg-navy-950 text-white' : 'bg-white text-navy-700 hover:bg-navy-100',
      )}
    >
      {label}
    </button>
  )
}

function OpportunityCardRow({
  exporter,
  onRequestIntroduction,
}: {
  exporter: Exporter
  onRequestIntroduction: (subject: string) => void
}) {
  const { localize, t } = useI18n()

  return (
    <Card className="flex h-full flex-col gap-5">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={exporter.heroImage}
          alt={localize(exporter.name)}
          className="h-44 w-full object-cover"
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-navy-950">{localize(exporter.name)}</h3>
            <p className="text-sm text-navy-600">{localize(exporter.county)}</p>
          </div>
          <StatusBadge tone={exporter.verificationStatus === 'Verified' ? 'success' : 'warning'}>
            {exporter.verificationStatus === 'Verified' ? t('verified') : exporter.verificationStatus}
          </StatusBadge>
        </div>
        <p className="text-sm leading-7 text-navy-700">{localize(exporter.overview)}</p>
        <div className="flex flex-wrap gap-2">
          {exporter.products.map((product) => (
            <StatusBadge key={product} tone="info">
              {product}
            </StatusBadge>
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-sand-50 p-3">
            <dt className="text-navy-500">Readiness</dt>
            <dd className="mt-1 font-semibold text-navy-900">{exporter.readinessScore}%</dd>
          </div>
          <div className="rounded-2xl bg-sand-50 p-3">
            <dt className="text-navy-500">Channel</dt>
            <dd className="mt-1 font-semibold text-navy-900">{exporter.targetChannel}</dd>
          </div>
          <div className="rounded-2xl bg-sand-50 p-3">
            <dt className="text-navy-500">Volume</dt>
            <dd className="mt-1 font-semibold text-navy-900">{exporter.availableVolume}</dd>
          </div>
          <div className="rounded-2xl bg-sand-50 p-3">
            <dt className="text-navy-500">Packaging</dt>
            <dd className="mt-1 font-semibold text-navy-900">{exporter.packagingCapability}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-3">
          <ActionButton to={`/exporters/${exporter.id}`}>{t('viewProfile')}</ActionButton>
          <ActionButton tone="secondary" onClick={() => onRequestIntroduction(localize(exporter.name))}>
            {t('requestIntroduction')}
          </ActionButton>
        </div>
      </div>
    </Card>
  )
}

function BuyerRequestCard({
  request,
}: {
  request: BuyerRequest
}) {
  const { localize, t } = useI18n()

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-navy-950">{localize(request.buyerName)}</h3>
          <p className="text-sm text-navy-600">{localize(request.buyerType)} · {request.region}</p>
        </div>
        <StatusBadge tone="info">{request.status}</StatusBadge>
      </div>
      <p className="text-sm leading-7 text-navy-700">{localize(request.summary)}</p>
      <dl className="grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-sand-50 p-4">
          <dt className="text-navy-500">Product</dt>
          <dd className="mt-1 font-semibold text-navy-900">{request.productNeeded}</dd>
        </div>
        <div className="rounded-2xl bg-sand-50 p-4">
          <dt className="text-navy-500">Volume</dt>
          <dd className="mt-1 font-semibold text-navy-900">{request.volume}</dd>
        </div>
        <div className="rounded-2xl bg-sand-50 p-4">
          <dt className="text-navy-500">Timing</dt>
          <dd className="mt-1 font-semibold text-navy-900">{request.targetTiming}</dd>
        </div>
        <div className="rounded-2xl bg-sand-50 p-4">
          <dt className="text-navy-500">Packaging</dt>
          <dd className="mt-1 font-semibold text-navy-900">{request.packagingNeeds}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-3">
        <ActionButton to={`/buyer-requests/${request.id}`}>{t('viewDetails')}</ActionButton>
        <ActionButton tone="secondary" to="/deal-rooms/dr-001">
          {t('openDealRoom')}
        </ActionButton>
      </div>
    </Card>
  )
}

export function LandingPage({
  onOpenSourcingRequest,
}: {
  onOpenSourcingRequest: () => void
}) {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <StatusBadge tone="info">{t('demoData')}</StatusBadge>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-navy-950 sm:text-6xl">
              From California’s producers to China’s buyers
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-navy-700">
              Tri-Stone verifies participants and manages opportunities from product matching through
              samples, compliance, logistics, pilot orders, and follow-up. This prototype demonstrates
              a managed pathway for curated agricultural trade introductions.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ActionButton to="/dashboard">{t('explorePlatform')}</ActionButton>
            <ActionButton tone="secondary" onClick={onOpenSourcingRequest}>
              {t('submitSourcingRequest')}
            </ActionButton>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <dt className="text-sm text-navy-500">Verified participants</dt>
              <dd className="mt-2 text-2xl font-semibold text-navy-950">42</dd>
            </Card>
            <Card className="p-5">
              <dt className="text-sm text-navy-500">Managed introductions</dt>
              <dd className="mt-2 text-2xl font-semibold text-navy-950">18</dd>
            </Card>
            <Card className="p-5">
              <dt className="text-sm text-navy-500">Pilot programs</dt>
              <dd className="mt-2 text-2xl font-semibold text-navy-950">7</dd>
            </Card>
          </dl>
        </div>
        <Card className="overflow-hidden p-0">
          <div className="grid gap-4 bg-navy-950 p-4 sm:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
              alt="California orchards"
              className="h-72 w-full rounded-2xl object-cover"
            />
            <div className="grid gap-4">
              <img
                src="https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?auto=format&fit=crop&w=900&q=80"
                alt="Curated export-ready products"
                className="h-34 w-full rounded-2xl object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80"
                alt="Pacific trade logistics"
                className="h-34 w-full rounded-2xl object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4 p-6 md:grid-cols-3">
            {[
              {
                title: 'Exporters',
                detail: 'Showcase verified California agricultural producers with export readiness, capacity, and private document controls.',
              },
              {
                title: 'Buyers',
                detail: 'Capture structured sourcing briefs from Chinese importers, retailers, and operators seeking curated opportunities.',
              },
              {
                title: 'Trade-service partners',
                detail: 'Introduce trusted logistics, compliance, localization, and finance partners at the right point in the process.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-sand-50 p-4">
                <p className="text-lg font-semibold text-navy-950">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-navy-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="how-it-works" className="space-y-6">
        <SectionHeading
          eyebrow="Journey"
          title="How it works"
          description="A relationship-driven workflow that helps both sides qualify, test fit, coordinate compliance, and grow repeat business."
        />
        <div className="grid gap-4 md:grid-cols-6">
          {journeyStages.map((stage, index) => (
            <Card key={stage} className="relative p-5">
              <p className="text-sm font-semibold tracking-[0.2em] text-sage-600 uppercase">
                {`0${index + 1}`}
              </p>
              <p className="mt-4 text-xl font-semibold text-navy-950">{stage}</p>
              <p className="mt-2 text-sm text-navy-700">
                {stage === 'Qualify'
                  ? 'Verify fit, timing, and seriousness on both sides.'
                  : stage === 'Match'
                    ? 'Shortlist exporters against buyer needs.'
                    : stage === 'Sample'
                      ? 'Coordinate samples, feedback, and revisions.'
                      : stage === 'Prepare'
                        ? 'Align packaging, documentation, and logistics.'
                        : stage === 'Pilot order'
                          ? 'Run a controlled first order with shared visibility.'
                          : 'Scale the relationship based on measured pilot success.'}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section id="categories" className="space-y-6">
        <SectionHeading
          eyebrow={t('productCategories')}
          title="California categories ready for managed introductions"
          description="The prototype is seeded with realistic product pathways across premium snacks, fresh produce, wine, and food ingredients."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((category) => (
            <Card key={category} className="p-5">
              <p className="text-lg font-semibold text-navy-950">{category}</p>
              <p className="mt-2 text-sm leading-7 text-navy-700">
                Curated exporter profiles, buyer demand signals, and managed next steps for pilot-order readiness.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section id="trust" className="space-y-6">
        <SectionHeading
          eyebrow="Trust layer"
          title={t('trustTitle')}
          description="Tri-Stone manages introductions, private deal rooms, and progress checkpoints. It does not act as a customs authority, law firm, or regulator."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: 'Verified participants',
              detail: 'Directory entries surface verification status, readiness signals, and channel fit before introductions are made.',
            },
            {
              title: 'Private deal rooms',
              detail: 'Commercially sensitive packaging, documentation, and shipment planning stay inside controlled project spaces.',
            },
            {
              title: 'Managed introductions',
              detail: 'Requests for introductions, sourcing briefs, samples, and follow-up tasks are coordinated with local-state workflow tools.',
            },
          ].map((item) => (
            <Card key={item.title}>
              <p className="text-xl font-semibold text-navy-950">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-navy-700">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="rounded-3xl bg-navy-950 px-6 py-8 text-sm text-cream-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">Shuoguo Leilei · Tri-Stone prototype</p>
            <p className="mt-2 text-cream-100/75">Demonstration-only interface with local mock data.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-cream-100/90">
            {['About', 'Services', 'Privacy', 'Contact', 'AmCham', 'Industry partner'].map((label) => (
              <a key={label} href="/" onClick={(event) => event.preventDefault()}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export function DashboardPage() {
  const { localize, t } = useI18n()
  const [feedMode, setFeedMode] = useState<'loading' | 'ready' | 'error'>('loading')
  const [feedRefreshToken, setFeedRefreshToken] = useState(0)
  const [cards, setCards] = useState(opportunityPipeline)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setFeedMode((current) => (current === 'error' ? current : 'ready')), 450)
    return () => window.clearTimeout(timer)
  }, [feedRefreshToken])

  const moveCard = (id: string, direction: -1 | 1) => {
    const stageOrder = journeyStages
    setCards((current) =>
      current.map((card) => {
        if (card.id !== id) {
          return card
        }

        const index = stageOrder.indexOf(card.stage)
        const next = stageOrder[index + direction]
        return next ? { ...card, stage: next } : card
      }),
    )
  }

  const moveCardToStage = (id: string, stage: Stage) => {
    setCards((current) => current.map((card) => (card.id === id ? { ...card, stage } : card)))
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Dashboard"
        title="Managed opportunity overview"
        description="Track qualified introductions, active samples, compliance workstreams, and pilot-order deadlines across the platform."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <MetricCard key={card.labelKey} label={t(card.labelKey)} value={card.value} change={card.change} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <Card className="space-y-5">
          <SectionHeading
            title={t('recentActivity')}
            description="A realistic local-state feed showing how managed opportunities progress across packaging, samples, and partner coordination."
            actions={
              <>
                <ActionButton
                  tone="secondary"
                  onClick={() => {
                    setFeedMode('loading')
                    setFeedRefreshToken((value) => value + 1)
                  }}
                >
                  {t('updateFeed')}
                </ActionButton>
                <ActionButton tone="secondary" onClick={() => setFeedMode('error')}>
                  {t('simulateIssue')}
                </ActionButton>
              </>
            }
          />
          {feedMode === 'loading' ? (
            <LoadingPanel />
          ) : feedMode === 'error' ? (
            <ErrorPanel
              title={t('error')}
              description="The demo activity feed occasionally surfaces a sync interruption to illustrate a recoverable error state."
              onRetry={() => setFeedMode('ready')}
            />
          ) : (
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-sand-200 bg-sand-50 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-navy-950">{localize(item.title)}</p>
                    <StatusBadge tone={item.tone}>{item.time}</StatusBadge>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-navy-700">{localize(item.detail)}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="space-y-4">
            <SectionHeading title={t('upcomingDeadlines')} />
            {deadlines.map((item) => (
              <div key={item.id} className="rounded-2xl bg-sand-50 p-4">
                <p className="font-semibold text-navy-950">{localize(item.title)}</p>
                <p className="mt-2 text-sm text-navy-700">{item.owner} · {item.due}</p>
              </div>
            ))}
          </Card>
          <Card className="space-y-4">
            <SectionHeading title={t('meetings')} />
            {meetings.map((item) => (
              <div key={item.id} className="rounded-2xl bg-sand-50 p-4">
                <p className="font-semibold text-navy-950">{localize(item.title)}</p>
                <p className="mt-2 text-sm text-navy-700">{item.time}</p>
                <p className="mt-1 text-sm text-navy-600">{item.attendees}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="space-y-5">
        <SectionHeading
          title="Opportunity pipeline"
          description="Drag cards between stages or use the stage movement controls to simulate a managed progression from qualification to repeat business."
        />
        <div className="grid gap-4 xl:grid-cols-6">
          {journeyStages.map((stage, index) => {
            const stageCards = cards.filter((card) => card.stage === stage)
            return (
              <div
                key={stage}
                className="rounded-3xl border border-white/80 bg-white/70 p-4"
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (draggingId) {
                    moveCardToStage(draggingId, stage)
                    setDraggingId(null)
                  }
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold tracking-[0.18em] text-sage-600 uppercase">
                    {stage}
                  </p>
                  <StatusBadge tone="info">{stageCards.length}</StatusBadge>
                </div>
                <div className="space-y-3">
                  {stageCards.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-navy-200 bg-sand-50 px-3 py-6 text-center text-sm text-navy-500">
                      Drop here
                    </div>
                  ) : (
                    stageCards.map((card) => (
                      <div
                        key={card.id}
                        draggable
                        onDragStart={() => setDraggingId(card.id)}
                        className="space-y-3 rounded-2xl bg-sand-50 p-4 shadow-sm"
                      >
                        <div>
                          <p className="font-semibold text-navy-950">{localize(card.title)}</p>
                          <p className="mt-1 text-xs text-navy-600">{card.buyer}</p>
                          <p className="text-xs text-navy-600">{card.exporter}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-navy-500">
                          <span>{card.dueDate}</span>
                          <span>{card.value}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => moveCard(card.id, -1)}
                            disabled={index === 0}
                            className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-700 disabled:opacity-40"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={() => moveCard(card.id, 1)}
                            disabled={index === journeyStages.length - 1}
                            className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-700 disabled:opacity-40"
                          >
                            →
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function ExporterDirectoryPage({
  onRequestIntroduction,
}: {
  onRequestIntroduction: (subject: string) => void
}) {
  const { t } = useI18n()
  const ready = useDelayedReady()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [certification, setCertification] = useState('All')
  const [readiness, setReadiness] = useState('All')
  const [volume, setVolume] = useState('All')
  const [packaging, setPackaging] = useState('All')
  const [channel, setChannel] = useState('All')

  const filtered = useMemo(() => {
    return exporters.filter((exporter) => {
      const haystack = `${exporter.name.en} ${exporter.name.zh} ${exporter.products.join(' ')}`.toLowerCase()
      return (
        haystack.includes(search.toLowerCase()) &&
        (category === 'All' || exporter.products.includes(category)) &&
        (certification === 'All' || exporter.certifications.includes(certification)) &&
        (readiness === 'All' || exporter.exportReadiness === readiness) &&
        (volume === 'All' || exporter.availableVolume === volume) &&
        (packaging === 'All' || exporter.packagingCapability === packaging) &&
        (channel === 'All' || exporter.targetChannel === channel)
      )
    })
  }, [category, certification, channel, packaging, readiness, search, volume])

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={t('exporters')}
        title="Verified California exporter directory"
        description="Search and filter fictional export-ready producers by category, certifications, readiness, volume, packaging, and channel fit."
      />
      <Card className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <label className="space-y-2 text-sm font-medium text-navy-700">
            {t('search')}
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Almonds, wine, citrus…"
              className="w-full rounded-2xl border border-navy-200 bg-sand-50 px-4 py-3 outline-none focus:border-sage-500"
            />
          </label>
          <SelectField label="Category" value={category} onChange={setCategory} options={['All', ...featuredCategories]} />
          <SelectField label="Certification" value={certification} onChange={setCertification} options={['All', 'BRCGS', 'Organic', 'Kosher', 'SMETA', 'Halal', 'GlobalG.A.P.', 'PrimusGFS', 'COOC Certified', 'Non-GMO']} />
          <SelectField label="Readiness" value={readiness} onChange={setReadiness} options={['All', 'Ready now', 'Pilot ready', 'Scaling']} />
          <SelectField label="Volume" value={volume} onChange={setVolume} options={['All', 'Boutique', 'Mid-scale', 'Large scale']} />
          <SelectField label="Packaging" value={packaging} onChange={setPackaging} options={['All', 'Retail-ready', 'Bulk', 'Flexible']} />
          <SelectField label="Channel" value={channel} onChange={setChannel} options={['All', 'Retail', 'Foodservice', 'Ingredient']} />
        </div>
      </Card>
      {!ready ? (
        <LoadingPanel />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={t('noResults')}
          description="Try broadening one of the filters to surface other verified California exporter profiles."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((exporter) => (
            <OpportunityCardRow
              key={exporter.id}
              exporter={exporter}
              onRequestIntroduction={onRequestIntroduction}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label className="space-y-2 text-sm font-medium text-navy-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-navy-200 bg-sand-50 px-4 py-3 outline-none focus:border-sage-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export function ExporterProfilePage({
  onRequestIntroduction,
}: {
  onRequestIntroduction: (subject: string) => void
}) {
  const { exporterId } = useParams()
  const { localize, t } = useI18n()
  const exporter = exporters.find((item) => item.id === exporterId)

  if (!exporter) {
    return (
      <ErrorPanel
        title="Exporter not found"
        description="The requested exporter profile is not available in the current demonstration dataset."
      />
    )
  }

  return (
    <div className="space-y-8">
      <Link to="/exporters" className="text-sm font-semibold text-sage-700">
        ← {t('backToList')}
      </Link>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-6">
          <div className="overflow-hidden rounded-3xl">
            <img src={exporter.heroImage} alt={localize(exporter.name)} className="h-80 w-full object-cover" />
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <StatusBadge tone="success">{t('verified')}</StatusBadge>
              <h1 className="text-4xl font-semibold tracking-tight text-navy-950">{localize(exporter.name)}</h1>
              <p className="text-sm text-navy-600">{localize(exporter.county)}</p>
            </div>
            <ActionButton onClick={() => onRequestIntroduction(localize(exporter.name))}>
              {t('proposeExporter')}
            </ActionButton>
          </div>
          <p className="text-base leading-8 text-navy-700">{localize(exporter.overview)}</p>
          <Card className="bg-sand-50">
            <p className="text-sm font-semibold tracking-[0.2em] text-sage-600 uppercase">Origin story</p>
            <p className="mt-3 text-sm leading-7 text-navy-700">{localize(exporter.originStory)}</p>
          </Card>
          <DetailList
            items={[
              { label: 'Formats', value: exporter.formats.join(' · ') },
              { label: 'Seasonality', value: exporter.seasonality.join(' · ') },
              { label: 'Capacity', value: exporter.capacity },
              { label: 'Minimum order', value: exporter.minimumOrder },
              { label: 'Packaging', value: exporter.packagingCapability },
              { label: 'Current export markets', value: exporter.currentExportMarkets.join(', ') },
            ]}
          />
        </Card>
        <div className="space-y-6">
          <Card className="space-y-4">
            <SectionHeading title="Export readiness" />
            <ProgressBar label="Managed readiness score" value={exporter.readinessScore} />
            <div className="grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl bg-sand-50 p-4">
                <p className="text-navy-500">Verification status</p>
                <p className="mt-2 font-semibold text-navy-950">{exporter.verificationStatus}</p>
              </div>
              <div className="rounded-2xl bg-sand-50 p-4">
                <p className="text-navy-500">Channel fit</p>
                <p className="mt-2 font-semibold text-navy-950">{exporter.targetChannel}</p>
              </div>
            </div>
          </Card>
          <Card className="space-y-4">
            <SectionHeading title="Compliance & documentation" />
            {exporter.documentationChecklist.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl bg-sand-50 p-4">
                <span className="text-sm text-navy-800">{item.label}</span>
                <StatusBadge tone={item.complete ? 'success' : 'warning'}>
                  {item.complete ? 'Ready' : 'In progress'}
                </StatusBadge>
              </div>
            ))}
          </Card>
          <Card className="space-y-4">
            <SectionHeading title="Marketing assets" />
            {exporter.marketingAssets.map((asset) => (
              <a
                key={asset}
                href={exporter.heroImage}
                download
                className="flex items-center justify-between rounded-2xl bg-sand-50 px-4 py-3 text-sm font-medium text-navy-800"
              >
                <span>{asset}</span>
                <span>Download</span>
              </a>
            ))}
          </Card>
          <Card className="space-y-4 border border-gold-200 bg-gold-50/80">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gold-900">{t('private')}</p>
              <StatusBadge tone="warning">{t('private')}</StatusBadge>
            </div>
            <p className="text-sm leading-7 text-gold-900">{localize(exporter.privateNotes)}</p>
          </Card>
        </div>
      </div>
      <Card className="space-y-4">
        <SectionHeading title="Products, grades, formats & seasonality" />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-navy-500">
              <tr>
                <th className="pb-3">Product</th>
                <th className="pb-3">Grade</th>
                <th className="pb-3">Format</th>
                <th className="pb-3">Seasonality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {exporter.productLines.map((item) => (
                <tr key={item.name}>
                  <td className="py-4 font-medium text-navy-950">{item.name}</td>
                  <td className="py-4 text-navy-700">{item.grade}</td>
                  <td className="py-4 text-navy-700">{item.format}</td>
                  <td className="py-4 text-navy-700">{item.season}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export function BuyerRequestsPage() {
  const ready = useDelayedReady()
  const [category, setCategory] = useState('All')
  const [channel, setChannel] = useState('All')
  const [region, setRegion] = useState('All')
  const [orderSize, setOrderSize] = useState('All')
  const [timing, setTiming] = useState('All')

  const filtered = useMemo(
    () =>
      buyerRequests.filter((request) => {
        return (
          (category === 'All' || request.productNeeded === category) &&
          (channel === 'All' || request.channel === channel) &&
          (region === 'All' || request.region === region) &&
          (orderSize === 'All' || request.orderSize === orderSize) &&
          (timing === 'All' || request.targetTiming === timing)
        )
      }),
    [category, channel, orderSize, region, timing],
  )

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Demand"
        title="Verified buyer sourcing requests"
        description="Fictional briefs from importers, distributors, retailers, foodservice buyers, and e-commerce operators in China."
      />
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <SelectField label="Category" value={category} onChange={setCategory} options={['All', 'Almonds', 'Olive oil', 'Pistachios', 'Citrus']} />
          <SelectField label="Channel" value={channel} onChange={setChannel} options={['All', 'Retail', 'Foodservice', 'Ingredient', 'E-commerce']} />
          <SelectField label="Region" value={region} onChange={setRegion} options={['All', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Beijing']} />
          <SelectField label="Order size" value={orderSize} onChange={setOrderSize} options={['All', 'Pilot', 'Container', 'Program']} />
          <SelectField label="Timing" value={timing} onChange={setTiming} options={['All', 'Golden Week launch', 'Q1 menu reset', 'Singles Day preheat', 'Lunar New Year']} />
        </div>
      </Card>
      {!ready ? (
        <LoadingPanel />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No requests match these filters"
          description="Broaden the region, category, or timing filters to reveal additional sourcing opportunities."
        />
      ) : (
        <div className="space-y-6">
          {filtered.map((request) => (
            <BuyerRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  )
}

export function BuyerRequestDetailPage({
  onRequestIntroduction,
}: {
  onRequestIntroduction: (subject: string) => void
}) {
  const { requestId } = useParams()
  const { localize, t } = useI18n()
  const request = buyerRequests.find((item) => item.id === requestId)

  if (!request) {
    return (
      <ErrorPanel
        title="Buyer request not found"
        description="The requested sourcing brief is not available in the current demonstration dataset."
      />
    )
  }

  return (
    <div className="space-y-8">
      <Link to="/buyer-requests" className="text-sm font-semibold text-sage-700">
        ← {t('backToList')}
      </Link>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-6">
          <StatusBadge tone="info">{request.status}</StatusBadge>
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-navy-950">{localize(request.buyerName)}</h1>
            <p className="text-sm text-navy-600">{localize(request.buyerType)} · {request.region}</p>
          </div>
          <p className="text-base leading-8 text-navy-700">{localize(request.summary)}</p>
          <DetailList
            items={[
              { label: { en: 'Product needed', zh: '需求产品' }, value: request.productNeeded },
              { label: { en: 'Intended use', zh: '用途' }, value: localize(request.intendedUse) },
              { label: { en: 'Volume', zh: '需求量' }, value: request.volume },
              { label: { en: 'Target timing', zh: '目标时间' }, value: request.targetTiming },
              { label: { en: 'Certifications', zh: '认证要求' }, value: request.certifications.join(', ') },
              { label: { en: 'Packaging needs', zh: '包装需求' }, value: request.packagingNeeds },
            ]}
          />
          <Card className="bg-sand-50">
            <p className="text-sm font-semibold tracking-[0.2em] text-sage-600 uppercase">Structured requirements</p>
            <div className="mt-4 space-y-3">
              {request.requirements.map((item) => (
                <div key={item.label.en} className="rounded-2xl bg-white p-4">
                  <p className="text-sm font-semibold text-navy-900">{localize(item.label)}</p>
                  <p className="mt-2 text-sm text-navy-700">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </Card>
        <div className="space-y-6">
          <Card className="space-y-4">
            <SectionHeading title="Buyer verification" />
            <p className="text-sm leading-7 text-navy-700">{localize(request.verificationNotes)}</p>
            <div className="grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl bg-sand-50 p-4">
                <p className="text-navy-500">Channel</p>
                <p className="mt-2 font-semibold text-navy-950">{request.channel}</p>
              </div>
              <div className="rounded-2xl bg-sand-50 p-4">
                <p className="text-navy-500">Order size</p>
                <p className="mt-2 font-semibold text-navy-950">{request.orderSize}</p>
              </div>
            </div>
          </Card>
          <Card className="space-y-4">
            <SectionHeading title="Recommended exporter matches" />
            {request.matches.map((match) => {
              const exporter = exporters.find((item) => item.id === match.exporterId)

              if (!exporter) {
                return null
              }

              return (
                <div key={match.exporterId} className="rounded-2xl bg-sand-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy-950">{localize(exporter.name)}</p>
                      <p className="mt-1 text-sm text-navy-600">{localize(exporter.county)}</p>
                    </div>
                    <StatusBadge tone="success">{match.matchPercent}%</StatusBadge>
                  </div>
                  <ProgressBar label="Match strength" value={match.matchPercent} />
                  <p className="mt-3 text-sm leading-7 text-navy-700">{localize(match.explanation)}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <ActionButton tone="secondary" to={`/exporters/${exporter.id}`}>
                      {t('viewProfile')}
                    </ActionButton>
                    <ActionButton onClick={() => onRequestIntroduction(`${localize(request.buyerName)} × ${localize(exporter.name)}`)}>
                      {t('inviteToOpportunity')}
                    </ActionButton>
                  </div>
                </div>
              )
            })}
          </Card>
          <div className="flex flex-wrap gap-3">
            <ActionButton onClick={() => onRequestIntroduction(localize(request.buyerName))}>
              {t('inviteToOpportunity')}
            </ActionButton>
            <ActionButton tone="secondary" onClick={() => onRequestIntroduction(`${localize(request.buyerName)} info request`)}>
              {t('requestMoreInformation')}
            </ActionButton>
            <ActionButton tone="secondary" to="/deal-rooms/dr-001">
              {t('openDealRoom')}
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}

const dealRoomTabs = ['Messages', 'Product Specifications', 'Samples', 'Documents', 'Tasks', 'Commercial Terms', 'Shipment'] as const

export function DealRoomPage() {
  const { localize, t } = useI18n()
  const location = useLocation()
  const queryTab = new URLSearchParams(location.search).get('tab')
  const [activeTab, setActiveTab] = useState<typeof dealRoomTabs[number]>(
    queryTab === 'documents' ? 'Documents' : 'Messages',
  )

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Private room"
        title={localize(dealRoom.title)}
        description={localize(dealRoom.summary)}
      />
      <PageNotice>{t('warning')}</PageNotice>
      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-6">
          <Card className="space-y-4">
            <SectionHeading title="Participants" />
            {dealRoom.participants.map((participant) => (
              <div key={participant.name} className="rounded-2xl bg-sand-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-navy-950">{participant.name}</p>
                  <StatusBadge tone={participant.side === 'Buyer' ? 'info' : participant.side === 'Exporter' ? 'success' : 'warning'}>
                    {participant.side}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm text-navy-700">{localize(participant.role)}</p>
              </div>
            ))}
          </Card>
          <Card className="space-y-4">
            <SectionHeading title="Sample tracker" />
            <div className="space-y-3">
              {dealRoom.sampleSteps.map((step) => (
                <div key={step.label} className="flex items-center justify-between rounded-2xl bg-sand-50 p-4">
                  <span className="text-sm text-navy-800">{step.label}</span>
                  <StatusBadge tone={step.complete ? 'success' : 'warning'}>
                    {step.complete ? 'Complete' : 'Pending'}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </Card>
          <Card className="space-y-4">
            <SectionHeading title="Pilot-order progress" />
            <div className="space-y-3">
              {dealRoom.timeline.map((step) => (
                <div key={step.label} className="flex items-center gap-3 rounded-2xl bg-sand-50 p-4">
                  <div className={cn('h-3 w-3 rounded-full', step.complete ? 'bg-sage-500' : 'bg-gold-300')} />
                  <span className="text-sm text-navy-800">{step.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {dealRoomTabs.map((tab) => (
              <TabButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                {tab === 'Product Specifications'
                  ? t('productSpecifications')
                  : tab === 'Commercial Terms'
                    ? t('commercialTerms')
                    : tab === 'Shipment'
                      ? t('shipment')
                      : tab === 'Messages'
                        ? t('messages')
                        : tab === 'Samples'
                          ? t('samples')
                          : tab === 'Documents'
                            ? t('documents')
                            : t('tasks')}
              </TabButton>
            ))}
          </div>

          {activeTab === 'Messages' ? (
            <div className="space-y-4">
              {dealRoom.messages.map((message) => (
                <div key={`${message.sender}-${message.time}`} className="rounded-2xl bg-sand-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-navy-950">{message.sender}</p>
                    <StatusBadge tone="info">{message.role} · {message.time}</StatusBadge>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-navy-700">{localize(message.body)}</p>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === 'Product Specifications' ? <DetailList items={dealRoom.specifications} /> : null}

          {activeTab === 'Samples' ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-sand-50">
                <p className="text-lg font-semibold text-navy-950">Current stage</p>
                <p className="mt-3 text-sm text-navy-700">{dealRoom.sampleStage}</p>
              </Card>
              <Card className="bg-sand-50">
                <p className="text-lg font-semibold text-navy-950">Tracking note</p>
                <p className="mt-3 text-sm text-navy-700">Sample cartons departed Modesto pack facility and are moving to Oakland consolidation.</p>
              </Card>
            </div>
          ) : null}

          {activeTab === 'Documents' ? (
            <div className="space-y-4">
              {dealRoom.documents.map((document) => (
                <div key={document.name} className="flex items-center justify-between rounded-2xl bg-sand-50 p-4">
                  <span className="text-sm text-navy-800">{document.name}</span>
                  <StatusBadge tone={document.status === 'Ready' ? 'success' : document.status === 'Private' ? 'warning' : 'info'}>
                    {document.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === 'Tasks' ? (
            <div className="space-y-4">
              {dealRoom.tasks.map((task) => (
                <div key={task.name} className="rounded-2xl bg-sand-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-navy-950">{task.name}</p>
                    <StatusBadge tone={task.done ? 'success' : 'warning'}>{task.done ? 'Done' : 'Open'}</StatusBadge>
                  </div>
                  <p className="mt-2 text-sm text-navy-700">{task.owner} · {task.due}</p>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === 'Commercial Terms' ? <DetailList items={dealRoom.terms} /> : null}

          {activeTab === 'Shipment' ? <DetailList items={dealRoom.shipment} /> : null}
        </Card>
      </div>
    </div>
  )
}

export function PartnersPage({
  onRequestIntroduction,
}: {
  onRequestIntroduction: (subject: string) => void
}) {
  const { localize, t } = useI18n()
  const [selectedService, setSelectedService] = useState('All')

  const services = ['All', 'Freight forwarder', 'Customs broker', 'Cold-chain operator', 'Regulatory adviser', 'Testing lab', 'Localization agency', 'Trademark attorney', 'Trade-finance provider']

  const filtered = partners.filter((partner) => selectedService === 'All' || localize(partner.specialty) === selectedService || partner.specialty.en === selectedService)

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={t('partners')}
        title="Verified service-partner directory"
        description="Fictional partner cards for logistics, localization, advisory, testing, legal, and finance support across managed opportunities."
      />
      <div className="flex flex-wrap gap-3">
        {services.map((service) => (
          <FilterChip
            key={service}
            label={service}
            active={selectedService === service}
            onClick={() => setSelectedService(service)}
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((partner) => (
          <Card key={partner.id} className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-navy-950">{partner.name}</h3>
                <p className="mt-1 text-sm text-navy-600">{localize(partner.specialty)}</p>
              </div>
              <StatusBadge tone={partner.verified ? 'success' : 'warning'}>
                {partner.verified ? t('verified') : 'Shortlisted'}
              </StatusBadge>
            </div>
            <p className="text-sm leading-7 text-navy-700">{localize(partner.description)}</p>
            <div className="space-y-2 text-sm text-navy-700">
              <p><span className="font-semibold text-navy-900">Services:</span> {partner.services.join(', ')}</p>
              <p><span className="font-semibold text-navy-900">Regions:</span> {partner.regions.join(', ')}</p>
              <p><span className="font-semibold text-navy-900">Languages:</span> {partner.languages.join(', ')}</p>
            </div>
            <ActionButton onClick={() => onRequestIntroduction(partner.name)}>{t('contactPartner')}</ActionButton>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function MarketIntelligencePage() {
  const { localize, t } = useI18n()
  const [status, setStatus] = useState<'ready' | 'loading' | 'error'>('ready')

  useEffect(() => {
    if (status !== 'loading') {
      return
    }

    const timer = window.setTimeout(() => setStatus('ready'), 800)
    return () => window.clearTimeout(timer)
  }, [status])

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={t('marketIntelligence')}
        title="Demonstration market intelligence"
        description="Attractive placeholder charts and notes showing how the platform might frame buyer demand, barriers, and launch insights."
        actions={
          <>
            <ActionButton tone="secondary" onClick={() => setStatus('loading')}>
              Refresh demo report
            </ActionButton>
            <ActionButton tone="secondary" onClick={() => setStatus('error')}>
              {t('simulateIssue')}
            </ActionButton>
          </>
        }
      />
      <PageNotice>{t('demoData')}</PageNotice>
      {status === 'loading' ? (
        <LoadingPanel />
      ) : status === 'error' ? (
        <ErrorPanel
          title={t('error')}
          description="This mock sync interruption demonstrates how the page handles recoverable data issues."
          onRetry={() => setStatus('ready')}
        />
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="space-y-4">
              <SectionHeading title="Buyer interest by product category" />
              <BarChart items={interestByCategory.map((item) => ({ label: item.label, value: item.value, note: localize(item.note) }))} />
            </Card>
            <Card className="space-y-4">
              <SectionHeading title="Buyer interest by channel" />
              <BarChart items={interestByChannel.map((item) => ({ label: item.label, value: item.value, note: localize(item.note) }))} />
            </Card>
            <Card className="space-y-4">
              <SectionHeading title="Target-region traction" />
              <BarChart items={interestByRegion.map((item) => ({ label: item.label, value: item.value, note: localize(item.note) }))} />
            </Card>
            <Card className="space-y-4">
              <SectionHeading title="Common barriers" />
              <BarChart items={barriers.map((item) => ({ label: item.label, value: item.value, note: localize(item.note) }))} />
            </Card>
          </div>
          <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <Card className="space-y-4">
              <SectionHeading title="Sample-to-pilot conversion" />
              <div className="space-y-4">
                <ProgressBar label="Approved samples progressing to pilot orders" value={64} />
                <div className="rounded-2xl bg-sand-50 p-4 text-sm leading-7 text-navy-700">
                  Premium gifting categories convert fastest when packaging and localization are aligned before sampling concludes.
                </div>
              </div>
            </Card>
            <Card className="space-y-4">
              <SectionHeading title="Recent market observations" />
              <div className="grid gap-4 md:grid-cols-2">
                {observations.map((observation) => (
                  <div key={observation.title.en} className="rounded-2xl bg-sand-50 p-4">
                    <p className="text-lg font-semibold text-navy-950">{localize(observation.title)}</p>
                    <p className="mt-3 text-sm leading-7 text-navy-700">{localize(observation.detail)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
