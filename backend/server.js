// Backend API server for BISEDA.AI
// Securely handles OpenAI API calls

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getUser, saveUser } from './models/User.js';
import stripeRoutes from './routes/stripe.js';
import businessRoutes from './routes/businesses.js';
import creditRoutes from './routes/credits.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables (check both backend/.env and root .env)
dotenv.config({ path: join(__dirname, '.env') });
dotenv.config({ path: join(__dirname, '../.env') }); // Also check root

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'https://bisedaai.com',
    'http://bisedaai.com',
    'https://www.bisedaai.com',
    'http://www.bisedaai.com',
    'https://julzwest.github.io',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id']
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting (simple in-memory store)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 requests per minute

const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const limit = rateLimitMap.get(ip);
  
  if (now > limit.resetTime) {
    limit.count = 1;
    limit.resetTime = now + RATE_LIMIT_WINDOW;
    return next();
  }
  
  if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({ 
      error: 'Too many requests. Please wait a moment.' 
    });
  }
  
  limit.count++;
  next();
};

// Stripe routes
app.use('/api/stripe', stripeRoutes);

// Business routes
app.use('/api/businesses', businessRoutes);

// Credits routes
app.use('/api/credits', creditRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get user usage stats
app.get('/api/usage', (req, res) => {
  try {
    const userId = getUserId(req);
    const user = getUser(userId);
    res.json(user.getUsageStats());
  } catch (error) {
    console.error('Error getting usage:', error);
    res.status(500).json({ error: 'Failed to get usage stats' });
  }
});

// Get subscription info
app.get('/api/subscription', (req, res) => {
  try {
    const userId = getUserId(req);
    const user = getUser(userId);
    res.json({
      tier: user.subscriptionTier,
      status: user.subscriptionStatus,
      expiresAt: user.subscriptionExpiresAt,
      limits: user.getLimits()
    });
  } catch (error) {
    console.error('Error getting subscription:', error);
    res.status(500).json({ error: 'Failed to get subscription info' });
  }
});

// Get user ID from request (for MVP, use IP or generate session ID)
function getUserId(req) {
  // For MVP: Use IP address + user agent as user ID
  // In production: Use JWT token or session ID
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('user-agent') || '';
  return Buffer.from(`${ip}-${userAgent}`).toString('base64').substring(0, 32);
}

// Admin user IDs (add your user ID here to bypass limits)
const ADMIN_USER_IDS = [
  // Add admin user IDs here - you can get your user ID from backend logs
  // Example: 'admin-user-id-here'
];

// Check if user is admin
function isAdmin(userId) {
  return ADMIN_USER_IDS.includes(userId) || 
         process.env.ADMIN_MODE === 'true' || // Enable admin mode via env var
         userId === 'admin'; // Simple admin check
}

// Check subscription limits middleware
function checkSubscriptionLimits(req, res, next) {
  const userId = getUserId(req);
  const user = getUser(userId);
  
  // ADMIN BYPASS: Skip all limits for admin users
  if (isAdmin(userId)) {
    console.log(`🔓 Admin user detected: ${userId} - Bypassing all limits`);
    req.user = user;
    req.isAdmin = true;
    return next();
  }
  
  // Check if subscription is active
  if (!user.isSubscriptionActive()) {
    return res.status(403).json({ 
      error: 'Subscription expired',
      code: 'SUBSCRIPTION_EXPIRED',
      upgradeRequired: true
    });
  }
  
  // Check message limit BEFORE processing request
  const limits = user.getLimits();
  const used = user.dailyUsage.messages;
  const limit = limits.messagesPerDay;
  const credits = user.credits || 0;
  
  // Check if subscription limit reached
  const subscriptionLimitReached = used >= limit;
  
  // If subscription limit reached, check if user has credits
  if (subscriptionLimitReached && credits === 0) {
    // Log limit check for debugging
    console.log(`🚫 Limit check failed for user ${userId}: ${used}/${limit} messages, ${credits} credits - BLOCKED`);
    
    return res.status(429).json({ 
      error: 'Limiti ditor u arrit! Përmirëso planin ose bli kredite për të vazhduar.',
      code: 'LIMIT_EXCEEDED',
      limit: limit,
      used: used,
      creditsAvailable: credits,
      upgradeRequired: true
    });
  }
  
  // If subscription limit reached but user has credits, we'll use credits after successful API call
  if (subscriptionLimitReached && credits > 0) {
    console.log(`💳 Using credits for user ${userId}: ${used}/${limit} messages, ${credits} credits available`);
  }
  
  // Check image analysis limit
  const hasImages = req.body.fileUrls && req.body.fileUrls.length > 0;
  if (hasImages && !user.canAnalyzeImage()) {
    return res.status(403).json({ 
      error: 'Image analysis not available on your plan',
      code: 'FEATURE_NOT_AVAILABLE',
      upgradeRequired: true
    });
  }
  
  // Attach user to request
  req.user = user;
  next();
}

// OpenAI API proxy endpoint
app.post('/api/chat', rateLimit, checkSubscriptionLimits, async (req, res) => {
  try {
    const { prompt, conversationHistory = [], systemPrompt = null, fileUrls = [] } = req.body;
    const user = req.user;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Detect crisis/self-harm indicators
    const detectCrisis = (message) => {
      if (!message || typeof message !== 'string') return false;
      const lowerMessage = message.toLowerCase();
      const crisisIndicators = [
        'dua të vdes', 'do të vras veten', 'do të përfundoj', 'do të vras', 'vetëvrasje',
        'nuk dua të jetoj', 'nuk kam arsye për të jetuar', 'nuk ka kuptim të jetoj',
        'do të përfundoj gjithçka', 'do të bëj diçka', 'kam planuar të',
        'nuk ka shpresë', 'nuk ka kuptim', 'çdo gjë është e humbur', 'nuk ka rrugëdalje',
        'nuk kam më shpresë', 'çdo gjë është e keqe', 'nuk kam energji', 'nuk dua të dal',
        'nuk mund ta bëj më', 'nuk mund ta duroj më', 'jam i dëshpëruar', 'jam e dëshpëruar'
      ];
      return crisisIndicators.some(indicator => lowerMessage.includes(indicator));
    };
    
    const isCrisis = detectCrisis(prompt);
    if (isCrisis) {
      console.log('⚠️ CRISIS DETECTED - User message contains self-harm indicators');
    }
    
    // Check adult content access
    const isAdultCategory = systemPrompt && (
      systemPrompt.includes('partner seksual virtual') || 
      systemPrompt.includes('pa ASNJË FILTER') ||
      systemPrompt.includes('SEX GOD')
    );
    
    if (isAdultCategory && user.subscriptionTier === 'free') {
      return res.status(403).json({ 
        error: 'Adult content requires a subscription',
        code: 'ADULT_CONTENT_BLOCKED',
        upgradeRequired: true
      });
    }
    
    // OpenAI API Integration - Clean Installation
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey || openaiApiKey.trim() === '') {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        message: 'Please configure OPENAI_API_KEY in backend/.env file'
      });
    }
    
    let aiResponse;
    let usage = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
    
    try {
      console.log('🚀 Calling OpenAI API...');
      
      // Prepare messages array for OpenAI
      const messages = [];
      
      // Add system prompt if provided
      if (systemPrompt) {
        // If crisis detected, ensure system prompt emphasizes crisis response
        let finalSystemPrompt = String(systemPrompt).trim();
        if (isCrisis) {
          finalSystemPrompt += '\n\nKRITIKE: Përdoruesi ka treguar shenja të krizës. Duhet të jesh mbështetës, empatik, dhe të sugjerosh ndihmë profesionale. Trego që bota është e bukur dhe që ata janë të rëndësishëm.';
        }
        messages.push({
          role: 'system',
          content: finalSystemPrompt
        });
      }
      
      // Add conversation history (last 10 messages for context)
      const recentHistory = conversationHistory.slice(-10);
      recentHistory.forEach(msg => {
        if (msg.role && msg.content) {
          const role = msg.role === 'user' ? 'user' : 'assistant';
          messages.push({
            role: role,
            content: String(msg.content).trim()
          });
        }
      });
      
      // Add current user message with images if provided
      if (fileUrls && fileUrls.length > 0) {
        const imageContents = fileUrls.map((url) => ({
          type: 'image_url',
          image_url: { url: url }
        }));
        messages.push({
          role: 'user',
          content: [
            { type: 'text', text: String(prompt).trim() },
            ...imageContents
          ]
        });
        console.log(`📸 Including ${fileUrls.length} image(s) with message`);
      } else {
        messages.push({
          role: 'user',
          content: String(prompt).trim()
        });
      }
      
      console.log(`📝 Sending ${messages.length} messages to OpenAI`);
      
      // Determine model and parameters
      const isAdultCategory = systemPrompt && (
        systemPrompt.includes('partner seksual virtual') || 
        systemPrompt.includes('pa ASNJË FILTER') ||
        systemPrompt.includes('SEX GOD')
      );
      
      const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
      const maxTokens = isAdultCategory ? 2500 : 1500;
      const temperature = isAdultCategory ? 1.6 : 1.2;
      const frequencyPenalty = isAdultCategory ? 0.8 : 0.6;
      const presencePenalty = isAdultCategory ? 0.7 : 0.5;
      
      // Call OpenAI API
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          max_tokens: maxTokens,
          temperature: temperature,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty,
          stream: false
        })
      });
      
      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json().catch(() => ({}));
        
        if (openaiResponse.status === 401) {
          console.error('❌ OpenAI API key invalid');
          return res.status(401).json({ 
            error: 'OpenAI API key is invalid',
            message: 'Please check your OPENAI_API_KEY in backend/.env'
          });
        } else if (openaiResponse.status === 429) {
          console.warn('⚠️ OpenAI rate limit exceeded');
          return res.status(429).json({ 
            error: 'Rate limit exceeded',
            message: 'OpenAI API rate limit reached. Please try again later.'
          });
        } else {
          console.error('❌ OpenAI API error:', errorData);
          return res.status(openaiResponse.status).json({ 
            error: 'OpenAI API error',
            message: errorData.error?.message || 'Unknown error'
          });
        }
      }
      
      const data = await openaiResponse.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        aiResponse = data.choices[0].message.content;
        usage = {
          prompt_tokens: data.usage?.prompt_tokens || 0,
          completion_tokens: data.usage?.completion_tokens || 0,
          total_tokens: data.usage?.total_tokens || 0
        };
        
        // Track cost per user
        const cost = user.recordOpenAIUsage(usage.prompt_tokens, usage.completion_tokens);
        
        console.log('✅ OpenAI response received');
        console.log(`📊 Tokens: ${usage.total_tokens} (prompt: ${usage.prompt_tokens}, completion: ${usage.completion_tokens})`);
        console.log(`💰 Cost: $${cost.toFixed(6)} | User total: $${user.getCostStats().totalSpent.toFixed(4)}`);
      } else {
        throw new Error('Invalid response format from OpenAI');
      }
      
    } catch (error) {
      console.error('❌ OpenAI API error:', error.message);
      return res.status(500).json({ 
        error: 'Failed to get AI response',
        message: error.message 
      });
    }
    
    // Record usage AFTER successful API call
    const limits = user.getLimits();
    const subscriptionLimitReached = user.dailyUsage.messages >= limits.messagesPerDay;
    
    // If subscription limit reached, use credits instead
    if (subscriptionLimitReached && user.credits > 0) {
      const creditsUsed = user.recordCreditUsage(1);
      if (creditsUsed) {
        console.log(`💳 Used 1 credit for user ${user.userId}. Remaining credits: ${user.credits}`);
      } else {
        // This shouldn't happen as we checked before, but handle it anyway
        console.error(`⚠️ Failed to use credit for user ${user.userId}`);
        return res.status(429).json({ 
          error: 'Limiti ditor u arrit! Përmirëso planin ose bli kredite për të vazhduar.',
          code: 'LIMIT_EXCEEDED',
          upgradeRequired: true
        });
      }
    } else {
      // Normal subscription limit usage
      user.recordMessage();
    }
    
    if (fileUrls && fileUrls.length > 0) {
      user.recordImageAnalysis();
    }
    
    saveUser(user);
    
    const costStats = user.getCostStats();
    console.log(`📊 User ${user.userId}: ${user.dailyUsage.messages}/${user.getLimits().messagesPerDay} messages used`);
    console.log(`💰 Cost: $${costStats.totalSpent.toFixed(4)} total | $${costStats.dailyCost.toFixed(4)} today`);
    
    res.json({ 
      response: aiResponse,
      usage: usage,
      userUsage: user.getUsageStats(),
      source: 'openai',
      cost: {
        thisRequest: user.calculateCost(usage.prompt_tokens || 0, usage.completion_tokens || 0),
        userTotal: costStats.totalSpent,
        dailyCost: costStats.dailyCost
      }
    });
    
  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Audio transcription endpoint (using OpenAI Whisper)
