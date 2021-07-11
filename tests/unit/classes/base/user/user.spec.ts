import { AUser } from '@/classes/base/user/user';

describe('AUser', () => {

  it('Should when constrcucted with no values create a AUser class with', () => {
      const aUser: AUser = new AUser();
      expect(aUser.email).toEqual('');
      expect(aUser.id).toEqual('');
      expect(aUser.displayName).toEqual('');
      expect(aUser.isSignedIn).toBe(false);
      expect(aUser.password).toEqual('');
      expect(aUser.refreshToken).toEqual('');
  })

  it('should when accept a constructor with email, id, refresh token, isSignedIn and displayname', () => {
      const aUser: AUser = new AUser('email', 'id124', true, 'refreshToken', 'name');
      expect(aUser.email).toEqual('email');
      expect(aUser.id).toEqual('id124');
      expect(aUser.displayName).toEqual('name');
      expect(aUser.isSignedIn).toBe(true);
      expect(aUser.password).toEqual('');
      expect(aUser.refreshToken).toEqual('refreshToken');
  })

  it('should encode and decode the password in B64', () => {
      const aUser = new AUser();
      aUser.password = 'hello world';
      expect(aUser.password).toEqual('hello world');

  })
} )