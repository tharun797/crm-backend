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

  type Deal {
  id:                   String!
  title:                String!
  value:                Float!
  stage:                String!
  customer_id:          String!
  assigned_to:          String
  expected_close_date:  String
  notes:                String
  created_at:           String!
  updated_at:           String!
}


  type Query {
    ping:         String
    customers:    [Customer!]!
    customer(id: String!): Customer
    leads:        [Lead]!
    lead(id: String!): Lead
     deals:      [Deal!]!
  deal(id: String!): Deal
  dealsByStage(stage: String!): [Deal!]!
  }

  type Subscription {
    customerAdded:   Customer!
    customerUpdated: Customer!
    customerDeleted: String!
    leadAdded:       Lead!
    leadUpdated:     Lead!
    leadDeleted:     String!
     dealAdded:       Deal!
  dealUpdated:     Deal!
  dealDeleted:     String!
  }
`;