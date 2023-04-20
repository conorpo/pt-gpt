const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend/web-build')));

// Add this catch-all route to serve index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/web-build/index.html'));
});
