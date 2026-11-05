export interface TranslationMap {
  appName: string;
  oneLinePromise: string;
  tagline: string;
  navDashboard: string;
  navRiskPanel: string;
  navRouting: string;
  navAbout: string;
  mainActionButton: string;
  mainActionDispatching: string;
  dispatchCorridors: string;
  dispatching: string;
  municipalCommandTag: string;
  quickFilter: string;
  allWards: string;
  highRiskOnly: string;
  impassableOnly: string;
  searchPlaceholder: string;
  quickSearchLabel: string;
  clearSearch: string;
  filterByRisk: string;
  showingWards: string;
  ofWards: string;
  wardsCount: string;
  logHazard: string;
  waterDepth: string;
  rainfall: string;
  elevation: string;
  status: string;
  hazard: string;
  actionRequired: string;
  clearMyData: string;
  bookDemo: string;
  sampleBadge: string;
  liveFeed: string;
  corridorGenerated: string;
  dispatchedToTeams: string;
  emergencyAlert: string;
  statsDemosBooked: string;
  statsIngestionLatency: string;
  statsUptime: string;
  hudhudFact: string;
  coastlineFact: string;
  flashFloodFact: string;
  ourPitch: string;
  whyItMatters: string;
  differentiator: string;
  gisTitle: string;
  gisSubtitle: string;
  wardStatusRegistry: string;
  simulateAiRoute: string;
  depthLabel: string;
  rainRateLabel: string;
  elevationLabel: string;
  corridorLabel: string;
  hudhudBenchmark: string;
  coastalExposure: string;
  urbanChokepoints: string;
  sourceNDMA: string;
  sourceAPSDMA: string;
  sourceHindu: string;
  floodHeatmap: string;
  corridors: string;
  elevationToggle: string;
  hazardCode: string;
  impassableLegend: string;
  activeWaterloggingLegend: string;
  cautionLegend: string;
  clearLegend: string;
  safeCorridorLegend: string;
  assignedCorridor: string;
  drainSaturation: string;
  multiSourceEngine: string;
  realTimeTelemetry: string;
  sensorSubtitle: string;
  triggerIngestionBatch: string;
  ingestingFeeds: string;
  activeSensorFeeds: string;
  refreshInterval: string;
  predictiveSim: string;
  simSubtitle: string;
  stormSurgeLabel: string;
  siltBlockageLabel: string;
  predictedExposure: string;
  predictedInundation: string;
  wardsUnderThreat: string;
  geminiPathfinder: string;
  automatedSafeEvacuation: string;
  routingSubtitle: string;
  quickPresets: string;
  incidentParameters: string;
  fedDirectlyToAI: string;
  targetWard: string;
  wardDrainageFreeboard: string;
  drainageNormal: string;
  drainageElevated: string;
  drainageCritical: string;
  windSpeedLabel: string;
  coastalSurgeMsl: string;
  avoidKothavalasa: string;
  avoidUnderpassDesc: string;
  runGeminiPathfinder: string;
  computingPathfinder: string;
  aiGuidanceCards: string;
  tryAgain: string;
  oneLineSummaryLabel: string;
  keyFindingsLabel: string;
  aboutTitle: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
  usersTitle: string;
  usersDesc: string;
  pricingTitle: string;
  annualFee: string;
  priceValue: string;
  perYearPerCity: string;
  pricingPayerDesc: string;
  teamTitle: string;
  teamLocation: string;
  bookDemoTitle: string;
  officerName: string;
  authority: string;
  officialEmail: string;
  submitDemoRequest: string;
  localDataStorage: string;
  clearDataDesc: string;
  confirmReset: string;
  cancel: string;
  resetDialogTitle: string;
  resetDialogDesc: string;
  protocolAlpha: string;
  acknowledgedClose: string;
  footerEngineered: string;
  footerCity: string;
  targetMet: string;
  offlineBannerTitle: string;
  offlineBannerDesc: string;
  offlineErrorTitle: string;
  offlineErrorDesc: string;
  aiFailTitle: string;
  aiFailFriendlyDesc: string;
  loadBackupRoute: string;
  simulateAiFailureBtn: string;
  reconnectingAI: string;
  networkOfflineBadge: string;
}

