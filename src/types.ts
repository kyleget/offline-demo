import type { User } from '@auth0/auth0-spa-js';

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

export type OfflineCache = {
  user: User | undefined,
  messages: Message[] | undefined,
  pendingMessages: Message[] | undefined,
};
