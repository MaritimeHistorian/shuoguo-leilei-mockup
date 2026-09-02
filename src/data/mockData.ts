import type {
  ActivityItem,
  BuyerRequest,
  DeadlineItem,
  DealRoom,
  Exporter,
  MarketInsight,
  MeetingItem,
  Observation,
  OpportunityCard,
  Partner,
  Stage,
} from '../types'

export const navigationItems = [
  { labelKey: 'overview', href: '/dashboard' },
  { labelKey: 'exporters', href: '/exporters' },
  { labelKey: 'buyerRequests', href: '/buyer-requests' },
  { labelKey: 'matches', href: '/buyer-requests/br-101' },
  { labelKey: 'dealRooms', href: '/deal-rooms/dr-001' },
  { labelKey: 'tasks', href: '/dashboard#tasks' },
  { labelKey: 'documents', href: '/deal-rooms/dr-001?tab=documents' },
  { labelKey: 'partners', href: '/partners' },
  { labelKey: 'marketIntelligence', href: '/market-intelligence' },
] as const

export const featuredCategories = [
  'Almonds',
  'Walnuts',
  'Pistachios',
  'Wine',
  'Olive oil',
  'Dried fruit',
  'Citrus',
  'Stone fruit',
  'Food ingredients',
]

export const journeyStages: Stage[] = [
  'Qualify',
  'Match',
  'Sample',
  'Prepare',
  'Pilot order',
  'Grow',
]

