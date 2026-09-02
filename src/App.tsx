import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppShell, Modal, PublicShell } from './components'
import { createI18nValue, I18nContext, useI18n } from './lib/i18n'
import {
  BuyerRequestDetailPage,
  BuyerRequestsPage,
  DashboardPage,
  DealRoomPage,
  ExporterDirectoryPage,
  ExporterProfilePage,
  LandingPage,
  MarketIntelligencePage,
  PartnersPage,
} from './pages'
import type { Language } from './types'

type IntroState = {
  subject: string
} | null

function RequestIntroductionModal({
  introState,
  onClose,
}: {
  introState: IntroState
  onClose: () => void
}) {
  const { t } = useI18n()
  const [submitted, setSubmitted] = useState(false)

  if (!introState) {
    return null
  }

  return (
    <Modal
      title={t('requestIntroduction')}
      subtitle={`Managed introduction request for ${introState.subject}`}
      onClose={() => {
        setSubmitted(false)
        onClose()
      }}
    >
      {submitted ? (
        <div className="space-y-4">
          <p className="text-sm leading-7 text-navy-700">
            Your introduction request has been saved locally for follow-up in the prototype workflow.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              onClose()
            }}
            className="rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white"
          >
            {t('close')}
          </button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <Input label="Your name" placeholder="Tri-Stone opportunity manager" />
          <Input label="Organization" placeholder="Tri-Stone" />
          <Input label="Introduction objective" placeholder="Sample review, channel fit, or partner coordination" />
          <label className="space-y-2 text-sm font-medium text-navy-700">
            Context
            <textarea
              rows={5}
              defaultValue={`Please help coordinate a managed introduction regarding ${introState.subject}.`}
              className="w-full rounded-2xl border border-navy-200 bg-sand-50 px-4 py-3 outline-none focus:border-sage-500"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white"
            >
              {t('sendRequest')}
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                onClose()
              }}
              className="rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-700"
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}

function SourcingRequestModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { t } = useI18n()
  const [submitted, setSubmitted] = useState(false)

  if (!open) {
    return null
  }

  return (
    <Modal
      title={t('submitSourcingRequest')}
      subtitle="Local demonstration form for verified buyer sourcing briefs."
      onClose={() => {
        setSubmitted(false)
        onClose()
      }}
    >
      {submitted ? (
        <div className="space-y-4">
          <p className="text-sm leading-7 text-navy-700">
            {t('success')}. The mock request is stored only in local interface state for this demo.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              onClose()
            }}
            className="rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white"
          >
            {t('close')}
          </button>
        </div>
      ) : (
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <Input label="Company" placeholder="Shanghai premium retailer" />
          <Input label="Region" placeholder="Shanghai" />
          <Input label="Product needed" placeholder="Almonds, citrus, olive oil…" />
          <Input label="Target timing" placeholder="Golden Week launch" />
          <Input label="Volume" placeholder="1 reefer, 500 cases, 8 MT…" />
          <Input label="Packaging needs" placeholder="Gift carton, retail pouch, bulk bag…" />
          <label className="space-y-2 text-sm font-medium text-navy-700 md:col-span-2">
            Intended use
            <textarea
              rows={4}
              placeholder="Describe channel, merchandising goal, and any compliance or documentation priorities."
              className="w-full rounded-2xl border border-navy-200 bg-sand-50 px-4 py-3 outline-none focus:border-sage-500"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-navy-700 md:col-span-2">
            Certifications & notes
            <textarea
              rows={4}
              placeholder="Organic, BRCGS, local labeling priorities, launch-market notes…"
              className="w-full rounded-2xl border border-navy-200 bg-sand-50 px-4 py-3 outline-none focus:border-sage-500"
            />
          </label>
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white"
            >
              {t('submit')}
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                onClose()
              }}
              className="rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-700"
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}

function Input({
  label,
  placeholder,
}: {
  label: string
  placeholder: string
}) {
  return (
    <label className="space-y-2 text-sm font-medium text-navy-700">
      {label}
      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-navy-200 bg-sand-50 px-4 py-3 outline-none focus:border-sage-500"
      />
    </label>
  )
}

function PlatformRoutes({
  onRequestIntroduction,
}: {
  onRequestIntroduction: (subject: string) => void
}) {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <AppShell>
            <DashboardPage />
          </AppShell>
        }
      />
      <Route
        path="/exporters"
        element={
          <AppShell>
            <ExporterDirectoryPage onRequestIntroduction={onRequestIntroduction} />
          </AppShell>
        }
      />
      <Route
        path="/exporters/:exporterId"
        element={
          <AppShell>
            <ExporterProfilePage onRequestIntroduction={onRequestIntroduction} />
          </AppShell>
        }
      />
      <Route
        path="/buyer-requests"
        element={
          <AppShell>
            <BuyerRequestsPage />
          </AppShell>
        }
      />
      <Route
        path="/buyer-requests/:requestId"
        element={
          <AppShell>
            <BuyerRequestDetailPage onRequestIntroduction={onRequestIntroduction} />
          </AppShell>
        }
      />
      <Route
        path="/deal-rooms/:dealRoomId"
        element={
          <AppShell>
            <DealRoomPage />
          </AppShell>
        }
      />
      <Route
        path="/partners"
        element={
          <AppShell>
            <PartnersPage onRequestIntroduction={onRequestIntroduction} />
          </AppShell>
        }
      />
      <Route
        path="/market-intelligence"
        element={
          <AppShell>
            <MarketIntelligencePage />
          </AppShell>
        }
      />
    </Routes>
  )
}

function LandingRoute({
  onOpenSourcingRequest,
}: {
  onOpenSourcingRequest: () => void
}) {
  return (
    <PublicShell onOpenSourcingRequest={onOpenSourcingRequest}>
      <LandingPage onOpenSourcingRequest={onOpenSourcingRequest} />
    </PublicShell>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [introState, setIntroState] = useState<IntroState>(null)
  const [sourcingOpen, setSourcingOpen] = useState(false)

  const i18nValue = useMemo(() => createI18nValue(language, setLanguage), [language])

  return (
    <I18nContext.Provider value={i18nValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingRoute onOpenSourcingRequest={() => setSourcingOpen(true)} />} />
          <Route path="/*" element={<PlatformRoutes onRequestIntroduction={(subject) => setIntroState({ subject })} />} />
        </Routes>
        <RequestIntroductionModal introState={introState} onClose={() => setIntroState(null)} />
        <SourcingRequestModal open={sourcingOpen} onClose={() => setSourcingOpen(false)} />
      </BrowserRouter>
    </I18nContext.Provider>
  )
}
