require('dotenv').config();
const { sequelize, User, Province, District, Ward } = require('../models');

async function runMigrations() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true });
    console.log('✅ Migrations completed');

    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  }
}

runMigrations();
