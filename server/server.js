import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Lead from './models/Lead.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bmtechx';
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch((err) => {
    console.warn('⚠️ MongoDB connection warning (Running without local DB or check MONGODB_URI):', err.message);
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BM TechX MERN API',
    timestamp: new Date().toISOString(),
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Create new lead endpoint
app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, email, service_interested, budget, notes, source, attribution } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and Phone are required.' });
    }

    // Save to MongoDB if connected
    let savedLead = null;
    if (mongoose.connection.readyState === 1) {
      const newLead = new Lead({
        name,
        phone,
        email,
        service_interested,
        budget,
        notes,
        source: source || 'website-form',
        attribution: {
          ...attribution,
          ip: req.ip,
          user_agent: req.get('user-agent'),
        },
      });
      savedLead = await newLead.save();
    }

    // Optional webhook forward to n8n if configured
    if (N8N_WEBHOOK_URL) {
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            source: source || 'website-form',
            lead: { name, phone, email, service_interested, budget, notes },
            attribution,
          }),
        });
      } catch (webhookErr) {
        console.warn('n8n Webhook forward error:', webhookErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Lead received successfully.',
      data: savedLead || { name, phone, service_interested },
    });
  } catch (err) {
    console.error('Error handling lead submission:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Retrieve leads list (for internal dashboard/admin)
app.get('/api/leads', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: 0, leads: [], note: 'Database not connected' });
    }
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, count: leads.length, leads });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✓ BM TechX API server listening on http://localhost:${PORT}`);
});
