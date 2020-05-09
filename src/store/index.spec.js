import store from '.';

describe('index.js', () => {
  it('loads all the parts', () => {
    // eslint-disable-next-line no-underscore-dangle
    expect(store._modules.root._rawModule).toEqual(expect.objectContaining({
      state: {
        isLoggedIn: false,
        session: null,
        error: null,
      },
      actions: {
        loadSession: expect.any(Function),
        logout: expect.any(Function),
      },
      mutations: {
        'user/session': expect.any(Function),
        'user/login': expect.any(Function),
        'user/logout': expect.any(Function),
        error: expect.any(Function),
      },
      modules: {},
    }));
  });
});
