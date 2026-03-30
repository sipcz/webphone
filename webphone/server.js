import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

const server = app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);

const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === 1) {
        client.send(message.toString());
      }
    });
  });
});