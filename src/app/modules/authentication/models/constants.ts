import {User} from "./user";

export const USERS: User[] = [
  {
    userId: 1,
    userName: 'John'
  },
  {
    userId: 2,
    userName: 'Thomas'
  },
  {
    userId: 3,
    userName: 'David'
  },
  {
    userId: 4,
    userName: 'Ryan'
  }
];

export const USER_PASSWORD_MAP = new Map<number, string>();
USER_PASSWORD_MAP.set(1, 'pass1');
USER_PASSWORD_MAP.set(2, 'pass2');
USER_PASSWORD_MAP.set(3, 'pass3');
USER_PASSWORD_MAP.set(4, 'pass4');

export const USER_COOKIE_NAME: string = 'user';
