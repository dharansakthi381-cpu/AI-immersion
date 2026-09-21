import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy/guarded Gemini client initialization
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/analyze-complaint
 * AI triage for complaints: Category, Priority, Department, Summary, Duplicate check, Resolution estimate
 */
app.post("/api/analyze-complaint", async (req, res) => {
  try {
    const { complaint, existingComplaints = [] } = req.body;

    if (!complaint || !complaint.title || !complaint.description) {
      return res.status(400).json({ error: "Missing complaint title or description" });
    }

    const ai = getGenAI();

    // If no API key or client couldn't be initialized, delegate to structured fallback
    if (!ai) {
      return res.status(200).json({
        ...getFallbackAnalysis(complaint, existingComplaints),
        source: "server-local-engine"
      });
    }

    const prompt = `You are the AI Campus Maintenance & Facilities Dispatcher for a university.
Analyze this newly submitted campus complaint and compare it against active existing complaints to detect duplicates.

NEW COMPLAINT:
Title: "${complaint.title}"
Description: "${complaint.description}"
Location: "${complaint.location || 'Not specified'}"
User-suggested Category: "${complaint.category || 'Unknown'}"

RECENT EXISTING OPEN COMPLAINTS ON CAMPUS:
${JSON.stringify(existingComplaints.slice(0, 10), null, 2)}

TASK:
1. Classify into EXACTLY one of: ["Electrical", "Plumbing", "Furniture", "Cleaning", "Internet/Network", "Security", "Other"]
2. Determine urgency/priority: ["High", "Medium", "Low"]. Mark High if there is continuous water leakage, electrical fire/sparks, safety/security hazards, or critical academic stoppage.
3. Recommend the appropriate campus department: ["Electrical Maintenance", "Plumbing Services", "Carpentry & Furniture", "Housekeeping & Sanitation", "IT & Network Infrastructure", "Campus Security & Locksmith", "General Facilities"]
4. Generate a concise 1-2 sentence executive summary for field technicians.
5. Check if this is a DUPLICATE of any existing complaint (same location, same facility issue). If duplicate, set duplicate: true, provide duplicateOfId, and explain.
6. Provide an explanation for the assigned category and priority.
7. Predict resolution time in hours (number) and provide a human-friendly string (e.g. "2 - 4 Hours").
8. Provide a smart routing recommendation (e.g. "Rapid Response Electrical Unit", "Plumbing Heavy Repairs").`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            priority: { type: Type.STRING },
            department: { type: Type.STRING },
            summary: { type: Type.STRING },
            duplicate: { type: Type.BOOLEAN },
            duplicateOfId: { type: Type.STRING, nullable: true },
            reason: { type: Type.STRING },
            predictedResolutionHours: { type: Type.NUMBER },
            resolutionTimeEstimate: { type: Type.STRING },
            routingRecommendation: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["category", "priority", "department", "summary", "duplicate", "reason", "predictedResolutionHours", "resolutionTimeEstimate", "routingRecommendation"]
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    return res.json({
      ...parsed,
      source: "gemini-3.8-flash"
    });

  } catch (err: any) {
    console.error("Gemini API error, falling back to local analysis:", err?.message || err);
    const { complaint, existingComplaints = [] } = req.body;
    return res.json({
      ...getFallbackAnalysis(complaint, existingComplaints),
      source: "server-fallback-engine"
    });
  }
});

/**
 * POST /api/maintenance-insights
 * Generates campus-wide proactive maintenance insights
 */
app.post("/api/maintenance-insights", async (req, res) => {
  try {
    const ai = getGenAI();
    if (!ai) {
      return res.json({ insights: null, source: "default" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "Generate 4 realistic proactive maintenance insights for a university campus facility management system. Focus on recurring electrical load, plumbing joint wear, cafeteria waste management, and Wi-Fi access point bandwidth.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  level: { type: Type.STRING },
                  category: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  observation: { type: Type.STRING },
                  recommendation: { type: Type.STRING },
                  estimatedSavings: { type: Type.STRING }
                },
                required: ["id", "title", "level", "category", "impact", "observation", "recommendation"]
              }
            }
          },
          required: ["insights"]
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    res.json(parsed);
  } catch (e: any) {
    console.error("Failed to generate AI insights with Gemini:", e?.message);
    res.json({ insights: null, source: "fallback" });
  }
});