export const exporters: Exporter[] = [
  {
    id: 'golden-valley-almonds',
    name: { en: 'Golden Valley Almond Collective', zh: '金谷杏仁合作社' },
    county: { en: 'Stanislaus County', zh: '斯坦尼斯劳斯县' },
    products: ['Almonds', 'Dried fruit', 'Food ingredients'],
    certifications: ['BRCGS', 'Organic', 'Kosher'],
    readinessScore: 92,
    verificationStatus: 'Verified',
    exportReadiness: 'Ready now',
    availableVolume: 'Large scale',
    packagingCapability: 'Flexible',
    targetChannel: 'Ingredient',
    heroImage:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    originStory: {
      en: 'A second-generation Central Valley grower group combining orchard discipline with export program planning.',
      zh: '由中央谷地第二代种植者组成，兼顾果园管理与出口项目规划。',
    },
    overview: {
      en: 'Golden Valley assembles blanching, dicing, flour, and retail-packed almond programs for Chinese ingredient importers and modern retail buyers.',
      zh: 'Golden Valley 为中国配料进口商与现代零售买家提供去皮、切粒、杏仁粉及零售包装方案。',
    },
    formats: ['Kernel', 'Diced', 'Flour', 'Retail pouch'],
    seasonality: ['August harvest', 'Year-round packed inventory'],
    capacity: '9,500 MT annual processing',
    minimumOrder: '1 x 20ft container or 3 MT pilot',
    currentExportMarkets: ['Japan', 'South Korea', 'Vietnam'],
    documentationChecklist: [
      { label: 'Facility audit complete', complete: true },
      { label: 'China-facing labels mapped', complete: true },
      { label: 'Ingredient specification sheet', complete: true },
      { label: 'Pilot order SOP', complete: false },
    ],
    productLines: [
      { name: 'Nonpareil kernels', grade: 'Supreme', format: '10kg carton', season: 'Year-round' },
      { name: 'Almond flour', grade: 'Fine-mill', format: '20kg bag', season: 'Year-round' },
      { name: 'Snack pouches', grade: 'Retail', format: '150g pouch', season: 'Q4 gifting' },
    ],
    privateNotes: {
      en: 'Private: FOB pricing model and reserve inventory windows are shared only in managed opportunity rooms.',
      zh: '私密：FOB 价格模型与预留库存窗口仅在管理式机会协作室内共享。',
    },
    marketingAssets: ['Brand deck PDF', 'Retail pouch render', 'Factory walkthrough clip'],
  },
  {
    id: 'pacific-pistachio-estate',
    name: { en: 'Pacific Pistachio Estate', zh: '太平洋开心果庄园' },
    county: { en: 'Madera County', zh: '马德拉县' },
    products: ['Pistachios'],
    certifications: ['SMETA', 'Halal'],
    readinessScore: 88,
    verificationStatus: 'Verified',
    exportReadiness: 'Pilot ready',
    availableVolume: 'Mid-scale',
    packagingCapability: 'Bulk',
    targetChannel: 'Foodservice',
    heroImage:
      'https://images.unsplash.com/photo-1615485925873-b3f34f0f1cfd?auto=format&fit=crop&w=1200&q=80',
    originStory: {
      en: 'Family-managed orchards focused on premium open-shell pistachios with traceable lot segregation.',
      zh: '家族经营果园，专注高端开口开心果并具备批次追溯分区能力。',
    },
    overview: {
      en: 'Pacific Pistachio supports gifting, hospitality, and airline snack programs with custom roasting and nitrogen-flushed formats.',
      zh: 'Pacific Pistachio 以定制烘焙与充氮包装支持礼赠、酒店及航空零食项目。',
    },
    formats: ['Raw in-shell', 'Roasted salted', 'Nitrogen-flushed canister'],
    seasonality: ['September harvest', 'Gift pack peak in Q4'],
    capacity: '2,800 MT annual export-ready output',
    minimumOrder: '2 MT palletized pilot',
    currentExportMarkets: ['Singapore', 'UAE'],
    documentationChecklist: [
      { label: 'Traceability map', complete: true },
      { label: 'Label translation review', complete: false },
      { label: 'Allergen control SOP', complete: true },
      { label: 'Pallet configuration guide', complete: true },
    ],
    productLines: [
      { name: 'Open-shell premium', grade: 'Jumbo', format: '11.34kg carton', season: 'Sep-Mar' },
      { name: 'Roasted salted', grade: 'Select', format: '500g retail tub', season: 'Year-round' },
    ],
    privateNotes: {
      en: 'Private: Promotional budget for e-commerce launch support is limited to first pilot orders.',
      zh: '私密：电商启动推广预算仅适用于首批试单。',
    },
    marketingAssets: ['Gift-box mockup', 'Roasting profile summary'],
  },
  {
    id: 'sonoma-tide-cellars',
    name: { en: 'Sonoma Tide Cellars', zh: '索诺玛潮汐酒庄' },
    county: { en: 'Sonoma County', zh: '索诺玛县' },
    products: ['Wine'],
    certifications: ['SIP Certified', 'California Sustainable Winegrowing'],
    readinessScore: 85,
    verificationStatus: 'In review',
    exportReadiness: 'Scaling',
    availableVolume: 'Boutique',
    packagingCapability: 'Retail-ready',
    targetChannel: 'Retail',
    heroImage:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    originStory: {
      en: 'A coastal cellar combining estate fruit with hospitality-led storytelling for curated premium placements.',
      zh: '沿海酒庄以自有葡萄和体验式叙事打造精选高端渠道。',
    },
    overview: {
      en: 'Sonoma Tide focuses on bilingual gifting narratives, reserve-case formats, and importer co-marketing for boutique retailers.',
      zh: 'Sonoma Tide 专注双语礼赠叙事、精选箱规和面向精品零售的进口商联合推广。',
    },
    formats: ['750ml glass', 'Gift duo pack'],
    seasonality: ['New vintage release in spring'],
    capacity: '14,000 cases annual capacity',
    minimumOrder: '600 cases pilot',
    currentExportMarkets: ['Hong Kong'],
    documentationChecklist: [
      { label: 'Back-label adaptation', complete: true },
      { label: 'China trademark screening', complete: false },
      { label: 'Market launch assets', complete: true },
    ],
    productLines: [
      { name: 'Chardonnay', grade: 'Reserve', format: '750ml case', season: 'Spring release' },
      { name: 'Pinot Noir', grade: 'Estate', format: '750ml case', season: 'Autumn allocations' },
    ],
    privateNotes: {
      en: 'Private: Distributor margin assumptions are disclosed after channel-fit confirmation.',
      zh: '私密：经确认渠道匹配后才会披露分销商利润假设。',
    },
    marketingAssets: ['Vintage tasting sheet', 'Trade storytelling deck'],
  },
  {
    id: 'sierra-citrus-packers',
    name: { en: 'Sierra Citrus Packers', zh: '内华达山柑橘包装商' },
    county: { en: 'Tulare County', zh: '图莱里县' },
    products: ['Citrus', 'Stone fruit'],
    certifications: ['GlobalG.A.P.', 'PrimusGFS'],
    readinessScore: 90,
    verificationStatus: 'Verified',
    exportReadiness: 'Ready now',
    availableVolume: 'Large scale',
    packagingCapability: 'Retail-ready',
    targetChannel: 'Retail',
    heroImage:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=80',
    originStory: {
      en: 'Integrated packinghouse network shipping citrus and seasonal stone fruit with cold-chain discipline.',
      zh: '一体化包装网络，凭借冷链管理出口柑橘及季节性核果。',
    },
    overview: {
      en: 'Sierra Citrus prepares premium club-store cartons, e-commerce gifting sleeves, and foodservice loose-pack formats.',
      zh: 'Sierra Citrus 可提供会员店纸箱、电商礼盒套及餐饮散装方案。',
    },
    formats: ['4kg gift carton', '10kg export carton', 'Loose pack'],
    seasonality: ['Mandarins Nov-Feb', 'Peaches Jun-Aug'],
    capacity: '160 reefers seasonal throughput',
    minimumOrder: 'One reefer mixed-spec pilot',
    currentExportMarkets: ['Malaysia', 'Indonesia', 'Thailand'],
    documentationChecklist: [
      { label: 'Cold-chain SOP', complete: true },
      { label: 'Retail carton artwork', complete: true },
      { label: 'Reefer data logger process', complete: true },
      { label: 'Port contingency plan', complete: false },
    ],
    productLines: [
      { name: 'Seedless mandarins', grade: 'Premium', format: '4kg gift carton', season: 'Nov-Feb' },
      { name: 'Yellow peaches', grade: 'Select', format: '5kg tray', season: 'Jun-Aug' },
    ],
    privateNotes: {
      en: 'Private: Grower roster and exact cold-room slots remain restricted to qualified opportunities.',
      zh: '私密：种植者名单与冷库时段仅向合格机会开放。',
    },
    marketingAssets: ['Cold-chain flowchart', 'Fruit photography set'],
  },
  {
    id: 'mission-olive-house',
    name: { en: 'Mission Olive House', zh: '使命橄榄之家' },
    county: { en: 'Yolo County', zh: '优洛县' },
    products: ['Olive oil', 'Food ingredients'],
    certifications: ['COOC Certified', 'Non-GMO'],
    readinessScore: 83,
    verificationStatus: 'Verified',
    exportReadiness: 'Pilot ready',
    availableVolume: 'Mid-scale',
    packagingCapability: 'Flexible',
    targetChannel: 'Foodservice',
    heroImage:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80',
    originStory: {
      en: 'An inland mill translating California extra virgin olive oil into chef-ready and gifting-oriented programs.',
      zh: '内陆榨油厂将加州特级初榨橄榄油转化为厨师渠道与礼赠项目。',
    },
    overview: {
      en: 'Mission Olive House blends single-estate storytelling with foodservice tins and sampler bottles for premium buyers.',
      zh: 'Mission Olive House 结合单一庄园故事与餐饮大罐、试饮小瓶满足高端买家需求。',
    },
    formats: ['500ml glass', '3L tin', '250ml gift trio'],
    seasonality: ['October crush', 'Holiday gift focus'],
    capacity: '280,000 liters annual milling',
    minimumOrder: '1,200 cases mixed SKU pilot',
    currentExportMarkets: ['Taiwan'],
    documentationChecklist: [
      { label: 'Sensory panel certificate', complete: true },
      { label: 'Label localization check', complete: false },
      { label: 'Chef demo plan', complete: true },
    ],
    productLines: [
      { name: 'Estate extra virgin', grade: 'Premium', format: '500ml glass', season: 'Fresh crush' },
      { name: 'Restaurant blend', grade: 'Chef', format: '3L tin', season: 'Year-round' },
    ],
    privateNotes: {
      en: 'Private: Sampling budget and preferred distributor short list are shared only after NDA acknowledgement.',
      zh: '私密：样品预算与优先分销名单仅在确认保密要求后共享。',
    },
    marketingAssets: ['Mill photography library', 'Chef pairing sheet'],
  },
]