app.post('/api/transcribe', rateLimit, async (req, res) => {
  try {
    const { audio, format = 'webm' } = req.body;
    const user = req.user;

    if (!audio) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey || openaiApiKey.trim() === '') {
      return res.status(400).json({ error: 'OpenAI API key not configured' });
    }

    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audio, 'base64');

    // Create FormData for OpenAI Whisper API
    const FormData = (await import('form-data')).default;
    const formData = new FormData();
    formData.append('file', audioBuffer, {
      filename: `audio.${format}`,
      contentType: `audio/${format}`
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'sq'); // Albanian

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ OpenAI Whisper API error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: 'Transcription failed',
        details: errorData 
      });
    }

    const data = await response.json();
    const transcribedText = data.text || '';

    // Record usage
    user.recordMessage();
    saveUser(user);

    console.log(`🎤 Transcription: "${transcribedText}"`);

    res.json({ 
      text: transcribedText,
      userUsage: user.getUsageStats()
    });

  } catch (error) {
    console.error('❌ Transcription error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (openaiApiKey && openaiApiKey.trim() !== '') {
    console.log(`🤖 OpenAI: ✅ Active - Using ${process.env.OPENAI_MODEL || 'gpt-4o-mini'}`);
    console.log(`💰 Pricing: $0.15/1M input tokens, $0.60/1M output tokens`);
    console.log(`💡 Cost per message: ~$0.0003-0.0004 (0.03-0.04 cents)`);
    console.log(`📊 Cost tracking enabled per user`);
    console.log(`✅ OpenAI integration active - All requests use OpenAI API`);
  } else {
    console.log(`🤖 OpenAI: ❌ Not configured`);
    console.log(`💡 Tip: Add OPENAI_API_KEY to .env to enable OpenAI`);
    console.log(`⚠️  WARNING: App requires OpenAI API key to function`);
  }
  
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

