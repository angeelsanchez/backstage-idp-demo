const express = require('express');
const app = express();
const PORT = process.env.PORT || ${{ values.port }};

app.get('/', (req, res) => {
  res.json({
    service: '${{ values.name }}',
    version: process.env.VERSION || '0.0.1',
    status: 'healthy'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`${{ values.name }} listening on port ${PORT}`);
});
