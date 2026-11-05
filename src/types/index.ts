export type HazardRiskLevel = 'Low' | 'Moderate' | 'High' | 'Severe' | 'Critical';

export type WardStatus = 
  | 'Active Waterlogging'
  | 'Evacuation Advised'
  | 'Impassable'
  | 'Clear'
  | 'Monitored'
  | 'Caution'
  | 'Open'
  | 'Mandatory Evacuation';

export interface WardRecord {
  id: number;
  name: string;
  hazardType: 'Flood Risk' | 'Surge Risk' | 'Obstruction' | 'Drainage' | 'Wind Hazard' | 'Traffic' | 'Waterlogging';
  hazardValue: string;
  riskLevel: HazardRiskLevel;
  status: WardStatus;
  isSample: boolean;
  latitude: number;
  longitude: number;
  populationEstimate: number;
  currentWaterDepthM: number;
  rainfallMmHr: number;
  drainageCapacityPct: number;
  elevationMeters: number;
  evacuationRouteName?: string;
  notes?: string;
  updatedAt: string;
}

export interface SensorStream {
  id: string;
  source: string;
  metric: string;
  currentValue: string;
  trend: 'rising' | 'stable' | 'dropping';
  status: 'nominal' | 'alert' | 'critical';
  lastPingMs: number;
  coverageWard: string;
}

export interface CorridorWaypoints {
  corridorName: string;
  safeWaypoints: string[];
  avoidedHazards: string[];
  estimatedEvacuationMinutes: number;
  capacityVehiclesPerHour: number;
}

export interface AICard {
  title: string;
  summary: string;
  bullets: string[];
}

export interface AIPredictionResult {
  floodPredictionSummary: string;
  waterloggingDepthMeters: number;
  impactedLocation: string;
  riskSeverity: 'low' | 'moderate' | 'high' | 'critical';
  inundationEstimateMinutes: number;
  recommendedCorridor: CorridorWaypoints;
  tacticalAction: string;
  teluguSummary: string;
  cards?: AICard[];
}

export interface MunicipalStats {
  demosBooked: number;
  ingestionLatencyMs: number;
  uptimePct: number;
  monitoredWardsCount: number;
  safeCorridorsActive: number;
}

export type AppScreen = 'dashboard' | 'risk-panel' | 'routing' | 'about';
export type AppLanguage = 'en' | 'te';
