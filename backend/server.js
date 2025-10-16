const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Enable CORS for all origins
server.use(cors({
  origin: '*',
  credentials: true
}));

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes or middlewares here if needed
server.use(jsonServer.bodyParser);

// Use the router
server.use(router);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
