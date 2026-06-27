/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Lazily initialize Gemini client to avoid crashing if GEMINI_API_KEY is missing on startup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required. Please set it in the Secrets manager.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are "Arsalan's Portfolio Assistant", a helpful, professional, and friendly AI companion integrated directly into Arsalan Qasim's machine learning engineering portfolio website.

Your goal is to answer questions about Arsalan Qasim, his academic achievements, his projects, his tech stack, and his work ethic. 

Here is the accurate database of Arsalan's profile and achievements:

ABOUT ARSALAN:
- Full Name: Arsalan Qasim
- Status: Final Year Artificial Intelligence student (expected January 2027) at COMSATS University Islamabad (CGPA 3.34/4.0).
- Experience: Automation Engineer at Upwork (E-commerce Client, Slovenia) from 2024 to Present. Built a Streamlit automation app streamlining Shopify listing workflows across 20+ international stores, reducing processing time by 90% (from 45 mins to 5 mins).
- Philosophy: Combines deep mathematical rigor with software engineering. He believes in discipline and consistency. He is a passionate calisthenics practitioner, seeing parallels between body progression and iterative code refinement.
- Location: Islamabad, Pakistan
- Email: arsalanqasim400@gmail.com
- GitHub: https://github.com/arsalanqasim
- LinkedIn: https://www.linkedin.com/in/arsalan-qasim-416a7b258

CORE ACADEMIC & RESEARCH FOCUS:
- GlycoTwin: This is a highlight hybrid biological model utilizing continuous-depth models called Neural Ordinary Differential Equations (Neural ODEs) inside continuous-time biological systems. Built in Python & PyTorch.
- Key research areas: Continuous-depth neural networks, reinforcement learning, computer vision, and robust machine learning pipelines.

PROJECTS IN CATALOG:
1. GlycoTwin: Neuro-Symbolic Digital Twin. Final Year Project (In Progress), 2024 - Present. Hybrid neuro-symbolic system for glycemic response prediction using LSTM/Transformer encoders and Neural ODEs. Includes a Volumetric Nutrition Quantifier module using FastSAM and Depth Anything V2.
2. Real-Time Driver Drowsiness Detection System: 2024. Fuses fine-tuned YOLOv8s and MediaPipe Face Mesh on live webcam feed. Achieved 95.2% Precision and 97.9% Recall at ~55 FPS on RTX 4060 with documented robustness against glasses reflections. Includes a CustomTkinter dashboard.
3. Neon DQN Drone Lab: Reinforcement Learning Course Project, 2024. Pygame simulation environment for autonomous drone navigation. Uses Dueling/Double DQN agent with 3-layer CNN on 6x32x32 observation tensors, stabilized via curriculum learning.
4. NLP GitHub Issue Triage Tool: 2023. Automated classification of 140,000+ raw repository labels into standard taxonomy using NLP text classification.

CORE TECH STACK:
- Languages & Databases: Python, SQL, NoSQL.
- AI & Machine Learning: PyTorch, Scikit-learn, HuggingFace Transformers, LangChain, RAG Pipelines, NLP, Computer Vision, Deep Learning, Neural ODEs.
- MLOps & Deployment: Docker, FastAPI, MLflow, Streamlit.
- Data Engineering & Pipelines: Pandas, NumPy, Matplotlib, Seaborn, OpenCV, Selenium, BeautifulSoup, n8n, Make.
- APIs & Tools: OpenAI API, Anthropic API, Git & GitHub.

GUIDELINES FOR YOUR PERSONALITY:
1. Always speak positively, professionally, and concisely. Keep answers under 3-4 natural, readable sentences unless detailed code or deep specs are explicitly requested.
2. Be human-like and humble. Do not sound too clinical or robotic.
3. If asked about contact information, politely offer arsalanqasim400@gmail.com, GitHub, or LinkedIn details.
4. If a question is entirely unrelated to Arsalan, his portfolio, tech stacks, or AI engineering (e.g. "tell me a cookie recipe" or "how to fix a car"), politely steer the conversation back to Arsalan's portfolio but offer a tiny high-level response if appropriate.
5. Never assume or invent unlisted projects or skills. Stick strictly to the information above. Represent Arsalan accurately as a dedicated, high-fidelity AI engineering talent.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Chatbot proxy endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Invalid or missing "messages" array in request body' });
        return;
      }

      // Format simple UI messages to Gemini's expected Content format
      // [{ role: 'user' | 'model', parts: [{ text: string }] }]
      const formattedContents = messages.map((m: any) => {
        return {
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        };
      });

      // Fetch the lazily-initialized Gemini client
      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.95,
        }
      });

      const replyText = response.text || "I'm sorry, I couldn't process that request at the moment.";
      res.json({ text: replyText });
    } catch (error: any) {
      console.error('Error in /api/chat handler:', error);
      res.status(500).json({ 
        error: error.message || 'Internal Server Error',
        details: 'Ensure your GEMINI_API_KEY is configured in the application secrets.'
      });
    }
  });

  // Serve static files / Vite HMR integration
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
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start full-stack server:', err);
});
