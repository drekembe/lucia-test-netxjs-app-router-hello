/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./lucia.ts').Auth;
  type DatabaseUserAttributes = {
    username: string;
    github_username?: string;
  };
  type DatabaseSessionAttributes = Record<string, never>;
}