export const buyerRequests: BuyerRequest[] = [
  {
    id: 'br-101',
    buyerName: { en: 'Jade Harbor Import Group', zh: '玉港进口集团' },
    buyerType: { en: 'Premium retail distributor', zh: '高端零售分销商' },
    productNeeded: 'Almonds',
    intendedUse: { en: 'Premium snack and gifting assortment', zh: '高端零食与礼赠组合' },
    region: 'Shanghai',
    volume: '18 MT initial pilot + festival replenishment',
    targetTiming: 'Golden Week launch',
    certifications: ['Organic', 'BRCGS'],
    packagingNeeds: '150g bilingual pouch with gift-ready outer case',
    status: 'Matching',
    channel: 'Retail',
    orderSize: 'Program',
    summary: {
      en: 'Buyer seeks a polished California almond story with bilingual packaging and controlled replenishment cadence.',
      zh: '买家希望获得具备加州产地故事、双语包装和稳定补货节奏的杏仁项目。',
    },
    verificationNotes: {
      en: 'Verified importer with national premium retail footprint and cold-season gifting calendar.',
      zh: '已验证进口商，覆盖全国高端零售网络并具备节礼销售周期。',
    },
    requirements: [
      { label: { en: 'Price lane', zh: '目标价格带' }, value: 'Premium mid-tier gifting' },
      { label: { en: 'Launch cities', zh: '首发城市' }, value: 'Shanghai, Hangzhou, Suzhou' },
      { label: { en: 'Localization ask', zh: '本地化要求' }, value: 'Bilingual wellness callouts + origin map' },
    ],
    matches: [
      {
        exporterId: 'golden-valley-almonds',
        matchPercent: 95,
        explanation: {
          en: 'Existing retail pouch capability and organic certification align closely with the gifting brief.',
          zh: '现有零售小袋能力及有机认证与礼赠需求高度匹配。',
        },
      },
      {
        exporterId: 'mission-olive-house',
        matchPercent: 58,
        explanation: {
          en: 'Strong storytelling and gifting sensibility, but product adjacency is better suited for bundle add-ons.',
          zh: '叙事与礼赠能力较强，但更适合作为组合附加品类。',
        },
      },
    ],
  },
  {
    id: 'br-102',
    buyerName: { en: 'Pearl River Culinary Supply', zh: '珠江餐饮供应链' },
    buyerType: { en: 'Foodservice importer', zh: '餐饮进口商' },
    productNeeded: 'Olive oil',
    intendedUse: { en: 'Mediterranean casual dining program', zh: '地中海休闲餐饮项目' },
    region: 'Guangzhou',
    volume: '1,500 cases per quarter',
    targetTiming: 'Q1 menu reset',
    certifications: ['Non-GMO'],
    packagingNeeds: '3L tins plus chef sampler bottles',
    status: 'Qualified',
    channel: 'Foodservice',
    orderSize: 'Container',
    summary: {
      en: 'Regional foodservice buyer requests dependable chef-format olive oil with training support.',
      zh: '区域餐饮买家需要稳定的大厨规格橄榄油并配套培训支持。',
    },
    verificationNotes: {
      en: 'Financial and import documentation verified; onboarding plan includes chef tastings.',
      zh: '财务及进口资料已核验，导入计划包含厨师品鉴。',
    },
    requirements: [
      { label: { en: 'Channel focus', zh: '渠道重点' }, value: 'Mediterranean casual + boutique hotel kitchens' },
      { label: { en: 'Preferred format', zh: '首选规格' }, value: '3L tins with 250ml trial bottles' },
      { label: { en: 'Support ask', zh: '支持需求' }, value: 'Pairing notes and training translator' },
    ],
    matches: [
      {
        exporterId: 'mission-olive-house',
        matchPercent: 93,
        explanation: {
          en: 'Chef-format tins and sampler sets already exist, reducing launch friction.',
          zh: '现有大厨规格与试用套装可显著降低导入摩擦。',
        },
      },
    ],
  },
  {
    id: 'br-103',
    buyerName: { en: 'Blue Bay Cross-Border', zh: '蓝湾跨境电商' },
    buyerType: { en: 'Cross-border e-commerce operator', zh: '跨境电商运营商' },
    productNeeded: 'Pistachios',
    intendedUse: { en: 'Festival gifting and livestream drops', zh: '节日礼盒与直播活动' },
    region: 'Shenzhen',
    volume: '6 MT pilot',
    targetTiming: 'Singles Day preheat',
    certifications: ['Halal'],
    packagingNeeds: '500g canister + limited-edition gift sleeve',
    status: 'Sampling',
    channel: 'E-commerce',
    orderSize: 'Pilot',
    summary: {
      en: 'Buyer wants visually striking gifting pistachios with social-commerce launch timing.',
      zh: '买家希望获得适合社交电商节奏、视觉突出的礼赠开心果。',
    },
    verificationNotes: {
      en: 'Verified online operator with bonded warehouse capability and livestream KOL calendar.',
      zh: '已验证电商运营商，具备保税仓能力及直播达人排期。',
    },
    requirements: [
      { label: { en: 'Demand trigger', zh: '需求触发因素' }, value: 'Singles Day gifting and livestream bundles' },
      { label: { en: 'Brand ask', zh: '品牌诉求' }, value: 'Premium California orchard story' },
      { label: { en: 'Pilot KPI', zh: '试单指标' }, value: 'Sell-through within 30 days' },
    ],
    matches: [
      {
        exporterId: 'pacific-pistachio-estate',
        matchPercent: 97,
        explanation: {
          en: 'Gifting formats and nitrogen-flushed packaging are already aligned with the campaign.',
          zh: '礼赠包装与充氮保鲜方案已与活动需求高度契合。',
        },
      },
    ],
  },
  {
    id: 'br-104',
    buyerName: { en: 'Northlight Fresh Retail', zh: '北光生鲜零售' },
    buyerType: { en: 'Regional premium grocer', zh: '区域高端生鲜零售商' },
    productNeeded: 'Citrus',
    intendedUse: { en: 'Winter premium fruit program', zh: '冬季精品水果项目' },
    region: 'Beijing',
    volume: '4 reefers seasonal',
    targetTiming: 'Lunar New Year',
    certifications: ['GlobalG.A.P.', 'PrimusGFS'],
    packagingNeeds: 'Gift cartons plus club-store larger pack',
    status: 'Negotiation',
    channel: 'Retail',
    orderSize: 'Program',
    summary: {
      en: 'Buyer is preparing a premium citrus window for gifting and everyday premium fruit merchandising.',
      zh: '买家正在筹备兼顾礼赠与日常陈列的高端柑橘档期。',
    },
    verificationNotes: {
      en: 'Buyer has stable reefer import lanes and premium produce merchandising history.',
      zh: '买家具备稳定冷藏进口线路及高端果蔬陈列经验。',
    },
    requirements: [
      { label: { en: 'Merchandising need', zh: '陈列需求' }, value: 'Gift-ready and club-size dual assortment' },
      { label: { en: 'Logistics focus', zh: '物流重点' }, value: 'Temperature loggers and reefer contingency' },
      { label: { en: 'Quality ask', zh: '质量要求' }, value: 'Consistent sugar-acid balance' },
    ],
    matches: [
      {
        exporterId: 'sierra-citrus-packers',
        matchPercent: 96,
        explanation: {
          en: 'Existing reefer discipline and dual-format packaging map directly to the brief.',
          zh: '现有冷链纪律及双规格包装与需求直接对应。',
        },
      },
    ],
  },
]

