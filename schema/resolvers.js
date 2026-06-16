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
  },
};

export { pubsub };