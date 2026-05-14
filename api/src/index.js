require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (public)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/provinces', require('./routes/province.routes'));
app.use('/api/users', require('./routes/user.routes'));

// 404 & error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
