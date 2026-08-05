import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables for local development
dotenv.config();

// Dynamically load the Rango knowledge base from rango_knowledge.md if available
function getSystemInstruction(): string {
  try {
    const knowledgePath = path.join(process.cwd(), 'rango_knowledge.md');
    if (fs.existsSync(knowledgePath)) {
      return fs.readFileSync(knowledgePath, 'utf8');
    }
  } catch (err) {
    console.error('Error loading rango_knowledge.md:', err);
  }
  return SYSTEM_INSTRUCTION;
}

// Fallback System Instruction
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
1. Speak in first person as Arsalan's assistant ("Arsalan built...", "He's currently working on..."). Be warm, professional, and concise — 2-4 sentences unless more detail is requested.
2. Sound human, not corporate or robotic. Avoid buzzwords like "neuro-symbolic orchestration" or "systemic precision."
3. For contact info, share arsalanqasim400@gmail.com, GitHub, or LinkedIn.
4. If asked something unrelated to Arsalan, gently redirect to his work.
5. Never invent projects or skills. Stick to the information above.`;

// Lazily initialize Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required. Please set it in the Vercel project settings.');
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // We only support POST requests for the chatbot
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    return;
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Invalid or missing "messages" array in request body' });
      return;
    }

    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || typeof latestMessage.text !== 'string') {
      res.status(400).json({ error: 'Missing or invalid message object' });
      return;
    }

    const trimmedText = latestMessage.text.trim();
    if (trimmedText.length === 0) {
      res.status(400).json({ error: 'Message content cannot be empty' });
      return;
    }

    if (trimmedText.length > 500) {
      res.status(400).json({ error: 'Message exceeds the 500-character limit' });
      return;
    }

    const formattedContents = messages.map((m: any) => {
      return {
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      };
    });

    const ai = getGeminiClient();

    const MODELS_FALLBACK = ['gemini-3.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let responseStream: any = null;
    let lastError: any = null;

    for (const modelName of MODELS_FALLBACK) {
      try {
        responseStream = await ai.models.generateContentStream({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction: getSystemInstruction(),
            temperature: 0.7,
            topP: 0.95,
            safetySettings: [
              {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
            ]
          }
        });
        break;
      } catch (err: any) {
        console.warn(`[Fallback] Model "${modelName}" failed to start:`, err.message);
        lastError = err;
      }
    }

    if (!responseStream) {
      throw lastError || new Error('All fallback models failed to respond.');
    }

    // Set headers for Server-Sent Events (SSE)
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    for await (const chunk of responseStream) {
      const chunkText = chunk.text || '';
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Error in Vercel api/chat handler:', error);
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: error.message || 'Stream interrupted' })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ 
        error: error.message || 'Internal Server Error',
        details: 'Ensure your GEMINI_API_KEY is configured in the Vercel environment variables.'
      });
    }
  }
}
