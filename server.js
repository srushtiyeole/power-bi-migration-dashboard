const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Migration API Server' });
});

// GET endpoint for migration stats
app.get('/api/migration-stats', (req, res) => {
  const migrationStats = [
    { id: 1, file: 'All Suspended.pbip', target: 'Microsoft Fabric', status: 'Migrated' },
    { id: 2, file: 'All_Running.pbip', target: 'Microsoft Fabric', status: 'Migrated' },
    { id: 3, file: 'All_Running_2.pbip', target: 'Microsoft Fabric', status: 'Migrated' },
    { id: 4, file: 'OpenSessions.pbip', target: 'Microsoft Fabric', status: 'Migrated' },
    { id: 5, file: 'request_steps.pbip', target: 'Microsoft Fabric', status: 'Migrated' }
  ];
  res.json(migrationStats);
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});