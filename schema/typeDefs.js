


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

  type Query {
    ping:         String
    customers:    [Customer!]!
    customer(id: String!): Customer
  }

  type Subscription {
    customerAdded:   Customer!
    customerUpdated: Customer!
    customerDeleted: String!
  }
`;