// Fallback logic on server
function getFallbackAnalysis(complaint: any, existingComplaints: any[] = []) {
  const text = `${complaint.title || ""} ${complaint.description || ""} ${complaint.location || ""}`.toLowerCase();

  let category = "Other";
  let department = "General Facilities";
  let priority = "Medium";
  let routingRecommendation = "General Maintenance Dispatch";
  let predictedResolutionHours = 8;
  let resolutionTimeEstimate = "4 - 8 Hours";

  if (/light|fan|bulb|wiring|spark|switch|socket|power|ac\b|electrical/.test(text)) {
    category = "Electrical";
    department = "Electrical Maintenance";
    routingRecommendation = "Electrical Maintenance - Team Alpha";
    predictedResolutionHours = text.includes("spark") ? 3 : 6;
    resolutionTimeEstimate = text.includes("spark") ? "1 - 3 Hours" : "4 - 8 Hours";
  } else if (/water|leak|pipe|tap|faucet|drain|toilet|plumb|sink/.test(text)) {
    category = "Plumbing";
    department = "Plumbing Services";
    routingRecommendation = "Plumbing Rapid Response Unit";
    predictedResolutionHours = 3;
    resolutionTimeEstimate = "2 - 4 Hours";
  } else if (/desk|chair|table|bench|furniture|wood|board/.test(text)) {
    category = "Furniture";
    department = "Carpentry & Furniture";
    routingRecommendation = "Campus Carpentry & Workshop Crew";
    predictedResolutionHours = 24;
    resolutionTimeEstimate = "24 - 48 Hours";
  } else if (/clean|washroom|toilet|restroom|garbage|trash|dust|smell|odor|dirty/.test(text)) {
    category = "Cleaning";
    department = "Housekeeping & Sanitation";
    routingRecommendation = "Housekeeping Rapid Response Team";
    predictedResolutionHours = 2;
    resolutionTimeEstimate = "1 - 2 Hours";
  } else if (/wifi|wi-fi|internet|network|router|lan|connection/.test(text)) {
    category = "Internet/Network";
    department = "IT & Network Infrastructure";
    routingRecommendation = "Campus IT Network Operations Center";
    predictedResolutionHours = 4;
    resolutionTimeEstimate = "2 - 4 Hours";
  } else if (/lock|door|key|security|theft|cctv|camera/.test(text)) {
    category = "Security";
    department = "Campus Security & Locksmith";
    routingRecommendation = "Campus Security Access Control";
    predictedResolutionHours = 4;
    resolutionTimeEstimate = "2 - 4 Hours";
  }

  if (/spark|hazard|continuous leak|flood|unlocked|broken lock|emergency|smoke|shock/.test(text)) {
    priority = "High";
  } else if (/paint|cosmetic|scratch|minor|creak/.test(text)) {
    priority = "Low";
  }

  const titleLower = (complaint.title || "").toLowerCase();
  const locLower = (complaint.location || "").toLowerCase().trim();
  let duplicate = false;
  let duplicateOfId = null;

  for (const item of existingComplaints) {
    const itemTitle = (item.title || "").toLowerCase();
    const itemLoc = (item.location || "").toLowerCase().trim();
    if (item.category === category && (titleLower.includes(itemTitle.slice(0, 10)) || (locLower && itemLoc && locLower === itemLoc))) {
      duplicate = true;
      duplicateOfId = item.id;
      break;
    }
  }

  return {
    category,
    priority,
    department,
    summary: `${complaint.title} reported at ${complaint.location || 'campus facility'}.`,
    duplicate,
    duplicateOfId,
    reason: `System analyzed facility attributes, safety factors, and campus location tags.`,
    predictedResolutionHours,
    resolutionTimeEstimate,
    routingRecommendation,
    confidence: 0.93
  };
}

// Vite middleware or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
