import { createContext, useContext } from 'react'

import type { Language, LocalizedText } from '../types'

const translations = {
  en: {
    platform: 'Platform',
    explorePlatform: 'Explore the platform',
    submitSourcingRequest: 'Submit a sourcing request',
    requestIntroduction: 'Request introduction',
    overview: 'Overview',
    exporters: 'Exporters',
    buyerRequests: 'Buyer Requests',
    matches: 'Matches',
    dealRooms: 'Deal Rooms',
    tasks: 'Tasks',
    documents: 'Documents',
    partners: 'Partners',
    marketIntelligence: 'Market Intelligence',
    activeOpportunities: 'Active opportunities',
    samplesInTransit: 'Samples in transit',
    complianceReviews: 'Compliance reviews',
    pilotOrders: 'Pilot orders',
    tasksDue: 'Tasks due',
    recentActivity: 'Recent activity',
    upcomingDeadlines: 'Upcoming deadlines',
    meetings: 'Meetings',
    search: 'Search',
    filters: 'Filters',
    loading: 'Loading demonstration data…',
    empty: 'No matching results yet.',
    error: 'Unable to load demo data right now.',
    retry: 'Retry',
    loadingShort: 'Loading',
    noResults: 'No results',
    private: 'Private',
    verified: 'Verified',
    viewProfile: 'View profile',
    viewDetails: 'View details',
    openDealRoom: 'Open deal room',
    requestMoreInformation: 'Request more information',
    inviteToOpportunity: 'Invite to opportunity',
    proposeExporter: 'Propose exporter for buyer request',
    messages: 'Messages',
    productSpecifications: 'Product Specifications',
    samples: 'Samples',
    commercialTerms: 'Commercial Terms',
    shipment: 'Shipment',
    close: 'Close',
    cancel: 'Cancel',
    sendRequest: 'Send request',
    send: 'Send',
    demoData: 'Demonstration data only',
    productCategories: 'Featured California categories',
    trustTitle: 'Managed introductions built on trust',
    warning: 'Final regulatory requirements must be confirmed by qualified professionals.',
    backToList: 'Back to list',
    language: '中文',
    updateFeed: 'Refresh feed',
    simulateIssue: 'Simulate issue',
    restore: 'Restore',
    contactPartner: 'Contact partner',
    submit: 'Submit',
    success: 'Request submitted',
  },
  zh: {
    platform: '平台',
    explorePlatform: '探索平台',
    submitSourcingRequest: '提交采购需求',
    requestIntroduction: '申请引荐',
    overview: '总览',
    exporters: '出口商',
    buyerRequests: '采购需求',
    matches: '匹配',
    dealRooms: '项目协作室',
    tasks: '任务',
    documents: '文件',
    partners: '服务伙伴',
    marketIntelligence: '市场洞察',
    activeOpportunities: '活跃机会',
    samplesInTransit: '在途样品',
    complianceReviews: '合规审核',
    pilotOrders: '试单项目',
    tasksDue: '待办任务',
    recentActivity: '近期动态',
    upcomingDeadlines: '即将到期',
    meetings: '会议安排',
    search: '搜索',
    filters: '筛选',
    loading: '正在加载演示数据…',
    empty: '暂无符合条件的结果。',
    error: '演示数据暂时无法加载。',
    retry: '重试',
    loadingShort: '加载中',
    noResults: '暂无结果',
    private: '私密',
    verified: '已验证',
    viewProfile: '查看资料',
    viewDetails: '查看详情',
    openDealRoom: '打开协作室',
    requestMoreInformation: '索取更多信息',
    inviteToOpportunity: '邀请进入机会',
    proposeExporter: '向采购需求推荐该出口商',
    messages: '消息',
    productSpecifications: '产品规格',
    samples: '样品',
    commercialTerms: '商务条款',
    shipment: '物流发运',
    close: '关闭',
    cancel: '取消',
    sendRequest: '发送请求',
    send: '发送',
    demoData: '仅为演示数据',
    productCategories: '加州重点品类',
    trustTitle: '以信任为基础的管理式引荐',
    warning: '最终监管要求须由具备资质的专业人士确认。',
    backToList: '返回列表',
    language: 'EN',
    updateFeed: '刷新动态',
    simulateIssue: '模拟异常',
    restore: '恢复',
    contactPartner: '联系伙伴',
    submit: '提交',
    success: '请求已提交',
  },
} as const

type TranslationKey = keyof typeof translations.en

type I18nContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey) => string
  localize: (text: LocalizedText) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

export function useI18n() {
  const value = useContext(I18nContext)

  if (!value) {
    throw new Error('useI18n must be used within an I18nContext provider')
  }

  return value
}

export function translateText(text: LocalizedText, language: Language) {
  return text[language]
}

export function createI18nValue(
  language: Language,
  setLanguage: (language: Language) => void,
) {
  return {
    language,
    setLanguage,
    toggleLanguage: () => {
      setLanguage(language === 'en' ? 'zh' : 'en')
    },
    t: (key: TranslationKey) => translations[language][key],
    localize: (text: LocalizedText) => translateText(text, language),
  }
}
