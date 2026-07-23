const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.log('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/resume', require('./routes/resumeRoute'));
app.use('/api/pdf', require('./routes/pdfRoute'));
app.use('/api/upload', require('./routes/uploadRoute'));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Server is running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Home Route
app.get('/', (req, res) => {
  res.json({
    message: '🎉 Resume Builder API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      resume: '/api/resume',
      pdf: '/api/pdf',
      upload: '/api/upload'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: '❌ Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Server error',
    status: err.status || 500
  });
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}\n`);
});

module.exports = app;
