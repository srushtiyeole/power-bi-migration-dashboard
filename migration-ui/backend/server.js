const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const migrationData = [
  { type: "Table", name: "All Suspended", status: "Completed", env: "PROD", before: "DirectQuery", after: "DirectQuery", bSource: "Fabric Lakehouse", aSource: "Microsoft Fabric", cType: "Lakehouse.Contents", server: "SRV-FIN-PRD", db: "Finance_Data", query: 'let Source = Lakehouse.Contents("https://onelake.dfs.fabric.microsoft.com/...")' },
  { type: "Table", name: "All_Running", status: "Completed", env: "PROD", before: "DirectQuery", after: "DirectQuery", bSource: "Fabric Lakehouse", aSource: "Microsoft Fabric", cType: "Lakehouse.Contents", server: "SRV-SLS-PRD", db: "Sales_Report", query: 'let Source = Lakehouse.Contents("https://onelake.dfs.fabric.microsoft.com/...")' },
  { type: "Table", name: "All_Running_2", status: "Completed", env: "DEV", before: "DirectQuery", after: "DirectQuery", bSource: "Fabric Lakehouse", aSource: "Microsoft Fabric", cType: "Lakehouse.Contents", server: "SRV-DEV-04", db: "Test_Sandbox", query: 'let Source = Lakehouse.Contents("https://onelake.dfs.fabric.microsoft.com/...")' },
  { type: "Table", name: "OpenSessions", status: "Completed", env: "PROD", before: "DirectQuery", after: "DirectQuery", bSource: "Fabric Lakehouse", aSource: "Microsoft Fabric", cType: "Lakehouse.Contents", server: "SRV-OPS-PRD", db: "Operations_DB", query: 'let Source = Lakehouse.Contents("https://onelake.dfs.fabric.microsoft.com/...")' },
  { type: "Table", name: "request_steps", status: "Completed", env: "PROD", before: "DirectQuery", after: "DirectQuery", bSource: "Fabric Lakehouse", aSource: "Microsoft Fabric", cType: "Lakehouse.Contents", server: "SRV-LOG-PRD", db: "Activity_Logs", query: 'let Source = Lakehouse.Contents("https://onelake.dfs.fabric.microsoft.com/...")' }
];

app.get('/api/data', (req, res) => {
  res.json(migrationData);
});

app.listen(5000, () => console.log("Backend Server running on port 5000"));