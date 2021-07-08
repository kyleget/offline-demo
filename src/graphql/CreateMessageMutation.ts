import { gql } from "@apollo/client";

export default gql`
  mutation CreateMessageMutation($text: String!) {
    insert_messages_one(object: { text: $text }) {
      id
      text
      created_at
    }
  }
`;
