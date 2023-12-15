/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./utils/auth').Auth;
  type DatabaseUserAttributes = {
    name: string;
    email: string;
  };
  type DatabaseSessionAttributes = {};
}