export const summaryCards = [
  { labelKey: 'activeOpportunities', value: '14', change: '+3 this week' },
  { labelKey: 'samplesInTransit', value: '8', change: '2 landed today' },
  { labelKey: 'complianceReviews', value: '5', change: '1 label review pending' },
  { labelKey: 'pilotOrders', value: '3', change: '1 shipping prep' },
  { labelKey: 'tasksDue', value: '12', change: '4 due within 48h' },
] as const

export const recentActivity: ActivityItem[] = [
  {
    id: 'activity-1',
    title: { en: 'Gift pouch artwork approved', zh: '礼赠小袋包装已确认' },
    detail: { en: 'Jade Harbor cleared bilingual copy for Golden Valley pilot packs.', zh: '玉港已确认 Golden Valley 试单包装双语文案。' },
    time: '12 min ago',
    tone: 'success',
  },
  {
    id: 'activity-2',
    title: { en: 'Sample reefer booking updated', zh: '样品冷链订舱已更新' },
    detail: { en: 'Sierra Citrus shifted handoff to preserve shelf-life cushion.', zh: 'Sierra Citrus 调整交接时间以保留货架期缓冲。' },
    time: '48 min ago',
    tone: 'info',
  },
  {
    id: 'activity-3',
    title: { en: 'Trademark adviser requested shortlist', zh: '商标顾问请求候选清单' },
    detail: { en: 'Sonoma Tide is preparing importer naming options for China screening.', zh: 'Sonoma Tide 正准备供中国检索的命名候选项。' },
    time: '2 hr ago',
    tone: 'warning',
  },
]

