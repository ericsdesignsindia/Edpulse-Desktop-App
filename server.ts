import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI client lazy/safely
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Content Generator Endpoint (Content Writing Pillar / Content Calendar)
  app.post('/api/ai/content', async (req, res) => {
    try {
      const { prompt, topic, channel, tone, type } = req.body;
      const ai = getGenAI();

      const systemInstruction = `You are an expert digital marketing strategist and senior content writer for EDPulse Digital OS.
Generate compelling, high-converting copy formatted clearly in Markdown.
Target Channel/Platform: ${channel || 'Multi-channel'}
Tone: ${tone || 'Professional & Engaging'}
Type: ${type || 'Social Post / Article'}`;

      const userPrompt = prompt || `Write a creative and engaging ${type || 'marketing post'} about: ${topic || 'Enterprise Digital Transformation'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        content: response.text,
      });
    } catch (err: any) {
      console.error('Error generating AI content:', err);
      res.status(500).json({
        success: false,
        error: err.message || 'Failed to generate content with Gemini AI',
      });
    }
  });

  // AI Technical SEO Auditor Endpoint
  app.post('/api/ai/seo-audit', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
      }

      const ai = getGenAI();

      const prompt = `Perform a comprehensive technical SEO and performance audit analysis for the website domain: "${url}".
Provide a JSON object response with exact structural format matching this JSON schema:
{
  "score": 88,
  "domain": "${url}",
  "metaAnalysis": {
    "title": "Page Title Status & Quality",
    "description": "Meta Description Analysis",
    "ogTags": "OpenGraph / Twitter Card Status",
    "canonical": "Canonical Tag Status"
  },
  "technicalChecks": [
    { "name": "SSL & HTTPS Encryption", "status": "Passed", "details": "Valid TLS 1.3 certificate detected." },
    { "name": "Mobile Responsiveness & Viewport", "status": "Passed", "details": "Proper viewport tag and fluid CSS layouts." },
    { "name": "Core Web Vitals (LCP / CLS / INP)", "status": "Warning", "details": "LCP is 2.4s. Consider optimizing hero images." },
    { "name": "Structured Data (Schema.org)", "status": "Passed", "details": "Organization and WebPage schema JSON-LD found." },
    { "name": "Robots.txt & XML Sitemap", "status": "Passed", "details": "Sitemap linked and accessible." },
    { "name": "Heading Structure (H1-H6)", "status": "Passed", "details": "Single H1 present with logical hierarchy." }
  ],
  "recommendations": [
    "Compress background WebP images to reduce LCP by ~400ms.",
    "Add explicit alt attributes to 3 secondary portfolio icons.",
    "Implement browser resource hints (dns-prefetch / preconnect) for CDN fonts."
  ],
  "keywordOpportunities": ["Enterprise Digital OS", "Growth Marketing Automation", "FastAPI CRM Integration"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const parsedData = JSON.parse(response.text || '{}');
      res.json({
        success: true,
        audit: parsedData,
      });
    } catch (err: any) {
      console.error('Error conducting AI SEO Audit:', err);
      res.status(500).json({
        success: false,
        error: err.message || 'Failed to conduct SEO audit',
      });
    }
  });

  // AI Email Drip Copy Generator Endpoint
  app.post('/api/ai/email-drip', async (req, res) => {
    try {
      const { campaignGoal, audience, product } = req.body;
      const ai = getGenAI();

      const prompt = `Generate a 3-step high-converting email drip sequence for "${product || 'EDPulse Agency Services'}".
Campaign Goal: ${campaignGoal || 'Lead Nurturing & Demo Booking'}
Target Audience: ${audience || 'B2B Founders and CMOs'}

Return a JSON array of 3 email objects with format:
[
  {
    "step": 1,
    "delay": "Day 1 (Immediate)",
    "subject": "Email Subject Line",
    "previewText": "Short preview snippet",
    "body": "Full formatted email body content with CTA button text"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      const parsedData = JSON.parse(response.text || '[]');
      res.json({
        success: true,
        emails: parsedData,
      });
    } catch (err: any) {
      console.error('Error generating Email Drip:', err);
      res.status(500).json({
        success: false,
        error: err.message || 'Failed to generate email drip sequence',
      });
    }
  });

  // Serve Vite app or built static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EDPulse Server running on http://localhost:${PORT}`);
  });
}

startServer();
