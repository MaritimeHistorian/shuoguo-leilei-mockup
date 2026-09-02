export type Language = 'en' | 'zh'

export type LocalizedText = {
  en: string
  zh: string
}

export type Stage =
  | 'Qualify'
  | 'Match'
  | 'Sample'
  | 'Prepare'
  | 'Pilot order'
  | 'Grow'

export type Exporter = {
  id: string
  name: LocalizedText
  county: LocalizedText
  products: string[]
  certifications: string[]
  readinessScore: number
  verificationStatus: 'Verified' | 'In review'
  exportReadiness: 'Ready now' | 'Scaling' | 'Pilot ready'
  availableVolume: 'Boutique' | 'Mid-scale' | 'Large scale'
  packagingCapability: 'Retail-ready' | 'Bulk' | 'Flexible'
  targetChannel: 'Retail' | 'Foodservice' | 'Ingredient'
  heroImage: string
  originStory: LocalizedText
  overview: LocalizedText
  formats: string[]
  seasonality: string[]
  capacity: string
  minimumOrder: string
  currentExportMarkets: string[]
  documentationChecklist: Array<{ label: string; complete: boolean }>
  productLines: Array<{
    name: string
    grade: string
    format: string
    season: string
  }>
  privateNotes: LocalizedText
  marketingAssets: string[]
}

export type BuyerRequest = {
  id: string
  buyerName: LocalizedText
  buyerType: LocalizedText
  productNeeded: string
  intendedUse: LocalizedText
  region: string
  volume: string
  targetTiming: string
  certifications: string[]
  packagingNeeds: string
  status: 'Qualified' | 'Matching' | 'Sampling' | 'Negotiation'
  channel: 'Retail' | 'Foodservice' | 'Ingredient' | 'E-commerce'
  orderSize: 'Pilot' | 'Container' | 'Program'
  summary: LocalizedText
  verificationNotes: LocalizedText
  requirements: Array<{ label: LocalizedText; value: string }>
  matches: Array<{
    exporterId: string
    matchPercent: number
    explanation: LocalizedText
  }>
}

export type ActivityItem = {
  id: string
  title: LocalizedText
  detail: LocalizedText
  time: string
  tone: 'success' | 'info' | 'warning'
}

export type OpportunityCard = {
  id: string
  title: LocalizedText
  buyer: string
  exporter: string
  stage: Stage
  dueDate: string
  value: string
}

export type DeadlineItem = {
  id: string
  title: LocalizedText
  due: string
  owner: string
}

export type MeetingItem = {
  id: string
  title: LocalizedText
  time: string
  attendees: string
}

export type DealRoom = {
  id: string
  title: LocalizedText
  summary: LocalizedText
  participants: Array<{ name: string; role: LocalizedText; side: 'Buyer' | 'Exporter' | 'Partner' }>
  sampleStage: Stage
  sampleSteps: Array<{ label: string; complete: boolean }>
  timeline: Array<{ label: string; complete: boolean }>
  messages: Array<{ sender: string; role: string; body: LocalizedText; time: string }>
  specifications: Array<{ label: string; value: string }>
  documents: Array<{ name: string; status: 'Ready' | 'Pending' | 'Private' }>
  tasks: Array<{ name: string; owner: string; due: string; done: boolean }>
  terms: Array<{ label: string; value: string }>
  shipment: Array<{ label: string; value: string }>
}

export type Partner = {
  id: string
  name: string
  specialty: LocalizedText
  services: string[]
  regions: string[]
  languages: string[]
  verified: boolean
  description: LocalizedText
}

export type MarketInsight = {
  label: string
  value: number
  note: LocalizedText
}

export type Observation = {
  title: LocalizedText
  detail: LocalizedText
}
