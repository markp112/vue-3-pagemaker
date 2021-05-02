import { AUser } from '@/classes/base/user/user';

export type State = {
  user: AUser;
};

export const state: State = {
  user: new AUser(),
};

