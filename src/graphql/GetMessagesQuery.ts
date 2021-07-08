import { gql } from "@apollo/client";

export default gql`
  query GetMessagesQuery {
    messages(order_by: { created_at: asc }) {
      id
      text
      created_at
      user {
        name
        auth0_id
      }
    }
  }
`;