export const opportunityPipeline: OpportunityCard[] = [
  {
    id: 'opp-1',
    title: { en: 'Jade Harbor almond gifting', zh: '玉港杏仁礼赠项目' },
    buyer: 'Jade Harbor Import Group',
    exporter: 'Golden Valley Almond Collective',
    stage: 'Match',
    dueDate: 'Sep 8',
    value: 'US$168k',
  },
  {
    id: 'opp-2',
    title: { en: 'Blue Bay pistachio livestream', zh: '蓝湾开心果直播项目' },
    buyer: 'Blue Bay Cross-Border',
    exporter: 'Pacific Pistachio Estate',
    stage: 'Sample',
    dueDate: 'Sep 11',
    value: 'US$74k',
  },
  {
    id: 'opp-3',
    title: { en: 'Northlight winter citrus', zh: '北光冬季柑橘项目' },
    buyer: 'Northlight Fresh Retail',
    exporter: 'Sierra Citrus Packers',
    stage: 'Prepare',
    dueDate: 'Sep 15',
    value: 'US$220k',
  },
  {
    id: 'opp-4',
    title: { en: 'Pearl River chef olive oil', zh: '珠江厨师橄榄油项目' },
    buyer: 'Pearl River Culinary Supply',
    exporter: 'Mission Olive House',
    stage: 'Qualify',
    dueDate: 'Sep 6',
    value: 'US$96k',
  },
  {
    id: 'opp-5',
    title: { en: 'Sonoma reserve gifting', zh: '索诺玛臻选礼赠项目' },
    buyer: 'Harbor Crest Wine Shops',
    exporter: 'Sonoma Tide Cellars',
    stage: 'Pilot order',
    dueDate: 'Sep 23',
    value: 'US$188k',
  },
  {
    id: 'opp-6',
    title: { en: 'Holiday almond refill', zh: '节日杏仁补货项目' },
    buyer: 'Jade Harbor Import Group',
    exporter: 'Golden Valley Almond Collective',
    stage: 'Grow',
    dueDate: 'Oct 2',
    value: 'US$244k',
  },
]

