const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.static(path.join(__dirname, 'frontend/web-build')));

// Add this catch-all route to serve index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/web-build/index.html'));
});

app.listen(PORT, () => { 
  if(NODE_ENV === 'development') {
    console.log(`Server is hosted at http://localhost:${PORT}`);
  }else{
    console.log(`Server is hosted at http://pt-gpt.com:${PORT}`);
  }
});

