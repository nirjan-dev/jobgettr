/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./utils/auth').Auth;
  type DatabaseUserAttributes = {
    email: string;
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
