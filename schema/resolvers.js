import pool from '../db/connection.js';
import { createPubSub } from 'graphql-yoga';

const pubsub = createPubSub();

export const resolvers = {
  Query: {
    ping: () => 'pong 🏓',

    customers: async () => {
      const [rows] = await pool.execute(
        'SELECT * FROM customers ORDER BY created_at DESC'
      );
      return rows;
    },

    customer: async (_, { id }) => {
      const [rows] = await pool.execute(
        'SELECT * FROM customers WHERE id = ?', [id]
      );
      return rows[0] ?? null;
    },

   leads: async () => {
  const [rows] = await pool.execute(
    'SELECT * FROM leads ORDER BY created_at DESC'
  );
  return rows;
},

lead: async (_, { id }) => {
  const [rows] = await pool.execute(
    'SELECT * FROM leads WHERE id = ?', [id]
  );
  return rows[0] ?? null;
},
deals: async () => {
    const [rows] = await pool.execute(
      'SELECT * FROM deals ORDER BY created_at DESC'
    );
    return rows;
  },

  deal: async (_, { id }) => {
    const [rows] = await pool.execute(
      'SELECT * FROM deals WHERE id = ?', [id]
    );
    return rows[0] ?? null;
  },

  dealsByStage: async (_, { stage }) => {
    const [rows] = await pool.execute(
      'SELECT * FROM deals WHERE stage = ? ORDER BY created_at DESC', [stage]
    );
    return rows;
  },
  tasks: async () => {
  const [rows] = await pool.execute(
    'SELECT * FROM tasks ORDER BY due_date ASC'
  );
  return rows;
},

task: async (_, { id }) => {
  const [rows] = await pool.execute(
    'SELECT * FROM tasks WHERE id = ?', [id]
  );
  return rows[0] ?? null;
},

tasksByStatus: async (_, { status }) => {
  const [rows] = await pool.execute(
    'SELECT * FROM tasks WHERE status = ? ORDER BY due_date ASC', [status]
  );
  return rows;
},

tasksByPriority: async (_, { priority }) => {
  const [rows] = await pool.execute(
    'SELECT * FROM tasks WHERE priority = ? ORDER BY due_date ASC', [priority]
  );
  return rows;
},
  },

  Subscription: {
    customerAdded: {
      subscribe: () => pubsub.subscribe('CUSTOMER_ADDED'),
      resolve:   (payload) => payload,
    },
    customerUpdated: {
      subscribe: () => pubsub.subscribe('CUSTOMER_UPDATED'),
      resolve:   (payload) => payload,
    },
    customerDeleted: {
      subscribe: () => pubsub.subscribe('CUSTOMER_DELETED'),
      resolve:   (payload) => payload,
    },
    leadAdded: {
      subscribe: () => pubsub.subscribe('LEAD_ADDED'),
      resolve:   (payload) => payload,
    },
    leadUpdated: {
      subscribe: () => pubsub.subscribe('LEAD_UPDATED'),
      resolve:   (payload) => payload,
    },
    leadDeleted: {
      subscribe: () => pubsub.subscribe('LEAD_DELETED'),
      resolve:   (payload) => payload,
    },
    dealAdded: {
    subscribe: () => pubsub.subscribe('DEAL_ADDED'),
    resolve:   (payload) => payload,
  },
  dealUpdated: {
    subscribe: () => pubsub.subscribe('DEAL_UPDATED'),
    resolve:   (payload) => payload,
  },
  dealDeleted: {
    subscribe: () => pubsub.subscribe('DEAL_DELETED'),
    resolve:   (payload) => payload,
  },
  taskAdded: {
  subscribe: () => pubsub.subscribe('TASK_ADDED'),
  resolve:   (payload) => payload,
},
taskUpdated: {
  subscribe: () => pubsub.subscribe('TASK_UPDATED'),
  resolve:   (payload) => payload,
},
taskDeleted: {
  subscribe: () => pubsub.subscribe('TASK_DELETED'),
  resolve:   (payload) => payload,
},
  },
};

export { pubsub };