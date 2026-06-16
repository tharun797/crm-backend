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
import pool from './db/connection.js'; // ← ADD THIS


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


// const seedData = async () => {

//   // Users
//   await pool.execute(`INSERT IGNORE INTO users (id, name, email, password_hash, role) VALUES
//     (UUID(), 'Tharun Kumar', 'tharun@swiftpos.dev', '$2b$10$hash', 'admin')
//   `);
//   console.log('✅ users inserted');

//   // Deals — use subquery to get customer ID by email
//   await pool.execute(`INSERT IGNORE INTO deals (id, title, value, stage, customer_id) VALUES
//     (UUID(), 'Bright Path Enterprise', 24000, 'negotiation', (SELECT id FROM customers WHERE email='sarah.johnson@brightpath.com')),
//     (UUID(), 'Nexora SaaS Plan',       12500, 'proposal',    (SELECT id FROM customers WHERE email='michael.chen@nexora.io')),
//     (UUID(), 'VortexTech Integration', 31000, 'discovery',   (SELECT id FROM customers WHERE email='david.martinez@vortex.com')),
//     (UUID(), 'Summit Renewal',          5750, 'closed_lost', (SELECT id FROM customers WHERE email='j.anderson@summitgroup.com'))
//   `);
//   console.log('✅ deals inserted');

//   // Tasks — same subquery trick
//   await pool.execute(`INSERT IGNORE INTO tasks (id, title, status, priority, customer_id) VALUES
//     (UUID(), 'Follow up Sarah',    'pending',     'high',   (SELECT id FROM customers WHERE email='sarah.johnson@brightpath.com')),
//     (UUID(), 'Demo for Michael',   'in_progress', 'high',   (SELECT id FROM customers WHERE email='michael.chen@nexora.io')),
//     (UUID(), 'Contract for Emily', 'completed',   'medium', (SELECT id FROM customers WHERE email='emily.davis@gmail.com')),
//     (UUID(), 'VortexTech call',    'pending',     'medium', (SELECT id FROM customers WHERE email='david.martinez@vortex.com'))
//   `);
//   console.log('✅ tasks inserted');

//   // Leads
//   await pool.execute(`INSERT IGNORE INTO leads (id, name, email, source, status) VALUES
//     (UUID(), 'Tom Harris',   'tom@email.com',     'website',       'new'),
//     (UUID(), 'Lisa Wong',    'lisa@techflow.com', 'referral',      'contacted'),
//     (UUID(), 'Mark Spencer', 'mark@gmail.com',    'social_media',  'qualified'),
//     (UUID(), 'Nina Patel',   'nina@nexgen.io',    'cold_outreach', 'new')
//   `);
//   console.log('✅ leads inserted');
// };


// app.get('/seed', async (req, res) => {
//   await seedData();
//   res.json({ status: '✅ Seed complete' });
// });




await testConnection();


const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 GraphQL playground at http://localhost:${PORT}/graphql`);
  console.log(`🔌 WebSocket ready at ws://localhost:${PORT}/graphql`);
});