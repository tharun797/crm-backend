export const typeDefs = `
  type Customer {
    id:          String!
    name:        String!
    email:       String!
    phone:       String
    company:     String
    status:      String!
    total_value: Float!
    avatar_url:  String
    assigned_to: String
    notes:       String
    created_at:  String!
    updated_at:  String!
  }

 type Lead {
    id:           String!
    name:         String!
    email:        String!
    phone:        String
    company:      String
    source:       String!
    status:       String!
    assigned_to:  String
    notes:        String
    converted_to: String
    created_at:   String!
    updated_at:   String!
  }

  type Query {
    ping:         String
    customers:    [Customer!]!
    customer(id: String!): Customer
    leads:        [Lead!]!
    lead(id: String!): Lead
  }

  type Subscription {
    customerAdded:   Customer!
    customerUpdated: Customer!
    customerDeleted: String!
    leadAdded:       Lead!
    leadUpdated:     Lead!
    leadDeleted:     String!
  }
`;