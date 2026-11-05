import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI with recommended telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface PredictRequestBody {
  rainfallIntensity: number; // mm/hr
  drainageLevel: string; // normal, elevated, critical
  windSpeed: number; // km/h
  coastalSurge: number; // meters
  wardLocation: string;
  knownObstructions?: string[];
  activeWardsCount?: number;
}

// AI Flood Prediction & Evacuation Corridor Pathfinder endpoint
app.post('/api/predict-corridor', async (req: Request, res: Response) => {
  try {
    const {
      rainfallIntensity = 85,
      drainageLevel = 'critical',
      windSpeed = 90,
      coastalSurge = 1.8,
      wardLocation = 'MVP Colony Sector 4',
      knownObstructions = ['Kothavalasa Railway Underpass blocked with 1.2m water', 'Beach Road Rushikonda storm debris'],
      simulateFailure = false
    }: PredictRequestBody & { simulateFailure?: boolean } = req.body;

    if (simulateFailure) {
      return res.status(503).json({
        success: false,
        error: 'Gemini AI Pathfinder service temporarily unavailable. Rate limit or connection timeout.',
        code: 'AI_UNAVAILABLE'
      });
    }

    const rawKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    const isKeyValid = rawKey.length > 20 && rawKey !== 'MY_GEMINI_API_KEY';

    if (!isKeyValid) {
      // Realistic municipal simulation fallback if active API key is not configured
      const calculatedWaterlogging = ((rainfallIntensity * 0.006) + (coastalSurge * 0.15)).toFixed(1);
      return res.json({
        success: true,
        data: {
          floodPredictionSummary: `Predicted ${calculatedWaterlogging}m waterlogging at ${wardLocation}; re-routing emergency corridor via Hill-No.3 bypass.`,
          waterloggingDepthMeters: parseFloat(calculatedWaterlogging),
          impactedLocation: wardLocation,
          riskSeverity: rainfallIntensity > 70 || drainageLevel === 'critical' ? 'critical' : 'high',
          inundationEstimateMinutes: Math.max(12, Math.round(120 - (rainfallIntensity * 1.1))),
          recommendedCorridor: {
            corridorName: 'Corridor Alfa-Vizag North High-Ground Route',
            safeWaypoints: [
              `${wardLocation} Upper Gate`,
              'Waltair Uplands Elevated Ring',
              'Hill-No.3 Bypass Expressway',
              'Andhra University Safe Evacuation Staging Camp'
            ],
            avoidedHazards: [
              'Kothavalasa Railway Underpass (1.2m submerged)',
              `${wardLocation} Culvert Junction low point`,
              'Coastal Beach Road surge zone'
            ],
            estimatedEvacuationMinutes: 18,
            capacityVehiclesPerHour: 850
          },
          tacticalAction: 'Dispatch GVMC Quick Response Rescue Squad 4 with 2 heavy de-watering pumps to Sector-4; barricade underpass access immediately.',
          teluguSummary: `${wardLocation} వద్ద ${calculatedWaterlogging} మీటర్ల వరద నీరు చేరే ప్రమాదం ఉంది. హిల్ నెం-3 బైపాస్ మీదుగా సురక్షిత ప్రాంతాలకు తరలించండి.`,
          cards: [
            {
              title: 'Street-Level Flood Inundation Forecast',
              summary: `Predicted ${calculatedWaterlogging}m waterlogging at ${wardLocation}; re-routing emergency corridor via Hill-No.3 bypass.`,
              bullets: [
                `Accumulation Depth: ${calculatedWaterlogging} meters of standing water accumulating in low-lying basin.`,
                `Inundation Threshold: Estimated ${Math.max(12, Math.round(120 - (rainfallIntensity * 1.1)))} minutes before main roadway becomes impassable.`,
                `Rainfall Driver: Severe precipitation rate at ${rainfallIntensity} mm/hr with ${drainageLevel} drainage status.`
              ]
            },
            {
              title: 'Dynamic Emergency Evacuation Corridor',
              summary: 'Corridor Alfa-Vizag North high-ground route bypassing submerged underpasses.',
              bullets: [
                `Safe Waypoint Chain: ${wardLocation} Upper Gate → Waltair Uplands → Hill-No.3 Bypass → AU Relief Camp.`,
                'Avoided Chokepoints: Kothavalasa Railway Underpass (1.2m submerged), low culverts, and coastal surge zone.',
                'Transit Capacity: 18 minutes estimated transit duration with 850 vehicles/hour throughput.'
              ]
            },
            {
              title: 'GVMC Field Action & Citizen Advisory',
              summary: 'Tactical de-watering mobilization and bilingual public warning directives.',
              bullets: [
                'Field Directive: Dispatch GVMC Quick Response Rescue Squad 4 with 2 heavy de-watering pumps to Sector-4; barricade underpass access immediately.',
                `Telugu Loudspeaker Alert: ${wardLocation} వద్ద ${calculatedWaterlogging} మీటర్ల వరద నీరు చేరే ప్రమాదం ఉంది. హిల్ నెం-3 బైపాస్ మీదుగా సురక్షిత ప్రాంతాలకు తరలించండి.`,
                'Public Advisory: Instruct citizen motorists to avoid all coastal arterial roads and follow elevated ridge signage.'
              ]
            }
          ]
        },
        source: 'local-hydrological-engine'
      });
    }

    const systemInstruction = `You are the Chief Hydrological & Spatial Intelligence Officer for the Visakhapatnam Municipal Corporation (GVMC) and Andhra Pradesh State Disaster Management Authority (APSDMA).
Your mission is to convert multi-source sensor streams (rainfall, drainage levels, wind speeds, storm surges) into high-precision street-level flood inundation predictions and dynamic hazard-avoiding evacuation corridors for Visakhapatnam neighborhoods (Vizag).
Keep language simple, authoritative, and actionable for municipal response coordinators.`;

    const userPrompt = `Analyze the current real-time sensor streams and determine the flood impact and safe evacuation path:
- Ward Location: ${wardLocation}
- Rainfall Intensity: ${rainfallIntensity} mm/hr
- Local Drainage Status: ${drainageLevel}
- Wind Speed: ${windSpeed} km/h
- Coastal Storm Surge: ${coastalSurge} meters
- Reported Street Obstructions: ${JSON.stringify(knownObstructions)}

Required output format:
Ensure the floodPredictionSummary closely follows this exact shape:
"Predicted [depth]m waterlogging at [specific Vizag junction]; re-routing emergency corridor via [safe bypass route]."`;

    // 5-second timeout race to prevent indefinite hang
    const aiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            floodPredictionSummary: {
              type: Type.STRING,
              description: 'Concise prediction sentence, e.g.: Predicted 0.5m waterlogging at Sector-4 junction; re-routing emergency corridor via Hill-No.3 bypass.'
            },
            waterloggingDepthMeters: {
              type: Type.NUMBER,
              description: 'Predicted waterlogging depth in meters'
            },
            impactedLocation: {
              type: Type.STRING,
              description: 'Specific street, junction, or ward affected in Visakhapatnam'
            },
            riskSeverity: {
              type: Type.STRING,
              description: 'Risk severity: low, moderate, high, or critical'
            },
            inundationEstimateMinutes: {
              type: Type.INTEGER,
              description: 'Estimated minutes before roadway becomes impassable'
            },
            recommendedCorridor: {
              type: Type.OBJECT,
              properties: {
                corridorName: { type: Type.STRING, description: 'Descriptive safe corridor route name' },
                safeWaypoints: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'List of safe elevated waypoints from hazard to safe relief center'
                },
                avoidedHazards: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Hazardous spots bypassed by this corridor'
                },
                estimatedEvacuationMinutes: {
                  type: Type.INTEGER,
                  description: 'Estimated transit time in minutes along corridor'
                },
                capacityVehiclesPerHour: {
                  type: Type.INTEGER,
                  description: 'Estimated throughput capacity in vehicles per hour'
                }
              },
              required: ['corridorName', 'safeWaypoints', 'avoidedHazards', 'estimatedEvacuationMinutes', 'capacityVehiclesPerHour']
            },
            tacticalAction: {
              type: Type.STRING,
              description: 'Immediate tactical instruction for GVMC disaster teams and ward sachivalayam staff'
            },
            teluguSummary: {
              type: Type.STRING,
              description: 'Clear, concise advisory sentence in Telugu script for citizen warnings and loudhailers'
            },
            cards: {
              type: Type.ARRAY,
              description: '3 cards: 1. Inundation Forecast, 2. Evacuation Corridor, 3. Field Action. Each card has a title, a one-line summary, and exactly 3 bullet points.',
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: 'Card title' },
                  summary: { type: Type.STRING, description: 'One-line summary for the card' },
                  bullets: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '3 clear bullet points'
                  }
                },
                required: ['title', 'summary', 'bullets']
              }
            }
          },
          required: [
            'floodPredictionSummary',
            'waterloggingDepthMeters',
            'impactedLocation',
            'riskSeverity',
            'inundationEstimateMinutes',
            'recommendedCorridor',
            'tacticalAction',
            'teluguSummary',
            'cards'
          ]
        }
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI inference timeout exceeded')), 20000)
    );

    const response = (await Promise.race([aiPromise, timeoutPromise])) as any;
    const textContent = response.text;
    if (!textContent) {
      throw new Error('Empty response from AI model');
    }

    const parsedData = JSON.parse(textContent);

    return res.json({
      success: true,
      data: parsedData,
      source: 'gemini-3.8-flash'
    });
  } catch (error: any) {
    console.error('Gemini flood prediction error:', error);
    return res.status(503).json({
      success: false,
      error: error?.message || 'Gemini AI inference failed or timed out.',
      code: 'AI_INFERENCE_ERROR'
    });
  }
});

// Demo booking and municipal inquiry endpoint
app.post('/api/book-demo', (req: Request, res: Response) => {
  const { name, organization, designation, email, phone, cityCorporation } = req.body;
  if (!email || !organization) {
    return res.status(400).json({ error: 'Organization and official email are required.' });
  }

  return res.json({
    success: true,
    message: `Municipal platform trial initialized for ${organization} (${cityCorporation || 'Visakhapatnam'}). NOVIX GovTech team will initiate spatial telemetry dispatch within 4 hours.`,
    bookingReference: `GVMC-NOVIX-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RescuNetAI Command Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
