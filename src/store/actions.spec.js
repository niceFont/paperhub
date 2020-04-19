import actions from './actions';

window.fetch = jest.fn();

describe('actions.js', () => {
  it('loads the session', async () => {
    const mockSession = { username: 'test', email: 'test@tester.de' };
    window.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSession),
    });
    const commit = jest.fn();
    await actions.loadSession({ commit });

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/me/session', {
      credentials: 'include',
      mode: 'cors',
    });
    expect(commit).toHaveBeenCalledWith('user/session', mockSession);
    expect(commit).toHaveBeenCalledWith('user/login');
  });
  it('logs user out', async () => {
    window.fetch.mockResolvedValue({});
    const commit = jest.fn();
    const push = jest.fn();
    const fakeThis = {
      $router: {
        push,
      },
    };
    await actions.logout.call(fakeThis, { commit });
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/me/session', {
      credentials: 'include',
      method: 'DELETE',
    });
    expect(push).toHaveBeenCalledWith({ name: 'Login' });
    expect(commit).toHaveBeenCalledWith('user/logout');
  });
});
