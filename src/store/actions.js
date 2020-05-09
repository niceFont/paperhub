
const { VUE_APP_API_ENDPOINT } = process.env;

export default {
  async logout({ commit }) {
    await fetch(`${VUE_APP_API_ENDPOINT}/me/session`, {
      method: 'DELETE',
      credentials: 'include',
    });
    commit('user/logout');
    this.$router.push({ name: 'Login' });
  },
  async loadSession({ commit }) {
    try {
      const res = await fetch(`${VUE_APP_API_ENDPOINT}/me/session`, {
        credentials: 'include',
        mode: 'cors',
      });
      const session = await res.json();
      commit('user/session', session);
      commit('user/login');
    } catch (error) {
      commit('error');
    }
  },
};
