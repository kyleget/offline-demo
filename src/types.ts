export type Message = {
  id: number;
  created_at: string;
  text: string;
  user: {
    auth0_id: string;
    name: string;
  };
  pending?: Boolean;
};