export const deadlines: DeadlineItem[] = [
  { id: 'deadline-1', title: { en: 'Approve sample label translation', zh: '确认样品标签翻译' }, due: 'Sep 5', owner: 'Tri-Stone PM' },
  { id: 'deadline-2', title: { en: 'Upload reefer contingency note', zh: '上传冷链应急说明' }, due: 'Sep 6', owner: 'Sierra Citrus' },
  { id: 'deadline-3', title: { en: 'Finalize pilot order checklist', zh: '完成试单清单' }, due: 'Sep 9', owner: 'Golden Valley' },
]

export const meetings: MeetingItem[] = [
  { id: 'meeting-1', title: { en: 'Buyer packaging review', zh: '买家包装评审' }, time: 'Sep 4 · 10:00 PST', attendees: 'Jade Harbor · Golden Valley · Tri-Stone' },
  { id: 'meeting-2', title: { en: 'Cold-chain handoff rehearsal', zh: '冷链交接演练' }, time: 'Sep 6 · 14:30 PST', attendees: 'Sierra Citrus · Pacific Freight · Tri-Stone' },
  { id: 'meeting-3', title: { en: 'Chef sampler training brief', zh: '厨师样品培训简报' }, time: 'Sep 8 · 18:00 CST', attendees: 'Pearl River · Mission Olive House' },
]

export const dealRoom: DealRoom = {
  id: 'dr-001',
  title: { en: 'Jade Harbor x Golden Valley Pilot Room', zh: '玉港 × 金谷试单协作室' },
  summary: {
    en: 'Managed opportunity room for almond gifting pilot covering packaging, samples, compliance prep, and launch coordination.',
    zh: '围绕杏仁礼赠试单的管理式机会协作室，覆盖包装、样品、合规准备与上市协调。',
  },
  participants: [
    { name: 'Tri-Stone PM', role: { en: 'Opportunity manager', zh: '机会经理' }, side: 'Partner' },
    { name: 'Jade Harbor Import Group', role: { en: 'Verified buyer', zh: '已验证买家' }, side: 'Buyer' },
    { name: 'Golden Valley Almond Collective', role: { en: 'Verified exporter', zh: '已验证出口商' }, side: 'Exporter' },
    { name: 'Pacific Freight Advisory', role: { en: 'Freight partner', zh: '货运伙伴' }, side: 'Partner' },
  ],
  sampleStage: 'Sample',
  sampleSteps: [
    { label: 'Requested', complete: true },
    { label: 'Shipped', complete: true },
    { label: 'Received', complete: false },
    { label: 'Reviewed', complete: false },
    { label: 'Approved', complete: false },
  ],
  timeline: [
    { label: 'Match confirmed', complete: true },
    { label: 'Commercial pack alignment', complete: true },
    { label: 'Pilot PO draft', complete: false },
    { label: 'Shipment booking', complete: false },
  ],
  messages: [
    {
      sender: 'Tri-Stone PM',
      role: 'Partner',
      body: {
        en: 'Sample cartons cleared final bilingual callouts. Tracking details are now visible in the Samples tab.',
        zh: '样品纸箱已确认最终双语卖点，追踪信息现已在“样品”标签页显示。',
      },
      time: '09:15 PST',
    },
    {
      sender: 'Jade Harbor',
      role: 'Buyer',
      body: {
        en: 'Please keep the outer case matte and include a small California origin map for gifting storytelling.',
        zh: '请保持外箱哑光处理，并加入小型加州产地图示以增强礼赠故事感。',
      },
      time: '01:40 CST',
    },
    {
      sender: 'Golden Valley',
      role: 'Exporter',
      body: {
        en: 'Confirmed. Updated pouch render and nutrition panel draft have been uploaded for review.',
        zh: '已确认。更新后的袋型效果图和营养成分草稿已上传供审阅。',
      },
      time: '10:02 PST',
    },
  ],
  specifications: [
    { label: 'Pilot SKU', value: '150g roasted almond pouch' },
    { label: 'Outer case', value: '12 retail pouches per gift-ready carton' },
    { label: 'Shelf life', value: '12 months ambient' },
    { label: 'Localization', value: 'Bilingual nutrition panel + origin map insert' },
  ],
  documents: [
    { name: 'Commercial invoice', status: 'Ready' },
    { name: 'Packing list', status: 'Ready' },
    { name: 'Certificate of origin', status: 'Pending' },
    { name: 'Phytosanitary certificate', status: 'Pending' },
    { name: 'Labeling approval', status: 'Ready' },
    { name: 'Bill of lading', status: 'Private' },
    { name: 'Insurance', status: 'Pending' },
  ],
  tasks: [
    { name: 'Confirm translated callouts', owner: 'Jade Harbor', due: 'Sep 5', done: true },
    { name: 'Upload pilot PO draft', owner: 'Tri-Stone PM', due: 'Sep 7', done: false },
    { name: 'Reserve vessel space', owner: 'Pacific Freight Advisory', due: 'Sep 9', done: false },
  ],
  terms: [
    { label: 'Incoterm', value: 'FOB Oakland (draft)' },
    { label: 'Pilot volume', value: '18 MT' },
    { label: 'Commercial sensitivity', value: 'Restricted to approved participants' },
  ],
  shipment: [
    { label: 'Origin', value: 'Oakland consolidation' },
    { label: 'Destination', value: 'Shanghai bonded intake' },
    { label: 'Temperature requirement', value: 'Ambient, humidity-managed' },
    { label: 'Current milestone', value: 'Sample cartons departed pack facility' },
  ],
}

