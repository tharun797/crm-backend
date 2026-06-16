import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './db/connection.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const schema = createSchema({ typeDefs, resolvers });

const yoga = createYoga({
  schema,
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});

app.use('/graphql', yoga);
app.get('/', (_, res) => res.json({ status: 'NexusCRM API 🚀' }));

const httpServer = createServer(app);

// ── WebSocket for subscriptions ───────────────────────────
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

useServer({ schema }, wsServer);

await testConnection();

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 GraphQL playground at http://localhost:${PORT}/graphql`);
  console.log(`🔌 WebSocket ready at ws://localhost:${PORT}/graphql`);
});