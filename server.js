const http = require('http');
const WebSocket = require('ws');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

// Create a new ShareDB server
const shareDB = new ShareDB();
const connection = shareDB.connect();

// Create an HTTP server
const server = http.createServer();

// Setup WebSocket server
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  const stream = new WebSocketJSONStream(ws);
  shareDB.listen(stream);
});

// Listen on port 8080
server.listen(9090, () => {
  console.log('ShareDB server running on http://localhost:9090');
});
