import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { navigationItems } from './data/mockData'
import { cn } from './lib/cn'
import { useI18n } from './lib/i18n'
import type { LocalizedText } from './types'

export function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-950 shadow-lg shadow-navy-950/20"
      >
        <span className="absolute left-1 top-3 h-4 w-4 rotate-12 rounded-[8px] bg-gold-300" />
        <span className="absolute right-1 top-2 h-5 w-5 -rotate-12 rounded-[10px] bg-sage-500" />
        <span className="absolute bottom-1 left-3 h-4 w-6 rounded-[12px] bg-cream-100" />
      </div>
      <div>
        <p className="text-sm font-semibold tracking-[0.22em] text-sage-600 uppercase">
          Tri-Stone
        </p>
        <p className="text-base font-semibold text-navy-950">Shuoguo Leilei</p>
      </div>
    </div>
  )
}

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useI18n()

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-sage-400 hover:text-sage-700"
      aria-label={`Switch language from ${language}`}
    >
      <span>{t('language')}</span>
    </button>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.24em] text-sage-600 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight text-navy-950">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-sm leading-7 text-navy-700/75">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}

export function Card({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(9,20,43,0.35)] backdrop-blur',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function StatusBadge({
  tone = 'default',
  children,
}: {
  tone?: 'default' | 'success' | 'warning' | 'info'
  children: ReactNode
}) {
  const toneStyles = {
    default: 'bg-navy-100 text-navy-700',
    success: 'bg-sage-100 text-sage-700',
    warning: 'bg-gold-100 text-gold-800',
    info: 'bg-cream-200 text-navy-800',
  }

  return (
    <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', toneStyles[tone])}>
      {children}
    </span>
  )
}

export function MetricCard({
  label,
  value,
  change,
}: {
  label: string
  value: string
  change: string
}) {
  return (
    <Card className="space-y-3">
      <p className="text-sm text-navy-600">{label}</p>
      <p className="text-3xl font-semibold text-navy-950">{value}</p>
      <p className="text-sm text-sage-700">{change}</p>
    </Card>
  )
}

export function ProgressBar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-navy-700">
        <span>{label}</span>
        <span className="font-semibold text-navy-950">{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-navy-100">
        <div
          className="h-3 rounded-full bg-linear-to-r from-sage-500 to-gold-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card className="border-dashed text-center">
      <div className="mx-auto max-w-md space-y-3 py-8">
        <p className="text-lg font-semibold text-navy-950">{title}</p>
        <p className="text-sm leading-7 text-navy-700/75">{description}</p>
      </div>
    </Card>
  )
}

export function LoadingPanel() {
  const { t } = useI18n()

  return (
    <Card className="flex min-h-48 items-center justify-center">
      <div className="flex items-center gap-3 text-navy-700">
        <span className="h-3 w-3 animate-pulse rounded-full bg-sage-500" />
        <span className="text-sm font-medium">{t('loading')}</span>
      </div>
    </Card>
  )
}

export function ErrorPanel({
  title,
  description,
  onRetry,
}: {
  title: string
  description: string
  onRetry?: () => void
}) {
  const { t } = useI18n()

  return (
    <Card className="border border-rose-200 bg-rose-50/70">
      <div className="space-y-3">
        <p className="text-lg font-semibold text-rose-800">{title}</p>
        <p className="text-sm text-rose-700">{description}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-full bg-rose-700 px-4 py-2 text-sm font-semibold text-white"
          >
            {t('retry')}
          </button>
        ) : null}
      </div>
    </Card>
  )
}

export function BarChart({
  items,
}: {
  items: Array<{ label: string; value: number; note?: string }>
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm text-navy-700">
            <span>{item.label}</span>
            <span className="font-semibold text-navy-950">{item.value}</span>
          </div>
          <div className="h-3 rounded-full bg-navy-100">
            <div
              className="h-3 rounded-full bg-linear-to-r from-navy-700 via-sage-500 to-gold-300"
              style={{ width: `${item.value}%` }}
            />
          </div>
          {item.note ? <p className="text-xs text-navy-600">{item.note}</p> : null}
        </div>
      ))}
    </div>
  )
}

export function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-semibold transition',
        active ? 'bg-navy-950 text-white' : 'bg-navy-100 text-navy-700 hover:bg-navy-200',
      )}
    >
      {children}
    </button>
  )
}

export function ActionButton({
  children,
  to,
  onClick,
  tone = 'primary',
}: {
  children: ReactNode
  to?: string
  onClick?: () => void
  tone?: 'primary' | 'secondary'
}) {
  const className = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition',
    tone === 'primary'
      ? 'bg-navy-950 text-white hover:bg-navy-800'
      : 'border border-navy-200 bg-white text-navy-800 hover:border-sage-400 hover:text-sage-700',
  )

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export function AppShell({
  children,
}: {
  children: ReactNode
}) {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-sand-50">
      <header className="border-b border-white/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="min-w-0">
            <LogoMark />
          </Link>
          <div className="hidden flex-1 justify-center md:flex">
            <nav className="flex flex-wrap justify-center gap-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition',
                      isActive ? 'bg-navy-950 text-white' : 'text-navy-700 hover:bg-navy-100',
                    )
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </nav>
          </div>
          <LanguageToggle />
        </div>
        <div className="border-t border-navy-100 md:hidden">
          <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive ? 'bg-navy-950 text-white' : 'bg-white text-navy-700',
                  )
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}

export function PublicShell({
  children,
  onOpenSourcingRequest,
}: {
  children: ReactNode
  onOpenSourcingRequest: () => void
}) {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(20,70,57,0.12),_transparent_32%),linear-gradient(180deg,#f9f6ef_0%,#f3efe5_55%,#eef4ef_100%)]">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/75 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="min-w-0">
            <LogoMark />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-navy-700 md:flex">
            <a href="#how-it-works">How it works</a>
            <a href="#categories">Categories</a>
            <a href="#trust">{t('trustTitle')}</a>
            <Link to="/dashboard">{t('platform')}</Link>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSourcingRequest}
              className="hidden rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-800 sm:inline-flex"
            >
              {t('submitSourcingRequest')}
            </button>
            <LanguageToggle />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export function PageNotice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-900">
      {children}
    </div>
  )
}

export function Modal({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  onClose: () => void
}) {
  const { t } = useI18n()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-navy-950">{title}</h2>
            {subtitle ? <p className="text-sm text-navy-700">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-navy-100 px-4 py-2 text-sm font-semibold text-navy-700"
          >
            {t('close')}
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

export function DetailList({
  items,
}: {
  items: Array<{ label: string | LocalizedText; value: string }>
}) {
  const { localize } = useI18n()

  return (
    <dl className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={`${typeof item.label === 'string' ? item.label : item.label.en}-${item.value}`} className="rounded-2xl bg-sand-50 p-4">
          <dt className="text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            {typeof item.label === 'string' ? item.label : localize(item.label)}
          </dt>
          <dd className="mt-2 text-sm text-navy-800">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