export const partners: Partner[] = [
  {
    id: 'partner-1',
    name: 'Pacific Freight Advisory',
    specialty: { en: 'Freight forwarder', zh: '货运代理' },
    services: ['Ocean booking', 'Consolidation', 'Cargo visibility'],
    regions: ['West Coast', 'East China'],
    languages: ['English', '中文'],
    verified: true,
    description: {
      en: 'Supports pilot-order scheduling and reefer coordination for agricultural shipments.',
      zh: '为农产品项目提供试单排期与冷链协调支持。',
    },
  },
  {
    id: 'partner-2',
    name: 'Golden Gate Customs Support',
    specialty: { en: 'Customs broker', zh: '报关服务商' },
    services: ['Documentation review', 'Entry planning', 'Tariff mapping'],
    regions: ['California', 'National U.S. ports'],
    languages: ['English', '中文'],
    verified: true,
    description: {
      en: 'Helps participants prepare customs-facing paperwork without representing itself as a regulator.',
      zh: '协助参与方准备面向报关的资料，但并不以监管机构身份出现。',
    },
  },
  {
    id: 'partner-3',
    name: 'Sierra Cold Chain Network',
    specialty: { en: 'Cold-chain operator', zh: '冷链运营商' },
    services: ['Pre-cool staging', 'Temperature logging', 'Port drayage'],
    regions: ['Central Valley', 'Los Angeles'],
    languages: ['English'],
    verified: true,
    description: {
      en: 'Coordinates cold handling windows for fruit and temperature-sensitive packaged goods.',
      zh: '协调水果及温敏包装产品的冷处理窗口。',
    },
  },
  {
    id: 'partner-4',
    name: 'Harbor Label Studio',
    specialty: { en: 'Localization agency', zh: '本地化机构' },
    services: ['Bilingual packaging', 'Claims review', 'Retail copy adaptation'],
    regions: ['Shanghai', 'Shenzhen', 'California'],
    languages: ['English', '中文'],
    verified: true,
    description: {
      en: 'Supports packaging tone, localization, and in-store merchandising copy.',
      zh: '支持包装语气、本地化及店内陈列文案。',
    },
  },
  {
    id: 'partner-5',
    name: 'Valley Regulatory Advisory',
    specialty: { en: 'Regulatory adviser', zh: '法规顾问' },
    services: ['Requirement mapping', 'Label guidance', 'Process checklists'],
    regions: ['U.S.', 'China'],
    languages: ['English', '中文'],
    verified: true,
    description: {
      en: 'Provides practical requirement mapping while reminding users to confirm final obligations with qualified professionals.',
      zh: '提供实务要求梳理，同时提醒用户最终义务需由合格专业人士确认。',
    },
  },
  {
    id: 'partner-6',
    name: 'Pacific Origin Labs',
    specialty: { en: 'Testing lab', zh: '检测实验室' },
    services: ['Shelf-life testing', 'Residue screens', 'Specification validation'],
    regions: ['Northern California'],
    languages: ['English', '中文'],
    verified: true,
    description: {
      en: 'Runs pilot-batch testing and format-specific specification checks.',
      zh: '执行试批检测与规格验证。',
    },
  },
  {
    id: 'partner-7',
    name: 'Crescent Mark IP',
    specialty: { en: 'Trademark attorney', zh: '商标律师' },
    services: ['Brand screening', 'Filing coordination', 'Naming strategy'],
    regions: ['California', 'China'],
    languages: ['English', '中文'],
    verified: false,
    description: {
      en: 'Shortlisted legal partner for naming and brand-protection work during premium product launches.',
      zh: '在高端产品上市时负责命名与品牌保护工作的候选法律伙伴。',
    },
  },
  {
    id: 'partner-8',
    name: 'Harbor Trade Finance Desk',
    specialty: { en: 'Trade-finance provider', zh: '贸易金融服务商' },
    services: ['Working capital', 'Credit review', 'Receivables planning'],
    regions: ['Hong Kong', 'Shanghai', 'California'],
    languages: ['English', '中文'],
    verified: true,
    description: {
      en: 'Supports pilot-order working capital discussions for qualified participants.',
      zh: '为合格参与方提供试单营运资金讨论支持。',
    },
  },
]

