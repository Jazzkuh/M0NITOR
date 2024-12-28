import {PlayerInfo} from "./index";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Profile {
    id: string;
    login: string;
    name: string;
    avatar_url: string;
    email: string;
    organizations_url: string;
  }

  export interface User {
    id: string;
    login: string;
    name: string;
    avatar_url: string;
    email: string;
    organizations_url: string;
  }

  export interface Session {
    user: User;
  }
}
