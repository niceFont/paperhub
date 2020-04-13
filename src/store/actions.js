import router from '../router';

const { VUE_APP_API_ENDPOINT } = process.env;

export default {
  async logout({ commit }) {
    await fetch(`${VUE_APP_API_ENDPOINT}/me/session`, {
      method: 'DELETE',
      credentials: 'include',
    });
    commit('user/logout');
    router.push({ name: 'Login' });
  },
  async loadSession({ commit }) {
    const res = await fetch(`${VUE_APP_API_ENDPOINT}/me/session`, {
      credentials: 'include',
      mode: 'cors',
    });
    const session = await res.json();
    commit('user/login');
    commit('user/session', session);
  },
};