export const translations: Record<'en' | 'te', TranslationMap> = {
  en: {
    appName: 'RescuNetAI',
    oneLinePromise: 'Real-time spatial intelligence and dynamic evacuation routing for municipal disaster command centers.',
    tagline: 'Visakhapatnam Municipal Corporation (GVMC) & APSDMA Operations',
    navDashboard: 'Command Dashboard',
    navRiskPanel: 'Sensor Ingestion & Risk',
    navRouting: 'Dynamic Routing Engine',
    navAbout: 'About & Municipal Licensing',
    mainActionButton: 'Generate and dispatch verified street-level evacuation routes for high-risk coastal wards',
    mainActionDispatching: 'Computing dynamic hydrological corridors...',
    dispatchCorridors: 'Dispatch Corridors',
    dispatching: 'Dispatching...',
    municipalCommandTag: 'GVMC Municipal Command',
    quickFilter: 'Filter Wards',
    allWards: 'All Wards',
    highRiskOnly: 'High Risk / Severe',
    impassableOnly: 'Impassable Only',
    searchPlaceholder: 'Search wards by name or risk level (e.g. MVP, Critical, High, Low)...',
    quickSearchLabel: 'Quick Search Wards (by Name or Risk Level)',
    clearSearch: 'Clear Search',
    filterByRisk: 'Filter by Risk Level / Hotspot:',
    showingWards: 'Showing',
    ofWards: 'of',
    wardsCount: 'wards',
    logHazard: 'Log Hazard',
    waterDepth: 'Water Depth',
    rainfall: 'Rainfall Intensity',
    elevation: 'Elevation Above MSL',
    status: 'Operational Status',
    hazard: 'Active Hazard',
    actionRequired: 'Tactical Action',
    clearMyData: 'Clear my data',
    bookDemo: 'Book Municipal Demo',
    sampleBadge: 'Sample',
    liveFeed: 'Live Municipal Ingestion Stream',
    corridorGenerated: 'Emergency Corridor Verified',
    dispatchedToTeams: 'Dispatched to GVMC Quick Response Field Units',
    emergencyAlert: 'Coastal Alert Status',
    statsDemosBooked: 'Municipal Demos Booked',
    statsIngestionLatency: 'Data Ingestion Latency',
    statsUptime: 'Platform Uptime (Stress Testing)',
    hudhudFact: 'Cyclone Hudhud caused over ₹60,000 crores in damages in Vizag (NDMA)',
    coastlineFact: 'AP has 974 km of vulnerable coastline (APSDMA)',
    flashFloodFact: 'Urban flash floods regularly block arterial Vizag roads (The Hindu)',
    ourPitch: 'RescuNetAI is a B2G spatial intelligence platform that plugs into municipal command centers to transform live weather streams into predictive, street-level safe evacuation routes.',
    whyItMatters: 'Why It Matters',
    differentiator: 'None of them combine predictive street-level hazard modeling with dynamic, hazard-avoiding routing tailored to individual neighborhoods during a crisis.',
    gisTitle: 'Visakhapatnam Municipal Ward Operations GIS',
    gisSubtitle: 'Interactive spatial view with Bay of Bengal coastline, Kailasagiri ridge, and active inundation overlays',
    wardStatusRegistry: 'Ward Status Registry',
    simulateAiRoute: 'Simulate AI Route',
    depthLabel: 'Depth:',
    rainRateLabel: 'Rain:',
    elevationLabel: 'Elev:',
    corridorLabel: 'Corridor:',
    hudhudBenchmark: 'Cyclone Hudhud Benchmark',
    coastalExposure: 'Coastal Exposure',
    urbanChokepoints: 'Urban Chokepoints',
    sourceNDMA: 'Source: National Disaster Management Authority (NDMA)',
    sourceAPSDMA: 'Source: Andhra Pradesh State Disaster Management Authority (APSDMA)',
    sourceHindu: 'Source: Municipal Inundation Records & The Hindu',
    floodHeatmap: 'Flood Heatmap',
    corridors: 'Corridors',
    elevationToggle: 'Elevation',
    hazardCode: 'Hazard Code:',
    impassableLegend: 'Impassable / Critical',
    activeWaterloggingLegend: 'Active Waterlogging',
    cautionLegend: 'Caution / Monitored',
    clearLegend: 'Clear / Open',
    safeCorridorLegend: 'Safe Corridor',
    assignedCorridor: 'Assigned Corridor:',
    drainSaturation: 'Drain Saturation',
    multiSourceEngine: 'Multi-Source Hydrological Ingestion Engine',
    realTimeTelemetry: 'Visakhapatnam Real-Time Telemetry',
    sensorSubtitle: 'Ingesting Doppler radar reflectivity, IoT ultrasonic culverts, INCOIS ocean surge buoys, and river stage gauges.',
    triggerIngestionBatch: 'Trigger < 30s Ingestion Batch',
    ingestingFeeds: 'Ingesting Feeds...',
    activeSensorFeeds: 'Active Sensor Feeds',
    refreshInterval: 'Refresh Interval: 1.5s',
    predictiveSim: 'Predictive Hydrological Simulation',
    simSubtitle: 'Adjust multi-source rainfall and surge conditions to predict real-time urban runoff and simulate flood inundation across Visakhapatnam coastal catchment basins.',
    stormSurgeLabel: 'Astronomical Storm Surge:',
    siltBlockageLabel: 'Storm Drain Silt/Debris Blockage:',
    predictedExposure: 'Predicted Municipal Exposure (Next 60 Minutes)',
    predictedInundation: 'Predicted Inundation',
    wardsUnderThreat: 'Wards Under Threat',
    geminiPathfinder: 'Gemini 3.8 Flash Spatial Pathfinder',
    automatedSafeEvacuation: 'Automated Safe Evacuation Pathfinder',
    routingSubtitle: 'Computes continuous flood inundation depths and generates dynamic, street-level detour corridors bypassing blocked underpasses and submerged arterial roads.',
    quickPresets: 'Quick Incident Presets:',
    incidentParameters: 'Multi-Source Incident Parameters',
    fedDirectlyToAI: 'Fed directly to Gemini AI hydrological pathfinder',
    targetWard: 'Target Visakhapatnam Ward / Coastal Pocket',
    wardDrainageFreeboard: 'Ward Storm Drainage Freeboard Level:',
    drainageNormal: 'Normal (Drainage functioning smoothly)',
    drainageElevated: 'Elevated (75% capacity utilized)',
    drainageCritical: 'Critical (Culverts choked / Silt backflow)',
    windSpeedLabel: 'Sustained Wind Speed (km/h):',
    coastalSurgeMsl: 'Coastal Storm Surge (Meters above MSL):',
    avoidKothavalasa: 'Avoid Kothavalasa Underpass',
    avoidUnderpassDesc: 'Enforce dynamic detour routing around blocked underpass',
    runGeminiPathfinder: 'Run Gemini 3.8 Spatial Pathfinder',
    computingPathfinder: 'Computing Hydrological AI Pathfinder...',
    aiGuidanceCards: 'AI Spatial Intelligence Cards',
    tryAgain: 'Try Again',
    oneLineSummaryLabel: 'One-Line Summary:',
    keyFindingsLabel: 'Key Operational Findings (3 Bullet Points):',
    aboutTitle: 'About RescuNetAI & Team NOVIX',
    problemTitle: 'The Problem It Solves',
    problemDesc: 'Coastal urban residents in Visakhapatnam suffer delayed evacuations and severe property damage because municipal disaster management lacks real-time, street-level hazard mapping and dynamic routing capabilities.',
    solutionTitle: 'Our Solution',
    solutionDesc: 'For municipal disaster response teams in Vizag who struggle with reactive coordination during floods and cyclones, RescuNetAI is a B2G spatial intelligence platform that converts multi-source hazard inputs into real-time damage predictions and optimized evacuation corridors.',
    usersTitle: 'End Users',
    usersDesc: 'Coastal and low-lying residents in Visakhapatnam (including MVP Colony, Jodugulla Palem, Pamarru, Rushikonda, and Old Town coastal belts) and municipal frontline response coordinators.',
    pricingTitle: 'Who Pays Later: Municipal Licensing',
    annualFee: 'Annual B2G SaaS / Platform Licensing Fee',
    priceValue: '₹50 Lakhs',
    perYearPerCity: 'per year per city corporation',
    pricingPayerDesc: 'Paid by Municipal Corporations (GVMC) and State Disaster Management Authorities (APSDMA) via annual civic disaster preparedness budget allocation.',
    teamTitle: 'NOVIX Spatial Systems',
    teamLocation: 'Headquartered in Visakhapatnam, Andhra Pradesh',
    bookDemoTitle: 'Request Municipal Command Center Evaluation',
    officerName: 'Officer / Engineer Name *',
    authority: 'Corporation / Authority *',
    officialEmail: 'Official Email *',
    submitDemoRequest: 'Book Municipal Demo',
    localDataStorage: 'Local Browser Data Storage',
    clearDataDesc: 'Reset all customized hazard records and simulated routes back to the 10 initial Visakhapatnam sample records.',
    confirmReset: 'Confirm Reset',
    cancel: 'Cancel',
    resetDialogTitle: 'Reset Local Data?',
    resetDialogDesc: 'This will reload the 10 default Visakhapatnam sample records.',
    protocolAlpha: 'GVMC DISASTER PROTOCOL 4-ALPHA',
    acknowledgedClose: 'Acknowledge & Close',
    footerEngineered: 'Engineered by NOVIX for GVMC & APSDMA',
    footerCity: 'Visakhapatnam, AP, India',
    targetMet: 'Target Ingestion: < 30s Met',
    offlineBannerTitle: 'Network Connection Offline',
    offlineBannerDesc: 'Live radar and AI pathfinding will automatically sync once your internet connection is restored.',
    offlineErrorTitle: 'Internet Connection Offline',
    offlineErrorDesc: 'It looks like your internet connection is currently unavailable. Please check your network and tap "Try again" to recalculate your dynamic evacuation corridor.',
    aiFailTitle: 'AI Pathfinder Temporarily Unavailable',
    aiFailFriendlyDesc: 'We could not reach the Gemini 3.8 Flash AI pathfinder right now. Don\'t worry — municipal safety models are on standby. Tap "Try again" to re-run the request.',
    loadBackupRoute: 'Load Verified Municipal Backup Route',
    simulateAiFailureBtn: 'Test AI Failure State',
    reconnectingAI: 'Reconnecting to Gemini 3.8 Flash Pathfinder...',
    networkOfflineBadge: 'Offline Mode Active'
  },
  te: {
    appName: 'రెస్క్యూనెట్ AI',
    oneLinePromise: 'మున్సిపల్ విపత్తు కమాండ్ సెంటర్ల కోసం రియల్-టైమ్ ప్రాదేశిక మేధస్సు మరియు డైనమిక్ తరలింపు రూటింగ్.',
    tagline: 'విశాఖపట్నం మున్సిపల్ కార్పొరేషన్ (GVMC) & APSDMA కార్యకలాపాలు',
    navDashboard: 'కమాండ్ డ్యాష్‌బోర్డ్',
    navRiskPanel: 'సెన్సార్ డేటా & రిస్క్',
    navRouting: 'డైనమిక్ రూటింగ్ ఇంజిన్',
    navAbout: 'మా గురించి & లైసెన్సింగ్',
    mainActionButton: 'అధిక-ప్రమాదకర తీర ప్రాంత వార్డుల కోసం నిర్ధారిత తరలింపు మార్గాలను రూపొందించి పంపించండి',
    mainActionDispatching: 'హైడ్రాలజికల్ కారిడార్లను లెక్కిస్తోంది...',
    dispatchCorridors: 'కారిడార్లను పంపించండి',
    dispatching: 'పంపుతోంది...',
    municipalCommandTag: 'GVMC మున్సిపల్ కమాండ్',
    quickFilter: 'వార్డులను ఫిల్టర్ చేయండి',
    allWards: 'అన్ని వార్డులు',
    highRiskOnly: 'అధిక ప్రమాదం / తీవ్రమైనవి',
    impassableOnly: 'రహదారులు మూసివేయబడినవి',
    searchPlaceholder: 'వార్డు పేరు లేదా రిస్క్ స్థాయి ద్వారా శోధించండి (ఉదా. MVP, క్రిటికల్, హై)...',
    quickSearchLabel: 'వార్డులను వేగంగా శోధించండి (పేరు లేదా రిస్క్ స్థాయి ద్వారా)',
    clearSearch: 'శోధనను తొలగించండి',
    filterByRisk: 'రిస్క్ స్థాయి / హాట్‌స్పాట్ ద్వారా ఫిల్టర్:',
    showingWards: 'చూపిస్తోంది',
    ofWards: 'మొత్తం',
    wardsCount: 'వార్డులు',
    logHazard: 'ప్రమాదాన్ని నమోదు చేయండి',
    waterDepth: 'నీటి లోతు',
    rainfall: 'వర్షపాతం తీవ్రత',
    elevation: 'సముద్ర మట్టానికి ఎత్తు',
    status: 'కార్యాచరణ స్థితి',
    hazard: 'ప్రస్తుత ప్రమాదం',
    actionRequired: 'తక్షణ చర్య',
    clearMyData: 'నా డేటాను క్లియర్ చేయండి',
    bookDemo: 'మున్సిపల్ డెమోను బుక్ చేయండి',
    sampleBadge: 'నమూనా (Sample)',
    liveFeed: 'లైవ్ మున్సిపల్ ఇన్పుట్ స్ట్రీమ్',
    corridorGenerated: 'అత్యవసర కారిడార్ ధృవీకరించబడింది',
    dispatchedToTeams: 'GVMC క్విక్ రెస్పాన్స్ టీమ్‌లకు పంపబడింది',
    emergencyAlert: 'తీరప్రాంత హెచ్చరిక స్థితి',
    statsDemosBooked: 'బుక్ చేసిన మున్సిపల్ డెమోలు',
    statsIngestionLatency: 'డేటా ఇన్జెషన్ వేగం',
    statsUptime: 'ప్లాట్‌ఫారమ్ అప్‌టైమ్ (ఒత్తిడి పరీక్ష)',
    hudhudFact: 'హుద్‌హుద్ తుఫాను వల్ల వైజాగ్‌లో ₹60,000 కోట్లకు పైగా నష్టం వాటిల్లింది (NDMA)',
    coastlineFact: 'ఆంధ్రప్రదేశ్‌కు 974 కి.మీ అత్యంత దుర్బలమైన తీరప్రాంతం ఉంది (APSDMA)',
    flashFloodFact: 'నగర వరదలు క్రమం తప్పకుండా వైజాగ్ ప్రధాన రహదారులను దిగ్బంధిస్తున్నాయి (The Hindu)',
    ourPitch: 'రెస్క్యూనెట్ AI అనేది మున్సిపల్ కమాండ్ సెంటర్లలో విలీనం అయి, ప్రత్యక్ష వాతావరణ సమాచారాన్ని వీధి స్థాయి సురక్షిత తరలింపు మార్గాలుగా మార్చే B2G ప్రాదేశిక ప్లాట్‌ఫారమ్.',
    whyItMatters: 'ఇది ఎందుకు ముఖ్యం',
    differentiator: 'సంక్షోభ సమయంలో వీధి స్థాయి ప్రమాద అంచనా మరియు ప్రతి వీధికి అనుకూలమైన సురక్షిత ప్రత్యామ్నాయ మార్గాలను ఏ ఇతర వ్యవస్థా అందించడం లేదు.',
    gisTitle: 'విశాఖపట్నం మున్సిపల్ వార్డు కార్యకలాపాల GIS',
    gisSubtitle: 'బంగాళాఖాతం తీరప్రాంతం, కైలాసగిరి కొండలు మరియు ప్రత్యక్ష వరద నీటి చిత్రణతో కూడిన ఇంటరాక్టివ్ ప్రాదేశిక వీక్షణ',
    wardStatusRegistry: 'వార్డు స్థితి రిజిస్ట్రీ',
    simulateAiRoute: 'AI మార్గాన్ని అనుకరించండి',
    depthLabel: 'లోతు:',
    rainRateLabel: 'వర్షం:',
    elevationLabel: 'ఎత్తు:',
    corridorLabel: 'కారిడార్:',
    hudhudBenchmark: 'హుద్‌హుద్ తుఫాను ప్రభావం',
    coastalExposure: 'తీరప్రాంత ప్రభావ తీవ్రత',
    urbanChokepoints: 'నగర రహదారి దిగ్బంధాలు',
    sourceNDMA: 'మూలం: జాతీయ విపత్తు నిర్వహణ సంస్థ (NDMA)',
    sourceAPSDMA: 'మూలం: ఆంధ్రప్రదేశ్ రాష్ట్ర విపత్తు నిర్వహణ సంస్థ (APSDMA)',
    sourceHindu: 'మూలం: మున్సిపల్ రికార్డులు & ది హిందూ',
    floodHeatmap: 'వరద హీట్‌మ్యాప్',
    corridors: 'తరలింపు మార్గాలు',
    elevationToggle: 'ఎత్తు ఆకృతులు',
    hazardCode: 'ప్రమాద సంకేతాలు:',
    impassableLegend: 'మూసివేత / అత్యంత ప్రమాదకరం',
    activeWaterloggingLegend: 'వరద నీరు నిల్వ',
    cautionLegend: 'జాగ్రత్త / పర్యవేక్షణ',
    clearLegend: 'స్పష్టం / తెరిచి ఉంది',
    safeCorridorLegend: 'సురక్షిత కారిడార్',
    assignedCorridor: 'కేటాయించిన కారిడార్:',
    drainSaturation: 'కాలువల నిండిన శాతం',
    multiSourceEngine: 'బహుళ-మూలాల హైడ్రాలజికల్ డేటా సేకరణ ఇంజిన్',
    realTimeTelemetry: 'విశాఖపట్నం ప్రత్యక్ష సెన్సార్ డేటా',
    sensorSubtitle: 'డాప్లర్ రాడార్, అల్ట్రాసోనిక్ కాలువ సెన్సార్లు, INCOIS సముద్ర అలల బాయ్‌లు మరియు నదీ ప్రవాహ డేటాను సమీకరిస్తోంది.',
    triggerIngestionBatch: '< 30 సెకన్ల డేటా సేకరణను ప్రారంభించండి',
    ingestingFeeds: 'డేటా సేకరిస్తోంది...',
    activeSensorFeeds: 'క్రియాశీల సెన్సార్ ఫీడ్‌లు',
    refreshInterval: 'రిఫ్రెష్ వ్యవధి: 1.5 సెకన్లు',
    predictiveSim: 'భవిష్యత్ వరద ప్రవాహ అనుకరణ',
    simSubtitle: 'విశాఖపట్నం తీరప్రాంత బేసిన్లలో వరద నీటి ప్రవాహాన్ని అంచనా వేయడానికి వర్షపాతం మరియు సముద్రపు ఉప్పెన విలువలను మార్చండి.',
    stormSurgeLabel: 'సముద్రపు తుఫాను ఉప్పెన:',
    siltBlockageLabel: 'కాలువల్లో పూడిక / వ్యర్థాల అడ్డంకి:',
    predictedExposure: 'రాబోయే 60 నిమిషాల నగర ముప్పు అంచనా',
    predictedInundation: 'అంచనా వేసిన ముంపు ప్రాంతం',
    wardsUnderThreat: 'ముప్పులో ఉన్న వార్డులు',
    geminiPathfinder: 'జెమిని 3.8 ఫ్లాష్ ప్రాదేశిక మార్గదర్శి',
    automatedSafeEvacuation: 'స్వయంచాలక సురక్షిత తరలింపు మార్గదర్శి',
    routingSubtitle: 'నిరంతర వరద నీటి లోతును లెక్కించి, మూసివేసిన అండర్‌పాస్‌లు మరియు మునిగిపోయిన రహదారులను తప్పించే సురక్షిత ప్రత్యామ్నాయ మార్గాలను రూపొందిస్తుంది.',
    quickPresets: 'త్వరిత సంఘటన నమూనాలు:',
    incidentParameters: 'బహుళ-మూలాల సంఘటన పారామితులు',
    fedDirectlyToAI: 'నేరుగా జెమిని AI హైడ్రాలజికల్ మార్గదర్శికి పంపబడుతుంది',
    targetWard: 'లక్ష్యిత విశాఖపట్నం వార్డు / తీరప్రాంతం',
    wardDrainageFreeboard: 'వార్డు డ్రైనేజీ ప్రవాహ స్థాయి:',
    drainageNormal: 'సాధారణం (కాలువలు సాఫీగా ప్రవహిస్తున్నాయి)',
    drainageElevated: 'ఎక్కువ (75% సామర్థ్యం నిండింది)',
    drainageCritical: 'తీవ్రం (కాలువలు మూసుకుపోయాయి / రివర్స్ ప్రవాహం)',
    windSpeedLabel: 'గాలుల వేగం (కి.మీ/గంట):',
    coastalSurgeMsl: 'సముద్రపు ఉప్పెన (సముద్ర మట్టానికి మీటర్లు):',
    avoidKothavalasa: 'కొత్తవలస అండర్‌పాస్‌ను నివారించండి',
    avoidUnderpassDesc: 'మునిగిపోయిన అండర్‌పాస్‌ను తప్పించి ప్రత్యామ్నాయ మార్గంలో మళ్లించండి',
    runGeminiPathfinder: 'జెమిని 3.8 ప్రాదేశిక మార్గదర్శిని ప్రారంభించండి',
    computingPathfinder: 'హైడ్రాలజికల్ AI మార్గాన్ని గణిస్తోంది...',
    aiGuidanceCards: 'AI ప్రాదేశిక మేధస్సు కార్డ్స్',
    tryAgain: 'మళ్లీ ప్రయత్నించండి',
    oneLineSummaryLabel: 'ఒక లైన్ సారాంశం:',
    keyFindingsLabel: 'ముఖ్యమైన కార్యాచరణ ఫలితాలు (3 కీలక అంశాలు):',
    aboutTitle: 'రెస్క్యూనెట్ AI & టీమ్ నోవిక్స్ గురించి',
    problemTitle: 'ఇది పరిష్కరించే సమస్య',
    problemDesc: 'విశాఖపట్నంలో వీధి-స్థాయి ప్రమాద చిత్రణ మరియు ప్రత్యక్ష రూటింగ్ సామర్థ్యాలు లేకపోవడం వల్ల తీరప్రాంత ప్రజలు తరలింపులో జాప్యాన్ని మరియు భారీ ఆస్తి నష్టాన్ని ఎదుర్కొంటున్నారు.',
    solutionTitle: 'మా పరిష్కారం',
    solutionDesc: 'వరదలు మరియు తుఫానుల సమయంలో సత్వర సమన్వయం కోసం విశాఖ మున్సిపల్ బృందాలకు రెస్క్యూనెట్ AI అనేది బహుళ సమాచార వనరులను నిజ-సమయ నష్ట అంచనాలు మరియు సురక్షిత తరలింపు మార్గాలుగా మార్చే B2G ప్లాట్‌ఫారమ్.',
    usersTitle: 'వినియోగదారులు',
    usersDesc: 'విశాఖపట్నంలోని తీరప్రాంత మరియు లోతట్టు ప్రజలు (MVP కాలనీ, జోడుగుళ్ల పాలెం, పామర్రు, రుషికొండ సహా) మరియు మున్సిపల్ సహాయక బృందాలు.',
    pricingTitle: 'లైసెన్సింగ్ మోడల్: ఎవరు చెల్లిస్తారు?',
    annualFee: 'వార్షిక B2G SaaS / ప్లాట్‌ఫారమ్ లైసెన్సింగ్ రుసుము',
    priceValue: '₹50 లక్షలు',
    perYearPerCity: 'ప్రతి నగర కార్పొరేషన్‌కు సంవత్సరానికి',
    pricingPayerDesc: 'వార్షిక విపత్తు సన్నద్ధత బడ్జెట్ ద్వారా మున్సిపల్ కార్పొరేషన్లు (GVMC) మరియు రాష్ట్ర విపత్తు నిర్వహణ సంస్థ (APSDMA) చెల్లిస్తాయి.',
    teamTitle: 'నోవిక్స్ ప్రాదేశిక వ్యవస్థలు',
    teamLocation: 'ప్రధాన కార్యాలయం విశాఖపట్నం, ఆంధ్రప్రదేశ్',
    bookDemoTitle: 'మున్సిపల్ కమాండ్ సెంటర్ ట్రయల్‌ను అభ్యర్థించండి',
    officerName: 'అధికారి / ఇంజనీర్ పేరు *',
    authority: 'కార్పొరేషన్ / సంస్థ *',
    officialEmail: 'అధికారిక ఇమెయిల్ *',
    submitDemoRequest: 'మున్సిపల్ డెమోను బుక్ చేయండి',
    localDataStorage: 'స్థానిక బ్రౌజర్ డేటా నిల్వ',
    clearDataDesc: 'అన్ని అనుకూలీకరించిన ప్రమాద రికార్డులను ప్రారంభ 10 విశాఖపట్నం నమూనా రికార్డులకు రీసెట్ చేయండి.',
    confirmReset: 'రీసెట్ చేయండి',
    cancel: 'రద్దు చేయండి',
    resetDialogTitle: 'స్థానిక డేటాను రీసెట్ చేయాలా?',
    resetDialogDesc: 'ఇది ప్రారంభ 10 విశాఖ నమూనా రికార్డులను తిరిగి లోడ్ చేస్తుంది.',
    protocolAlpha: 'GVMC విపత్తు ప్రోటోకాల్ 4-ఆల్ఫా',
    acknowledgedClose: 'ధృవీకరించి మూసివేయండి',
    activeCorridorsList: 'క్రియాశీల తీరప్రాంత తరలింపు మార్గాలు',
    footerEngineered: 'GVMC & APSDMA కోసం NOVIX ద్వారా రూపొందించబడింది',
    footerCity: 'విశాఖపట్నం, ఆం.ప్ర., భారతదేశం',
    targetMet: 'డేటా సేకరణ వేగం: < 30సె సాధించబడింది',
    offlineBannerTitle: 'ఇంటర్నెట్ కనెక్షన్ ఆఫ్‌లైన్‌లో ఉంది',
    offlineBannerDesc: 'ఇంటర్నెట్ కనెక్షన్ పునరుద్ధరించబడినప్పుడు ప్రత్యక్ష రాడార్ మరియు AI రూటింగ్ స్వయంచాలకంగా ప్రారంభమవుతాయి.',
    offlineErrorTitle: 'ఇంటర్నెట్ కనెక్షన్ ఆఫ్‌లైన్‌లో ఉంది',
    offlineErrorDesc: 'మీ ఇంటర్నెట్ కనెక్షన్ ప్రస్తుతం అందుబాటులో లేనట్లుంది. దయచేసి నెట్‌వర్క్‌ని తనిఖీ చేసి, సురక్షిత తరలింపు మార్గాన్ని తిరిగి లెక్కించడానికి "మళ్లీ ప్రయత్నించండి" పై నొక్కండి.',
    aiFailTitle: 'AI మార్గదర్శి తాత్కాలికంగా అందుబాటులో లేదు',
    aiFailFriendlyDesc: 'ప్రస్తుతం జెమిని 3.8 ఫ్లాష్ AI మార్గదర్శిని సంప్రదించలేకపోయాము. చింతించకండి — మున్సిపల్ భద్రతా నమూనాలు సిద్ధంగా ఉన్నాయి. మార్గాన్ని తిరిగి లెక్కించడానికి "మళ్లీ ప్రయత్నించండి" పై నొక్కండి.',
    loadBackupRoute: 'ధృవీకరించబడిన మున్సిపల్ బ్యాకప్ మార్గాన్ని లోడ్ చేయండి',
    simulateAiFailureBtn: 'AI వైఫల్యాన్ని పరీక్షించండి',
    reconnectingAI: 'జెమిని 3.8 ఫ్లాష్ AI మార్గదర్శికి తిరిగి కనెక్ట్ చేస్తోంది...',
    networkOfflineBadge: 'ఆఫ్‌లైన్ మోడ్ సక్రియం'
  }
};
