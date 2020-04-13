import mutations from './mutations';


describe('mutations', () => {
  it('sets loggedIn to true', () => {
    const mockState = {
      isLoggedIn: false,
    };
    mutations['user/login'](mockState);
    expect(mockState.isLoggedIn).toBe(true);
  });
  it('sets loggedIn to false', () => {
    const mockState = {
      isLoggedIn: true,
    };
    mutations['user/logout'](mockState);
    expect(mockState.isLoggedIn).toBe(false);
  });
  it('sets the session', () => {
    const mockState = {
      isLoggedIn: true,
      session: null,
    };
    const mockSession = {
      username: 'test',
      email: 'test@tester.de',
    };
    mutations['user/session'](mockState, mockSession);
    expect(mockState.session).toEqual(mockSession);
  });
});