export const interestByCategory: MarketInsight[] = [
  { label: 'Almonds', value: 82, note: { en: 'Strong gifting and wellness demand.', zh: '礼赠与健康消费需求强劲。' } },
  { label: 'Citrus', value: 74, note: { en: 'High winter premium fruit interest.', zh: '冬季高端水果兴趣较高。' } },
  { label: 'Olive oil', value: 63, note: { en: 'Chef-led education still matters.', zh: '仍需依赖厨师教育导入。' } },
  { label: 'Wine', value: 58, note: { en: 'Storytelling and channel selection are decisive.', zh: '叙事与渠道选择决定成败。' } },
  { label: 'Pistachios', value: 69, note: { en: 'Social commerce lifts conversion.', zh: '社交电商提升转化。' } },
]

export const interestByRegion: MarketInsight[] = [
  { label: 'Shanghai', value: 78, note: { en: 'Premium retail remains receptive to California provenance.', zh: '高端零售仍看重加州产地。' } },
  { label: 'Guangzhou', value: 71, note: { en: 'Foodservice formats need training support.', zh: '餐饮渠道规格需要培训支持。' } },
  { label: 'Shenzhen', value: 75, note: { en: 'Cross-border launches move quickly with gifting hooks.', zh: '具备礼赠卖点的跨境项目推进更快。' } },
  { label: 'Beijing', value: 67, note: { en: 'Quality consistency is critical for winter fruit.', zh: '冬季水果尤其看重品质稳定性。' } },
]

export const interestByChannel: MarketInsight[] = [
  { label: 'Premium retail', value: 81, note: { en: 'Most responsive to packaging polish.', zh: '对包装精致度最敏感。' } },
  { label: 'Foodservice', value: 66, note: { en: 'Requires chef-ready formats and demos.', zh: '需要适合厨师使用的规格与演示。' } },
  { label: 'E-commerce', value: 73, note: { en: 'Fast-moving if visual storytelling is strong.', zh: '视觉叙事强则推进迅速。' } },
  { label: 'Ingredient', value: 62, note: { en: 'Specification discipline drives repeat orders.', zh: '规格纪律决定复购。' } },
]

export const barriers: MarketInsight[] = [
  { label: 'Label localization', value: 68, note: { en: 'Most common friction point during pilot prep.', zh: '试单准备阶段最常见阻力。' } },
  { label: 'MOQ alignment', value: 55, note: { en: 'Mid-size buyers often need pilot-friendly packaging.', zh: '中型买家常需要更友好的试单起订量。' } },
  { label: 'Cold-chain confidence', value: 44, note: { en: 'Fresh categories need reefer transparency.', zh: '生鲜品类需要更透明的冷链信息。' } },
  { label: 'Trademark timing', value: 37, note: { en: 'Premium gifting projects often screen names late.', zh: '高端礼赠项目常较晚进行商标检索。' } },
]

export const observations: Observation[] = [
  {
    title: { en: 'Packaging', zh: '包装' },
    detail: { en: 'Gift-ready outer cases and bilingual wellness cues improve buyer confidence faster than broad SKU expansion.', zh: '礼赠外箱与双语健康卖点比盲目扩 SKU 更能快速提升买家信心。' },
  },
  {
    title: { en: 'Pricing', zh: '定价' },
    detail: { en: 'Managed pilot orders perform best when pricing ladders are tied to a clear replenishment path rather than a one-off discount.', zh: '当价格梯度与明确补货路径绑定时，管理式试单表现优于一次性折扣。' },
  },
  {
    title: { en: 'Labeling', zh: '标签' },
    detail: { en: 'Early label review shortens pilot-order prep and reduces back-and-forth near shipment windows.', zh: '尽早审看标签可缩短试单准备周期，减少临近发运时的反复。' },
  },
  {
    title: { en: 'Localization', zh: '本地化' },
    detail: { en: 'China-facing storytelling works best when California origin is translated into gifting, wellness, or culinary relevance for the target channel.', zh: '面向中国市场的加州故事应转化为礼赠、健康或烹饪场景价值。' },
  },
  {
    title: { en: 'Buyer demand', zh: '买家需求' },
    detail: { en: 'Verified buyers increasingly want managed introductions, private document exchange, and pilot-order discipline instead of open-market browsing.', zh: '已验证买家越来越重视管理式引荐、私密文件交换与试单节奏，而非开放式浏览。' },
  },
]
