import { gql } from "@apollo/client";

export default gql`
  query GetMessagesQuery {
    messages(order_by: { created_at: asc }) {
      text
      created_at
      user {
        name
        auth0_id
      }
    }
  }
`;
